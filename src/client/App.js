import React, { Component } from "react";
import PropTypes from 'prop-types';
import {connect} from "react-redux";
import AuthEntryPage from "./components/first-order/Signup/AuthEntryPage.react";
import UserEntryPage from "./components/first-order/User/UserEntryPage.react";
import { autoLogin } from "./redux/actions";

/**
 * @name App @extends React.Component
 * @prop {Boolean} isLoggedIn: Checks if user is logged in [read from redux state]
 * @description If user logged in => Show dashboard else => show signup/login
 */
export class App extends Component {
  render(){
    const { isLoggedIn, trips } = this.props;
    return(
      <React.Fragment>
        {!isLoggedIn && <AuthEntryPage />}
        {!!isLoggedIn && !!trips && <UserEntryPage />}
      </React.Fragment>
    );
  }
}

App.propTypes = {
  isLoggedIn: PropTypes.bool,
  trips: PropTypes.array
}

export const mapStateToProps = (state) => {
  return {
    isLoggedIn : state.user.isLoggedIn,
    trips: state.user.savedTrips
  }
};

export const mapDispatchToProps = dispatch => {
  return dispatch(autoLogin());
}

export default connect(mapStateToProps, mapDispatchToProps)(App);
