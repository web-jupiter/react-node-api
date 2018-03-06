import React from 'react';
import { Formik } from 'formik';
import * as yup from 'yup';
import { Form, Input, SubmitBtn } from 'react-formik-ui';

export class SignupSupplierForm extends React.Component {
  constructor(props) {
    super(props);
    this.SignupSupplierSubmit = this.SignupSupplierSubmit.bind(this);
    this.state = {
      alertType: "none",
      alertMsg: ""
    };
  }

  SignupSupplierSubmit(values) {
    return fetch('https://fototripr.com/api/v1/TripHosts/', {
      method: 'POST',
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
        state: values.state,
        zipCode: values.zipCode,
        country: values.country,
        phone: values.phone
      })
    })
      .then((response) => {
        if (response.ok) {
          response.json().then((data) => {
            this.props.history.push({
              pathname: '/edit-supplier-profile',
              state: {
                userId: this.props.userId,
                token: this.props.token,
                isLoggedIn: true
              }
            });
          });
          this.setState({alertType:"pass", alertMsg:"Registration successful"});
        }
      })
      .catch((err) => {
        console.log(err);
        this.setState({alertType:"warn", alertMsg:"Sorry we can't register you"});
      });
  }

  render() {
    const { alertType, alertMsg } = this.state;
    const getSchema = () => {
      return yup.object().shape({
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

    return (
      <Formik
        initialValues={{
          firstName: '',
          lastName: '',
          country: '',
          address: '',
          city: '',
          state: '',
          zipCode: '',
          phone: ''
        }}
        validationSchema={getSchema}
        onSubmit={this.SignupSupplierSubmit}
        render={() => {
          return (
            <Form mode="structured" className="form">
              <fieldset>
                {            
                  <div className={`alert ${alertType}`}>{alertMsg}</div>
                }
                <div className="form__title">
                  Let's get you signed up as a supplier
                </div>
                <br />

                <Input
                  name="firstName"
                  placeholder="First Name*"
                  required
                  className="form__input"
                />

                <Input
                  name="lastName"
                  placeholder="Last Name*"
                  required
                  className="form__input"
                />

                <Input
                  name="country"
                  placeholder="Country*"
                  required
                  className="form__input"
                />

                <Input
                  name="address"
                  placeholder="Address*"
                  required
                  className="form__input"
                />

                <Input
                  name="city"
                  placeholder="City*"
                  required
                  className="form__input"
                />

                <Input
                  name="state"
                  placeholder="State*"
                  required
                  className="form__input"
                />

                <Input
                  name="zipCode"
                  placeholder="Post / Zip code*"
                  required
                  className="form__input"
                />

                <Input
                  name="phone"
                  placeholder="Phone*"
                  required
                  className="form__input"
                />

                <SubmitBtn className="form__submit-btn" children="Next" />
              </fieldset>
            </Form>
          );
        }}
      />
    );
  }
}
