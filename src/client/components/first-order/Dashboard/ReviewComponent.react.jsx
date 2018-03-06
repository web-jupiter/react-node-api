import React from "react";
import PropTypes from 'prop-types';

import ErrorBoundary from "../Error/ErrorBoundry.react";

const ReviewComponent = (props) => {
  return(
    <ErrorBoundary>
      <div>Reviews:</div>
    </ErrorBoundary>
  )
}

ReviewComponent.propTypes = {}

export default ReviewComponent;