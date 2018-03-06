import React from 'react';
import { NavLink } from 'react-router-dom';
import App from '../../App';

class TripSidebar extends React.Component {
  render() {
    if (this.props.isLoggedIn) {
      return (
        <div className="trip__sidebar">
          <h2 className="trip__sidebar-title">Trip management</h2>

          <ul className="trip__sidebar-navigation">
            <li className="nav__item">
              <NavLink
                className="nav__link"
                to={{
                  pathname: '/edit-supplier-profile',
                  state: {
                    isLoggedIn: this.props.isLoggedIn,
                    userId: this.props.userId,
                    token: this.props.token
                  }
                }}
              >
                Edit Profile
              </NavLink>
            </li>

            <li className="nav__item">
              <NavLink
                className="nav__link"
                to={{
                  pathname: '/add-trip',
                  state: {
                    isLoggedIn: this.props.isLoggedIn,
                    userId: this.props.userId,
                    token: this.props.token
                  }
                }}
              >
                Add Trip
              </NavLink>
            </li>

            {/* <li className="nav__item">
              <NavLink
                className="nav__link"
                to={{
                  pathname: '/update-trip',
                  state: {
                    isLoggedIn: this.props.isLoggedIn,
                    userId: this.props.userId,
                    token: this.props.token
                  }
                }}
              >
                Update Trip
              </NavLink>
            </li> */}
            <li className="nav__item">
              <NavLink
                className="nav__link"
                to={{
                  pathname: '/all-trips',
                  state: {
                    isLoggedIn: this.props.isLoggedIn,
                    userId: this.props.userId,
                    token: this.props.token
                  }
                }}
              >
                Edit Trips
              </NavLink>
            </li>
            <li className="nav__item">
              <NavLink
                exact
                className="nav__link"
                to={{
                  pathname: '/',
                  state: {
                    isLoggedIn: '',
                    userId: '',
                    token: ''
                  }
                }}
              >
                Logout
              </NavLink>
            </li>
          </ul>
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

export default TripSidebar;
