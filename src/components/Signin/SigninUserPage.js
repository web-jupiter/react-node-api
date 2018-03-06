import React from 'react';
import SigninUserForm from './SigninUserForm';

import logo from '../../images/logoBlack.png';

const SigninUserPage = () => (
  <div className="signup">
    <div className="signup__welcome">
      <div className="logo">
        <img src={logo} alt="" className="logo__img" />
      </div>
      <div className="signup__text-block">
        <strong>Let’s get you signed in.</strong>
      </div>
    </div>
    <SigninUserForm />
  </div>
);

export default SigninUserPage;
