import React from 'react';
import { SignupSupplierForm } from './SignupSupplierForm';
import App from '../../App';

import logo from '../../images/logoBlack.png';

class SignupSupplierPage extends React.Component {
  render() {
    const locationState = this.props.history.location.state;
    const isSignedUpAsUser = locationState && locationState.isSignedUpAsUser;
    const userId = locationState && locationState.userId;
    const token = locationState && locationState.token;

    if (isSignedUpAsUser) {
      return (
        <div className="signup">
          <div className="signup__welcome">
            <div className="logo">
              <img src={logo} alt="" className="logo__img" />
            </div>
            <div className="signup__text-block">
              <strong>Let’s get you signed up.</strong>
            </div>
          </div>
          <SignupSupplierForm
            {...this.props}
            userId={userId}
            token={token}
            isSignedUpAsUser={isSignedUpAsUser}
          />
        </div>
      );
    } else {
      return (
        <React.Fragment>
          <App
            {...this.props}
            reasonForRedirection="Sign up failed! Please try again."
          />
        </React.Fragment>
      );
    }
  }
}

export default SignupSupplierPage;
