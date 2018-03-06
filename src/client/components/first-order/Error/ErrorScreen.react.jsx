import React from "react";
import {connect} from "react-redux";

const ErrorScreenComponent = (props) => {
  return (
    <div>Something went wrong</div>
  );
}

const ErrorScreen = (props) => {
  const {applicationError} = props;
  const errorComponent = ErrorScreenComponent(props);
  return !!applicationError && errorComponent;
}

const mapStateToProps = (state) => {
  return {
    applicationError : state.applicationError
  }
}

export default connect(mapStateToProps)(ErrorScreen);
