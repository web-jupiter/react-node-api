import React from "react";
import PropTypes from 'prop-types';
import {connect} from "react-redux";

import ErrorBoundary from "../Error/ErrorBoundry.react";
import useStyles from "./DashboardStyles";
import BookingComponent from "./BookingComponent.react";
import InvoiceComponent from "./InvoiceComponent.react";
import ReviewComponent from "./ReviewComponent.react";
import MediaLibrary from "./MediaLibraryComponent.react";
import {STATE_SIDEBAR} from "../../../config/constants";

const DisplayDashboard = () => {
  const classes = useStyles();
  return (
    <ErrorBoundary>
      <BookingComponent/>
      <InvoiceComponent/>
      <ReviewComponent/>
      <MediaLibrary/>
    </ErrorBoundary>
  );
}

const Dashboard = (props) => {
  const { formState, isLoggedIn } = props;
  const pageSelected = STATE_SIDEBAR[formState];
  return ((pageSelected === "dashboard") && !!isLoggedIn && DisplayDashboard());
}

Dashboard.propTypes = {
  isLoggedIn: PropTypes.bool,
  formState: PropTypes.number
}

const mapStateToProps = (state) => {
  const {user} = state;
  return {
    isLoggedIn: user.isLoggedIn,
    formState: user.formState
  }
}

export default connect(mapStateToProps)(Dashboard);