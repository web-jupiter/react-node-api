import React from "react";
import PropTypes from 'prop-types';

import ErrorBoundary from "../Error/ErrorBoundry.react";

const MediaLibrary = (props) => {
  return(
    <ErrorBoundary>
      <div>Media Library:</div>
    </ErrorBoundary>
  )
}

MediaLibrary.propTypes = {}

export default MediaLibrary;