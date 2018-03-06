import React, { Component } from 'react';
import { Formik } from 'formik';
import * as yup from 'yup';
import { Form, Input, SubmitBtn } from 'react-formik-ui';
import { withRouter } from 'react-router-dom';

class SigninForm extends Component {
  constructor(props) {
    super(props);
    // const alert = "";
    // props.alert = "";
    this.state = {
      alertType: "none",
      alertMsg: ""

    };
  }
  onSubmit = (values) => {
    this.signinUserSubmit(values);
  };

  signinUserSubmit = (values) => {
    return fetch('https://fototripr.com/api/v1/Users/Authenticate', {
      method: 'POST',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        email: values.email,
        password: values.password
      })
    })
      .then((response) => {
        
        if (response.ok) {        
          this.setState({invalidWarning: ""});
          response.json().then((data) => {
            this.props.history.push({
              pathname: '/all-trips',
              state: {
                userId: data.result.id,
                token: data.result.token,
                isLoggedIn: true
              }
            });
          });
          this.setState({alertType: "pass", alertMsg: "Log in Successfully"});
        } else {
          //  console.log("login failed");
           this.setState({alertType: "warn", alertMsg: "Username or password is incorrect"});
        }
      })
      .catch((err) => {
        console.log(err);
      });
  };

  render() {

    const { alertType, alertMsg } = this.state;
    const getSchema = () => {
      this.setState({invalidWarning: ""});
      return yup.object().shape({
        email: yup.string().required('Email is required'),
        password: yup.string().required('Password is required')
      });
    };

    return (
      <Formik
        initialValues={{
          email: '',
          password: ''
        }}
        validationSchema={getSchema}
        // validate={checkSchema}
        
        onSubmit={this.onSubmit}
        render={() => {
          return (
            <Form mode="structured" className="form">
              <fieldset>
                {            
                  <div className={`alert ${alertType}`}>{alertMsg}</div>
                }
                <h1
                  className="form__title"
                  style={{ fontSize: '2em', textTransform: 'uppercase' }}
                >
                  Signin
                </h1>
                <br />
                <Input
                  name="email"
                  type="email"
                  placeholder="Email*"
                  required
                  className="form__input"
                />

                <Input
                  name="password"
                  type="password"
                  placeholder="Password*"
                  required
                  className="form__input"
                />

                {/* {if(this.state.)} */}
                <span className="error" style={{ color: 'red'}}>{this.state.invalidWarning}</span>
                
                <br style={{visibility: 'hidden'}} />

                <SubmitBtn className="form__submit-btn" children="Signin" />
                
              
              </fieldset>
            </Form>
          );
        }}
      />
    );
  }
}

export default withRouter(SigninForm);
