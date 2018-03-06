import React from 'react';
import { Formik } from 'formik';
import * as yup from 'yup';
import { Form, Input, DropZone, SubmitBtn, Textarea } from 'react-formik-ui';

import ErrorBoundary from '../ErrorBoundary';

export class EditSupplierProfileForm extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      error: null,
      isLoaded: false,
      portfolioImages: [],
      initialValues: []
    };

    this.EditSupplierProfileSubmit = this.EditSupplierProfileSubmit.bind(this);
    this.uploadImg = this.uploadImg.bind(this);
  }

  async uploadImg(profilePic) {
    if (profilePic === undefined) {
      return { name: '' };
    }
    const formData = new FormData();
    formData.append('file', profilePic);
    const response = await fetch('https://fototripr.com/api/v1/Images/0', {
      method: 'POST',
      headers: {
        Authorization: 'Bearer ' + this.props.token
      },
      body: formData
    });

    return await response.json();
  }

  handleAddPhoto = (e) => {
    e.preventDefault();
    const count = this.state.portfolioImages.length + 1;
    const imageName = `img${count}`;
    this.setState({
      portfolioImages: [...this.state.portfolioImages, { imageName, value: '' }]
    });
  };

  handleRemovePhoto = (e, imageName) => {
    e.preventDefault();
    this.setState({
      portfolioImages: this.state.portfolioImages.filter(
        (item) => item.imageName !== imageName
      )
    });
  };

  async EditSupplierProfileSubmit(values) {
    this.setState({
      isLoaded: false
    });

    const { portfolioImages } = this.state;

    let uploadedProfilePic = {};
    if (values.profilePic[0] && values.profilePic[0].length !== 0) {
      uploadedProfilePic = await this.uploadImg(values.profilePic[0]);
    } else {
      uploadedProfilePic.name = this.state.initialValues.profilePicName;
    }

    var uploadedPortfolioImg = '';
    var portfolioImgs = [];

    for (let i = 0; i < portfolioImages.length; i++) {
      if (values[portfolioImages[i].imageName].length !== 0) {
        uploadedPortfolioImg = await this.uploadImg(
          values[portfolioImages[i].imageName][0]
        );
        portfolioImgs.push({ photoKey: uploadedPortfolioImg.name });
      } else if (portfolioImages[i].value !== '') {
        portfolioImgs.push({ photoKey: portfolioImages[i].value });
      }
    }

    return fetch('https://fototripr.com/api/v1/TripHosts/' + this.props.userId, {
      method: 'PUT',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
        Authorization: 'Bearer ' + this.props.token
      },
      body: JSON.stringify({
        userId: this.props.userId,
        firstName: values.firstName,
        lastName: values.lastName,
        address: values.address,
        city: values.city,
        zipCode: values.zipCode,
        country: values.country,
        state: values.state,
        phone: values.phone,
        profilePic: {
          photoKey: uploadedProfilePic.name, //responses,
          description: ''
        },
        website: values.website,
        facebook: values.facebook,
        instagram: values.instagram,
        bio: values.bio,
        portfolio: portfolioImgs
      })
    })
      .then((response) => {
        if (response.ok) {
          // console.log('PUT call succeeded');
          response.json().then((data) => {
            // console.log(data);
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
    fetch('https://fototripr.com/api/v1/TripHosts/' + this.props.userId, {
      method: 'GET',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
        Authorization: 'Bearer ' + this.props.token
      }
    })
      .then((res) => res.json())
      .then(
        (tripHostsGetResponse) => {
          // console.log(tripHostsGetResponse.result.profilePic);
          const portfolioImages = [
            { imageName: 'img1', value: '' },
            { imageName: 'img2', value: '' },
            { imageName: 'img3', value: '' },
            { imageName: 'img4', value: '' }
          ];
          let initialValues = {
            userId: tripHostsGetResponse.result.userId
              ? tripHostsGetResponse.result.userId
              : '',
            profilePic: [], //tripHostsGetResponse,
            profilePicName: tripHostsGetResponse.result.profilePic
              ? tripHostsGetResponse.result.profilePic.photoKey
              : '',
            firstName: tripHostsGetResponse.result.firstName
              ? tripHostsGetResponse.result.firstName
              : '',
            lastName: tripHostsGetResponse.result.lastName
              ? tripHostsGetResponse.result.lastName
              : '',
            address: tripHostsGetResponse.result.address
              ? tripHostsGetResponse.result.address
              : '',
            city: tripHostsGetResponse.result.city
              ? tripHostsGetResponse.result.city
              : '',
            state: tripHostsGetResponse.result.state
              ? tripHostsGetResponse.result.state
              : '',
            zipCode: tripHostsGetResponse.result.zipCode
              ? tripHostsGetResponse.result.zipCode
              : '',
            country: tripHostsGetResponse.result.country
              ? tripHostsGetResponse.result.country
              : '',
            phone: tripHostsGetResponse.result.phone
              ? tripHostsGetResponse.result.phone
              : '',
            website: tripHostsGetResponse.result.website
              ? tripHostsGetResponse.result.website
              : '',
            facebook: tripHostsGetResponse.result.facebook
              ? tripHostsGetResponse.result.facebook
              : '',
            instagram: tripHostsGetResponse.result.instagram
              ? tripHostsGetResponse.result.instagram
              : '',
            bio: tripHostsGetResponse.result.bio
              ? tripHostsGetResponse.result.bio
              : ''
          };

          if (tripHostsGetResponse.result.portfolio) {
            initialValues = {
              ...initialValues,
              ...tripHostsGetResponse.result.portfolio.reduce(
                (acc, { photoKey }, index) => ({
                  ...acc,
                  [`imgPortfolioName${index + 1}`]: photoKey
                }),
                {}
              )
            };
          }

          this.setState({
            isLoaded: true,
            portfolioImages: tripHostsGetResponse.result.portfolio
              ? [
                  ...tripHostsGetResponse.result.portfolio.map(
                    (item, index) => ({
                      imageName: `img${index + 1}`,
                      value: item.photoKey
                    })
                  )
                ]
              : [...portfolioImages],
            initialValues: { ...initialValues }
          });
        },
        (error) => {
          this.setState({
            isLoaded: true,
            error
          });
        }
      )
      .catch((error) => {
        this.setState({
          isLoaded: true,
          error
        });
      });
  }

  render() {
    const getSchema = () => {
      return yup.object().shape({
        // profilePic: yup.string().required('Picture is required'),
        firstName: yup.string().required('First name is required'),
        lastName: yup.string().required('Last name is required'),
        country: yup.string().required('Country is required'),
        address: yup.string().required('Address is required'),
        city: yup.string().required('City is required'),
        state: yup.string().required('State is required'),
        zipCode: yup.string().required('Post / Zip code is required'),
        phone: yup.string().required('Phone is required')
      });
    };

    const { error, isLoaded, initialValues, portfolioImages } = this.state;

    portfolioImages.forEach((item) => {
      initialValues[item.imageName] = [];
    });

    if (error) {
      return <div>Error: {error.message}</div>;
    } else if (!isLoaded) {
      return <div>Loading...</div>;
    } else {
      return (
        <Formik
          enableReinitialize={true}
          initialValues={initialValues}
          validationSchema={getSchema}
          onSubmit={this.EditSupplierProfileSubmit}
          render={() => {
            return (
              <Form mode="structured" className="form">
                <fieldset>
                  <div className="form__container">
                    <div className="col">
                      <div className="form__title form__title--sm">
                        Personal
                      </div>
                      {this.state.initialValues.profilePicName ? (
                        <DropZone
                          id="profilePic"
                          name="profilePic"
                          className="profile-pic loaded"
                          style={{
                            backgroundImage: `url(https://fototripr.com/api/v1/Images?name=${this.state.initialValues.profilePicName
                              .split(' ')
                              .join('%20')}&id=none)`,
                            width: '200px'
                          }}
                        />
                      ) : (
                        <DropZone
                          name="profilePic"
                          className="profile-pic"
                          placeholder="Change photo"
                        />
                      )}

                      <div>
                        <label style={{textAlign:"left", width:"100%", display:"block"}}>First Name</label>
                        <Input
                          name="firstName"
                          placeholder="First Name*"
                          required
                          className="form__input"
                        />
                      </div>
                      
                      <div>
                        <label style={{textAlign:"left", width:"100%", display:"block"}}>Last Name</label>
                        <Input
                          name="lastName"
                          placeholder="Last Name*"
                          required
                          className="form__input"
                        />
                      </div>
                      
                    </div>
                    <div className="col">
                      <div className="form__title form__title--sm">
                        Location
                      </div>
                      <div>
                        <label style={{textAlign:"left", width:"100%", display:"block"}}>Country</label>
                        
                        <Input
                          name="country"
                          placeholder="Country*"
                          required
                          className="form__input"
                        />
                      </div>
                      
                      <div>
                        <label style={{textAlign:"left", width:"100%", display:"block"}}>Address</label>
                        <Input
                          name="address"
                          placeholder="Address*"
                          required
                          className="form__input"
                        />
                      </div>
                      
                      <div>
                        <label style={{textAlign:"left", width:"100%", display:"block"}}>City</label>
                        <Input
                          name="city"
                          placeholder="City*"
                          required
                          className="form__input"
                        />
                      </div>
                      
                      <div>
                        <label style={{textAlign:"left", width:"100%", display:"block"}}>State</label>
                        <Input
                          name="state"
                          placeholder="State*"
                          required
                          className="form__input"
                        />
                      </div>
                      
                      <div>
                        <label style={{textAlign:"left", width:"100%", display:"block"}}>ZipCode</label>
                        <Input
                          name="zipCode"
                          placeholder="Post / Zip code*"
                          required
                          className="form__input"
                        />
                      </div>
                      
                      <div>
                        <label style={{textAlign:"left", width:"100%", display:"block"}}>Phone</label>
                        <Input
                          name="phone"
                          placeholder="Phone*"
                          required
                          className="form__input"
                        />
                      </div>
                      
                    </div>
                  </div>

                  <div className="form__container">
                    <div className="col">
                      <div className="form__title form__title--sm">
                        Portfolio:
                      </div>
                      <div className="form__fields-wrapper">
                        {portfolioImages.map((item) =>
                          item.value !== '' ? (
                            <ErrorBoundary key={item.imageName}>
                              <div className="form__image-select">
                                <button
                                  className="remove-img__btn"
                                  onClick={(e) =>
                                    this.handleRemovePhoto(e, item.imageName)
                                  }
                                >
                                  &times;
                                </button>
                                <DropZone
                                  className="loaded"
                                  name={item.imageName}
                                  style={{
                                    backgroundImage: `url(https://fototripr.com/api/v1/Images?name=${item.value
                                      .split(' ')
                                      .join('%20')}&id=none)`,
                                    width: '180px'
                                  }}
                                />
                              </div>
                            </ErrorBoundary>
                          ) : (
                            <ErrorBoundary key={item.imageName}>
                              <div className="form__image-select">
                                <button
                                  className="remove-img__btn"
                                  onClick={(e) =>
                                    this.handleRemovePhoto(e, item.imageName)
                                  }
                                >
                                  &times;
                                </button>
                                <DropZone name={item.imageName} />
                              </div>
                            </ErrorBoundary>
                          )
                        )}
                      </div>
                      <div style={{ marginBottom: '1em' }}>
                        <button
                          onClick={this.handleAddPhoto}
                          className="add-btn"
                        >
                          Add more photo
                        </button>
                      </div>
                    </div>
                    <div className="col col--ext">
                      <div className="form__title form__title--sm">Company</div>

                      <div>
                        <label style={{textAlign:"left", width:"100%", display:"block"}}>Website</label>
                        <Input
                          name="website"
                          placeholder="Website"
                          className="form__input"
                        />
                      </div>
                      <div>
                        <label style={{textAlign:"left", width:"100%", display:"block"}}>Facebook</label>
                        <Input
                          name="facebook"
                          placeholder="Facebook"
                          className="form__input"
                        />
                      </div>

                      <div>
                        <label style={{textAlign:"left", width:"100%", display:"block"}}>Instagram</label>
                        <Input
                          name="instagram"
                          placeholder="Instagram"
                          className="form__input"
                        />
                      </div>

                      <div>
                        <label style={{textAlign:"left", width:"100%", display:"block"}}>Short bio</label>
                        <Textarea
                          name="bio"
                          label="Short bio"
                          className="form__textarea form__textarea--sm"
                        />
                      </div>
                    </div>
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
}
