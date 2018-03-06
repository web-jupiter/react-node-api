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

export class AddTripForm extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      itineraryDays: [
        {
          id: 1,
          name: 'day1',
          label: 'Day 1'
        },
        {
          id: 2,
          name: 'day2',
          label: 'Day 2'
        }
      ],
      accomodations: [
        // {
        //   id: 1,
        //   numberOfDays: 'accomodationDays1',
        //   description: 'accomodationDaysDesc'
        // }
      ],
      checkBoxesAmenities: [
        { name: 'allMealsIncluded', text: 'All meals', value: false },
        { name: 'transfersIncluded', text: 'Transfers', value: false },
        { name: 'alcoholIncluded', text: 'Alcoholic Beverages', value: false },
        { name: 'flightsIncluded', text: 'Flights', value: false },
        { name: 'gratuitiesIncluded', text: 'Gratitude', value: false }
      ],

      checkBoxesImages: [
        { name: 'cbImg1', value: false, imageName: 'img1' },
        { name: 'cbImg2', value: false, imageName: 'img2' },
        { name: 'cbImg3', value: false, imageName: 'img3' },
        { name: 'cbImg4', value: false, imageName: 'img4' }
      ],
      initialValues: {
        title: '',
        country: '',
        destination: '',
        tourType: '',
        days: '',
        description: '',
        dtStart: '',
        maxPeople: '',
        price: '',
        currency: '',
        accomodationDays: 1,
        accomodationDaysDesc: ''
      }
    };

    this.AddTripSubmit = this.AddTripSubmit.bind(this);
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
      checkBoxesImages: [
        ...this.state.checkBoxesImages,
        { name, value: false, imageName }
      ]
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

  onSubmit = (values) => {
    console.log("onSubmit");
    this.AddTripSubmit(values);
  };
  async AddTripSubmit(values) {
    console.log("nadd a new trip");
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

    return fetch('http://www.silvanium.com/api/v1/Trips/', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: 'Bearer ' + this.props.token
      },
      body: JSON.stringify({
        id: this.props.userId,
        userId: this.props.userId,
        ...values,
        itinerary,
        accomodations,
        gallery: profilePics
      })
    })
      .then((response) => {
        if (response.ok) {
          response.json().then((data) => {
            this.props.history.push({
              pathname: '/all-trips',
              state: {
                userId: this.props.userId,
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
    this.setState({
      ...this.state.initialValues,
      ...this.state.checkBoxesImages.reduce(
        (acc, { name, value }) => ({
          ...acc,
          [name]: value
        }),
        {}
      ),
      ...this.state.checkBoxesAmenities.reduce(
        (acc, { name, value }) => ({
          ...acc,
          [name]: value
        }),
        {}
      )
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

    const {
      itineraryDays,
      accomodations,
      checkBoxesImages,
      initialValues,
      checkBoxesAmenities
    } = this.state;

    itineraryDays.forEach((item) => {
      initialValues[item.name] = '';
      // initialValues[item.style] = { float: "left", textAlign:"left", width:"100%", display:"block"}
    });

    accomodations.forEach((item) => {
      initialValues[item.dayStart] = 1;
      initialValues[item.numberOfDays] = 1;
      initialValues[item.description] = '';
    });

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
        onSubmit= {() =>{console.log("submit");}}// {this.onSubmit}
        render={() => {
          return (
            <Form mode="structured" className="form">
              <fieldset>
                <h1>Add a new tour</h1>
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
                    
                    <div >
                      <label style={{textAlign:"left", width:"100%", display:"block"}}>Select Country</label>
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
                    
                    <div>
                      <label style={{textAlign:"left", width:"100%", display:"block"}}>Select a City</label>
                      <Select
                        name="destination"
                        placeholder="Select a City*"
                        options={[
                          { value: 'Rajasthan', label: 'Rajasthan' },
                          { value: 'Reykjavik', label: 'Reykjavik' },
                          { value: 'Beunoes Aires', label: 'Beunoes Aires' },
                          { value: 'Thailand', label: 'Thailand' }
                        ]}
                        className="form__select"
                      />
                    </div>
                    
                    <div>
                      <label style={{textAlign:"left", width:"100%", display:"block"}}>Tour Type</label>
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
                    </div>
                    
                    <div>
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
                    </div>

                    <div>
                      <label style={{textAlign:"left", width:"100%", display:"block"}}>Start Date</label>
                      <Datepicker
                        name="dtStart"
                        dateFormat="MM.dd.yyyy"
                        placeholder="Start Date*"
                        className="form__input"
                      />
                    </div>

                    <div>
                      <label style={{textAlign:"left", width:"100%", display:"block"}}>Maximum people</label>
                      <Select
                        name="maxPeople"
                        placeholder="Maximum people*"
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
                    </div>
                    <div>
                      <label style={{textAlign:"left", width:"100%", display:"block"}}>Price</label>
                      <div className="form__container">
                        
                        <Input
                          name="price"  
                          type="number"
                          placeholder="Price*"
                          required
                          className="form__input"
                        />

                        {/* <Select
                          name="currency"
                          placeholder="Currency*"
                          options={[
                            { value: 'USD', label: 'USD' },
                            { value: 'EUR', label: 'EUR' },
                            { value: 'GBP', label: 'GBP' }
                          ]}
                          className="form__select"
                        /> */}
                      </div>
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
                <div className="form__fields-wrapper">
                  {this.state.checkBoxesImages.map((cb) => (
                    <ImageSelect
                      key={cb.name}
                      imageName={cb.imageName}
                      imageSrcName={false}
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
