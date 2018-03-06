
import React from 'react';
import { Formik } from 'formik';
import * as yup from 'yup';
import { Form, Input, SubmitBtn} from 'react-formik-ui';
import { withRouter } from 'react-router-dom';
// import { SigninForm } from "../Signin/SigninUserForm";
// import validator from 'validator';
// import * as EmailValidator from 'email-validator';
class SignupUserForm extends React.Component {

  constructor(props) {
    super(props);
    
    this.onSubmit = this.onSubmit.bind(this);
    this.SignupUserSubmit = this.SignupUserSubmit.bind(this);
    this.isLogined = false;

    this.state = {
      alertType: "none",
      alertMsg: ""
    };

    
    
  }
  isValidEmailAddress(address) {
    return !!address.match(/.+@.+/);
}
  
  onSubmit = (values, actions) => {
    // SigninForm.si
    this.SignupUserSubmit(values);
  };
  handleChange (e) {
    // this.state.email += e;
    if(this.state.invalidWarning !== "")
      this.setState({invalidWarning:""});
  }

  SignupUserSubmit(values) {

    //check if this text is email format
    if(!this.isValidEmailAddress(values.email)){
      this.setState({alertType:"warn", alertMsg:"Please input correct mail"});
      return;
    }


console.log(this.isLogined);
    return fetch('https://fototripr.com/api/v1/Users/Register', {
        method: 'POST',
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            "email" : values.email,
            "password" : values.password,
            "firstName" : values.firstName,
            "lastName": values.lastName
        })
    }).then((response) => {
        if (response.ok) {
            console.log("signupOK");
            this.setState({invalidWarning:""});
            response.json().then(data => {
                this.props.history.push({
                    pathname:  "/signup-supplier",
                    state: {
                      userId: data.result.id,
                      token: data.result.token,
                      isSignedUpAsUser: true
                    }
                });
            });
            this.setState({alertType:"pass", alertMsg:"Registration successful"});
        } else {
          console.log("eorror");
          this.setState({alertType:"warn", alertMsg:"Please use another mail"});
        }
    }).catch((err) => {
        console.log(err);
    })
  }

  render() {
    const { alertType, alertMsg } = this.state;
    const getSchema = () => {
      return yup.object().shape({
        email: yup
          .string()
          .required('Email is required'),
        password: yup
          .string()
          .required('Password is required')
      });
    };
    
    return(
        <Formik
        initialValues={{
          email: '',
          password: '',
          firstName: '',
          lastName: ''
        }}
        validationSchema={getSchema}
        onSubmit={this.onSubmit}
        render={() => {
        return (
          <Form mode='structured' className="form">
            <fieldset>
              {            
                <div className={`alert ${alertType}`}>{alertMsg}</div>
              }
              <h1 className="form__title" style={{fontSize: "2em", textTransform: "uppercase"}}>
              Create an Account
              </h1>
              <br/>
                <Input
                  name='email'
                  type='email'
                  placeholder='Email*'
                  required
                  className="form__input"
                  // onChange={(e) => {this.handleChange(e)}}
                />

                <Input
                  name='password'
                  type='password'
                  placeholder='Password*'
                  required
                  className="form__input"
                  // onChange={(e) => {this.handleChange(e)}}
                />

                <Input
                  name='firstName'
                  placeholder='First Name'
                  required
                  className="form__input"
                />

                <Input
                  name='lastName'
                  placeholder='Last Name'
                  required
                  className="form__input"
                />
                <span className="error" style={{ color: 'red'}}>{this.state.invalidWarning}</span>
                <br style={{visibility: 'hidden'}} />

                <SubmitBtn className="form__submit-btn" children="Get started" />
              </fieldset>
            </Form>
          );
        }}
      />
     );
   }
}

export default withRouter(SignupUserForm);