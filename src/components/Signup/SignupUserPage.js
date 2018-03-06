import React from 'react'
import SignupUserForm from './SignupUserForm'

import logo from "../../images/logoWhite.png";
import cover from "../../images/cover.jpg";

class SignupUserPage extends React.Component {
  render() {
    return (
      <div className="signup">
        <div className="signup__welcome" style={{backgroundColor: "rgba(42, 42, 42, 0.1)", backgroundImage: `linear-gradient(rgba(0,0,0,.6), rgba(0,0,0,.8)), url(${cover})`}}>
          <div className="logo">
            <img src={logo} alt="" className="logo__img"/>
          </div>
          <div className="signup__text-block signup__text-block--white">
          <div>Join the platform that</div>
          <div>makes your experience</div> 
          <strong>more discoverable.</strong>
          </div>
        </div>
        <SignupUserForm {...this.props}/>
      </div>
    );
  }
}

export default SignupUserPage;