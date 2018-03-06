import React from 'react';
import { UpdateTripForm } from './UpdateTripForm';
import App from '../../App';
import TripSidebar from './TripSidebar';

import logo from '../../images/logoBlack.png';
class UpdateTripPage extends React.Component {
  hamburgerClick = () => {
    document.querySelector('.hamburger--spring').classList.toggle('is-active');
    document.querySelector('.trip__sidebar').classList.toggle('is-visible');
  };
  render() {
    const locationState = this.props.history.location.state;
    const isLoggedIn = locationState && locationState.isLoggedIn;
    const token = locationState && locationState.token;
    const userId = locationState && locationState.userId;

    if (isLoggedIn) {
      return (
        <div className="trip__page">
          <div className="logo">
            <img src={logo} alt="" className="logo__img" />
          </div>
          <button
            onClick={this.hamburgerClick}
            className="hamburger hamburger--spring"
            type="button"
          >
            <span className="hamburger-box">
              <span className="hamburger-inner"></span>
            </span>
          </button>
          <TripSidebar isLoggedIn={isLoggedIn} token={token} userId={userId} />
          <UpdateTripForm
            {...this.props}
            trip={locationState.trip}
            token={token}
            isLoggedIn={isLoggedIn}
          />
        </div>
      );
    } else {
      return (
        <React.Fragment>
          <App {...this.props} reasonForRedirection="Please signup first." />
        </React.Fragment>
      );
    }
  }
}

export default UpdateTripPage;
