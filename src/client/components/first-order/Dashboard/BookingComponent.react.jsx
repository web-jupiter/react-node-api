import React from "react";
import PropTypes from 'prop-types';

import ErrorBoundary from "../Error/ErrorBoundry.react";

const BookingComponent = (props) => {
  return(
    <ErrorBoundary>
      <div>Booking</div>
    </ErrorBoundary>
  )
}

BookingComponent.propTypes = {}

export default BookingComponent;