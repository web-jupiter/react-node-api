import React from 'react';
import { Link } from 'react-router-dom';

class SignupSidebar extends React.Component {
  render() {
    return (
      <React.Fragment>
        <ul>
          <li>
            <Link to="/signup-user">Signup</Link>
          </li>
          <li>
            <Link to="/signin-user">Signin</Link>
          </li>
        </ul>
      </React.Fragment>
    );
  }
}

export default SignupSidebar;
