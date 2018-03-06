import React from 'react';
import { Formik } from 'formik';
import * as yup from 'yup';
import {
  Form,
  Input,
  Datepicker,
  Select,
  Textarea,
  Checkbox,
  SubmitBtn
} from 'react-formik-ui';

import ImageSelect from './ImageSelect';
import ItinerariesList from './ItinerariesList';
import AccomodationsList from './AccomodationsList';

export class UpdateTripForm extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      error: null,
      isLoaded: false,
      initialValues: {},
      itineraryDays: [],
      accomodations: [],
      checkBoxesImages: []
    };

    this.UpdateTripSubmit = this.UpdateTripSubmit.bind(this);
    this.uploadImg = this.uploadImg.bind(this);
  }

  handleAddDayItinerary = (e) => {
    e.preventDefault();
    const count = this.state.itineraryDays.length + 1;
    this.setState({
      itineraryDays: [
        ...this.state.itineraryDays,
        { id: count, name: `day${count}`, label: `Day ${count}` }
      ]
    });
  };

  handleRemoveDayItinerary = (e) => {
    e.preventDefault();
    this.setState({
      itineraryDays: this.state.itineraryDays.slice(0, -1)
    });
  };

  handleAddDayAccomodation = (e) => {
    e.preventDefault();
    const count = this.state.accomodations.length + 1;
    this.setState({
      accomodations: [
        ...this.state.accomodations,
        {
          id: count,
          dayStart: `accomodationDay${count}Start`,
          numberOfDays: `accomodationDays${count}`,
          description: `accomodationDays${count}Desc`
        }
      ]
    });
  };

  handleRemoveDayAccomodation = (e) => {
    e.preventDefault();
    this.setState({
      accomodations: this.state.accomodations.slice(0, -1)
    });
  };

  handleAddPhoto = (e) => {
    e.preventDefault();
    const count = this.state.checkBoxesImages.length + 1;
    const name = `cbImg${count}`;
    const imageName = `img${count}`;
    this.setState({
      checkBoxesImages: this.state.checkBoxesImages.concat([
        { name, value: false, imageName }
      ])
    });
  };

  handleRemovePhoto = (e, imageName) => {
    e.preventDefault();
    this.setState({
      checkBoxesImages: this.state.checkBoxesImages.filter(
        (item) => item.imageName !== imageName
      )
    });
  };

  async uploadImg(pic) {
    if (pic === undefined) {
      return { name: '' };
    }
    const formData = new FormData();
    formData.append('file', pic);
    const response = await fetch('https://fototripr.com/api/v1/Images/0', {
      method: 'POST',
      headers: {
        Authorization: 'Bearer ' + this.props.token
      },
      body: formData
    });

    return await response.json();
  }

  async UpdateTripSubmit(values) {
    // console.log(values);
    let uploadedProfileImg = '';
    let profilePics = [];

    const { checkBoxesImages } = this.state;

    for (let i = 0; i < checkBoxesImages.length; i++) {
      if (values[checkBoxesImages[i].imageName].length !== 0) {
        uploadedProfileImg = await this.uploadImg(
          values[checkBoxesImages[i].imageName][0]
        );
        profilePics.push({
          photoKey: uploadedProfileImg.name,
          isCoverPhoto: values[checkBoxesImages[i].name]
        });
      } else if (values[checkBoxesImages[i].imageName].length === 0) {
        profilePics.push({
          photoKey: checkBoxesImages[i].imageSrcName,
          isCoverPhoto: values[checkBoxesImages[i].name]
        });
      }
    }

    const accomodations = [
      {
        dayStart: 1,
        numberOfDays: values.accomodationDays,
        description: values.accomodationDaysDesc
      }
    ].concat(
      this.state.accomodations.map((item) => ({
        dayStart: values[item.dayStart],
        numberOfDays: values[item.numberOfDays],
        description: values[item.description]
      }))
    );

    const itinerary = this.state.itineraryDays.map((item) => ({
      day: item.id,
      description: values[item.name]
    }));

    return fetch(
      'https://www.fototripr.com/api/v1/Trips/' + this.props.trip.id,
      {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          Authorization: 'Bearer ' + this.props.token
        },
        body: JSON.stringify({
          id: this.props.trip.id,
          userId: this.props.trip.userId,
          ...values,
          itinerary,
          accomodations,
          gallery: profilePics
        })
      }
    )
      .then((response) => {
        if (response.ok) {
          response.json().then((data) => {
            // console.log(data);
            this.props.history.push({
              pathname: '/all-trips',
              state: {
                userId: this.props.trip.userId,
                token: this.props.token,
                isLoggedIn: this.props.isLoggedIn
              }
            });
          });
        }
      })
      .catch((err) => {
        console.log(err);
      });
  }

  componentDidMount() {
    const init = { ...this.props.trip };

    const initialValues = {
      title: init.title ? init.title : '',
      country: init.country ? init.country : '',
      destination: init.destination ? init.destination : '',
      tourType: init.tourType ? init.tourType : '',
      days: init.days ? init.days : '',
      description: init.description ? init.description : '',
      dtStart: init.dtStart ? init.dtStart : '',
      maxPeople: init.maxPeople ? init.maxPeople : '',
      price: init.price ? init.price : '',
      currency: init.currency ? init.currency : '',
      alcoholIncluded: init.alcoholIncluded ? init.alcoholIncluded : false,
      allMealsIncluded: init.allMealsIncluded ? init.allMealsIncluded : false,
      transfersIncluded: init.transfersIncluded
        ? init.transfersIncluded
        : false,
      flightsIncluded: init.flightsIncluded ? init.flightsIncluded : false,
      gratuitiesIncluded: init.gratuitiesIncluded
        ? init.gratuitiesIncluded
        : false,
      accomodationDays:
        init.accomodations && init.accomodations[0]
          ? init.accomodations[0].numberOfDays
          : 1,
      accomodationDaysDesc:
        init.accomodations && init.accomodations[0]
          ? init.accomodations[0].description
          : ''
    };

    const itineraries = init.itinerary.map((item) => ({
      id: item.day,
      name: `day${item.day}`,
      label: `Day ${item.day}`
    }));

    const accomodations = init.accomodations.slice(1).map((item, index) => ({
      id: index + 1,
      dayStart: `accomodationDay${index + 1}Start`,
      numberOfDays: `accomodationDays${index + 1}`,
      description: `accomodationDays${index + 1}Desc`
    }));

    // let accomodationsDaysCount = 1;
    // if (accomodations.length > 1) {
    //   for (let i = 0; i < accomodations.length - 1; i++) {
    //     accomodationsDaysCount += 1;
    //   }
    // }

    itineraries.forEach((item) => {
      initialValues[item.name] = init.itinerary[item.id - 1]
        ? init.itinerary[item.id - 1].description
        : '';
    });

    for (let i = 0; i < accomodations.length; i++) {
      initialValues[accomodations[i]['dayStart']] = init.accomodations[i + 1]
        ? init.accomodations[i + 1].dayStart
        : '';
      initialValues[accomodations[i]['numberOfDays']] = init.accomodations[
        i + 1
      ]
        ? init.accomodations[i + 1].numberOfDays
        : '';
      initialValues[accomodations[i]['description']] = init.accomodations[i + 1]
        ? init.accomodations[i + 1].description
        : '';
    }
    const checkBoxesImages = [];
    const checkBoxesImagesCount = this.props.trip.gallery.length;
    for (let i = 1; i <= checkBoxesImagesCount; i++) {
      checkBoxesImages.push({
        name: `cbImg${i}`,
        value: this.props.trip.gallery[i - 1].isCoverPhoto,
        imageName: `img${i}`,
        imageSrcName: this.props.trip.gallery[i - 1].photoKey
      });
      initialValues[checkBoxesImages[i - 1].name] =
        checkBoxesImages[i - 1].value;
      initialValues[checkBoxesImages[i - 1].imageName] = [];
    }
    this.setState({
      initialValues: { ...initialValues },
      itineraryDays: [...itineraries],
      accomodations: [...accomodations],
      checkBoxesImages: [...checkBoxesImages]
    });
  }

  render() {
    const getSchema = () => {
      return yup.object().shape({
        title: yup.string().required('Tour title is required'),
        country: yup.string().required('Tour country is required'),
        destination: yup.string().required('Tour city is required'),
        tourType: yup.string().required('Tour type is required'),
        days: yup.string().required('Number of Days is required'),
        dtStart: yup.string().required('Start date is required'),
        maxPeople: yup.string().required('Maximum people is required'),
        price: yup.string().required('Price is required'),
        currency: yup.string().required('Currency is required')
      });
    };

    const checkBoxesAmenities = [
      { name: 'allMealsIncluded', text: 'All meals', value: false },
      { name: 'transfersIncluded', text: 'Transfers', value: false },
      { name: 'alcoholIncluded', text: 'Alcoholic Beverages', value: false },
      { name: 'flightsIncluded', text: 'Flights', value: false },
      { name: 'gratuitiesIncluded', text: 'Gratitude', value: false }
    ];

    // const checkBoxesImages = [
    //   { name: 'cbImg1', value: false, imageName: 'img1' },
    //   { name: 'cbImg2', value: false, imageName: 'img2' },
    //   { name: 'cbImg3', value: false, imageName: 'img3' },
    //   { name: 'cbImg4', value: false, imageName: 'img3' }
    // ];

    // const initialValues = {
    //   title: init.title ? init.title : '',
    //   country: init.country ? init.country : '',
    //   destination: init.destination ? init.destination : '',
    //   tourType: init.tourType ? init.tourType : '',
    //   days: init.days ? init.days : '',
    //   description: init.description ? init.description : '',
    //   dtStart: init.dtStart ? init.dtStart : '',
    //   maxPeople: init.maxPeople ? init.maxPeople : '',
    //   price: init.price ? init.price : '',
    //   currency: init.currency ? init.currency : '',
    //   alcoholIncluded: init.alcoholIncluded ? init.alcoholIncluded : false,
    //   allMealsIncluded: init.allMealsIncluded ? init.allMealsIncluded : false,
    //   transfersIncluded: init.transfersIncluded
    //     ? init.transfersIncluded
    //     : false,
    //   flightsIncluded: init.flightsIncluded ? init.flightsIncluded : false,
    //   gratuitiesIncluded: init.gratuitiesIncluded
    //     ? init.gratuitiesIncluded
    //     : false,
    //   ...this.state.checkBoxesImages.reduce(
    //     (acc, { name, value }) => ({
    //       ...acc,
    //       [name]: value
    //     }),
    //     {}
    //   ),
    //   ...this.state.checkBoxesImages.reduce(
    //     (acc, { imageName }) => ({
    //       ...acc,
    //       [imageName]: []
    //     }),
    //     {}
    //   )
    // };

    const {
      itineraryDays,
      accomodations,
      initialValues,
      checkBoxesImages
    } = this.state;

    const keys = Object.keys(initialValues);
    checkBoxesImages.forEach((item) => {
      if (!keys.includes(item.imageName)) {
        initialValues[item.imageName] = [];
      }
    });

    return (
      <Formik
        enableReinitialize={true}
        initialValues={initialValues}
        validationSchema={getSchema}
        onSubmit={this.UpdateTripSubmit}
        render={() => {
          return (
            <Form mode="structured" className="form">
              <fieldset>
                <h1>Update an active tour</h1>
                <div className="form__title form__title--sm">General Info</div>
                <div className="form__container">
                  <div className="col">
                    <div>
                      <label style={{textAlign:"left", width:"100%", display:"block"}}>Tour Title</label>
                      <Input
                        name="title"
                        placeholder="Tour Title*"
                        required
                        className="form__input"
                      />
                    </div>
                    
                    <div>
                      <label style={{textAlign:"left", width:"100%", display:"block"}}>Select a Country</label>
                      <Select
                        name="country"
                        placeholder="Select a Country*"
                        options={[
                          { value: 'India', label: 'India' },
                          { value: 'Iceland', label: 'Iceland' },
                          { value: 'Argentina', label: 'Argentina' },
                          { value: 'Phuket', label: 'Phuket' }
                      ]}
                      className="form__select"
                      />
                    </div>
                    <label style={{textAlign:"left", width:"100%", display:"block"}}>Select a Destination</label>
                    <Select
                      name="destination"
                      placeholder="Select a Destination*"
                      options={[
                        { value: 'Rajasthan', label: 'Rajasthan' },
                        { value: 'Reykjavik', label: 'Reykjavik' },
                        { value: 'Beunoes Aires', label: 'Beunoes Aires' },
                        { value: 'Thailand', label: 'Thailand' }
                      ]}
                      className="form__select"
                    />
                    <label style={{textAlign:"left", width:"100%", display:"block"}}>Tour type</label>
                    <Select
                      name="tourType"
                      placeholder="Tour type*"
                      options={[
                        { value: 'Easy', label: 'Easy' },
                        { value: 'Moderate', label: 'Moderate' },
                        { value: 'Strenuous', label: 'Strenuous' }
                      ]}
                      className="form__select"
                    />
                    <label style={{textAlign:"left", width:"100%", display:"block"}}>Number of days</label>
                    <Select
                      name="days"
                      placeholder="Number of days*"
                      options={[
                        { value: '1', label: '1' },
                        { value: '2', label: '2' },
                        { value: '3', label: '3' },
                        { value: '4', label: '4' },
                        { value: '5', label: '5' },
                        { value: '6', label: '6' },
                        { value: '7', label: '7' },
                        { value: '8', label: '8' },
                        { value: '9', label: '9' },
                        { value: '10', label: '10' }
                      ]}
                      className="form__select"
                    />
                    <label style={{textAlign:"left", width:"100%", display:"block"}}>Start Date</label>
                    <Datepicker
                      name="dtStart"
                      dateFormat="MM.dd.yyyy"
                      placeholder="Start Date*"
                      className="form__input"
                    />
                    <label style={{textAlign:"left", width:"100%", display:"block"}}>Maximum people</label>

                    <Select
                      name="maxPeople"
                      placeholder="Maximum people*"
                      options={[
                        //TODO: Make this dynamic
                        { value: '1', label: '1' },
                        { value: '2', label: '2' },
                        { value: '3', label: '3' },
                        { value: '4', label: '4' },
                        { value: '5', label: '5' },
                        { value: '6', label: '6' },
                        { value: '7', label: '7' },
                        { value: '8', label: '8' },
                        { value: '9', label: '9' },
                        { value: '10', label: '10' }
                      ]}
                      className="form__select"
                    />
                    <div className="form__container">
                      <div>
                      <label style={{textAlign:"left", width:"100%", display:"block"}}>Price</label>
                      <Input
                        name="price"
                        type="number"
                        placeholder="Price*"
                        required
                        className="form__input"
                      />
                      </div>
                      
                      {/* <div>
                        <label style={{textAlign:"left", width:"100%", display:"block"}}>Currency</label>
                        <Select
                          name="currency"
                          placeholder="Currency*"
                          options={[
                            { value: 'USD', label: 'USD' },
                            { value: 'EUR', label: 'EUR' },
                            { value: 'GBP', label: 'GBP' }
                          ]}
                          className="form__select"
                        />
                      </div> */}
                      
                    </div>
                  </div>
                  <div className="col">
                    <label style={{textAlign:"left", width:"100%", display:"block"}}>Short description</label>
                    <Textarea
                      name="description"
                      className="form__textarea"
                      // label="Short description"
                    />
                  </div>
                </div>

                <p>Check all that is included in this price:</p>
                <div className="form__checkbox-container">
                  {checkBoxesAmenities.map((cb) => (
                    <Checkbox key={cb.name} name={cb.name} text={cb.text} />
                  ))}
                </div>

                <ItinerariesList
                  days={itineraryDays}
                  addDay={this.handleAddDayItinerary}
                  removeDay={this.handleRemoveDayItinerary}
                  count={itineraryDays.length > 1}
                />

                <AccomodationsList
                  accomodations={accomodations}
                  addDay={this.handleAddDayAccomodation}
                  removeDay={this.handleRemoveDayAccomodation}
                  count={accomodations.length !== 0}
                />

                <div className="form__title form__title--sm">Gallery:</div>

                <p>Check an image to use for your cover photo:</p>
                {
                  // TODO: only one checkbox clickable
                }
                <div className="form__fields-wrapper">
                  {this.state.checkBoxesImages.map((cb) => (
                    <ImageSelect
                      key={cb.name}
                      imageName={cb.imageName}
                      imageSrcName={cb.imageSrcName}
                      checkBoxName={cb.name}
                      removePhoto={this.handleRemovePhoto}
                    />
                  ))}
                </div>
                <div style={{ marginBottom: '1em' }}>
                  <button onClick={this.handleAddPhoto} className="add-btn">
                    Add more photo
                  </button>
                </div>
                <SubmitBtn className="form__submit-btn" />
              </fieldset>
            </Form>
          );
        }}
      />
    );
  }
}
