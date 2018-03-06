import React from "react";
import {connect} from "react-redux";
import PropTypes from 'prop-types';
import Grid from '@material-ui/core/Grid';
import styled from 'styled-components';

import LogInHeader from "./LogInHeader.react";
import FormFields from "./FormFields.react";
import {submitLoginFormAction, loginUser, logoutUser, LOGIN_SUCCESS} from "../../../redux/actions";

const handleSubmit = (e, props) => {
  e.preventDefault();
  return props.signup({
    // AuthState: props.authState,
    // AuthStage: props.authStage
    email: props.fieldValues.email,
    password: props.fieldValues.password
  });
}

export const LogInForm = (props) => {
  const {classes, fields, headerText} = props;
  const items = fields.map((field,i) => <FormFields key={`${field}-${i}`} field={field}/>);
  return (
    <Grid container justify="center">
      <LogInHeader  textProp={headerText} className={classes.header}/>
      <form  className={classes.form} onSubmit={e => handleSubmit(e, props)} >
          {items}
      </form>
    </Grid>

  )
}

LogInForm.propTypes = {
  fields: PropTypes.array,
  classes: PropTypes.object,
  signup: PropTypes.func,
  authStage: PropTypes.string,
  authState: PropTypes.string
}

LogInForm.defaultProps = {
  fields: [],
  classes: {}
}
export const mapStateToProps = (state) => {
  const {authForms} = state;
  return {
    fields : authForms.fields,
    fieldValues: authForms.fieldValues,
    headerText: authForms.headerText,
    authState: authForms.AuthState,
    authStage: authForms.AuthStage
  }
}

export const mapDispatchToProps = dispatch => {
  return {
    // signup: (options) => {
    //   return dispatch(submitLoginFormAction(options));
    // }
    signup: (options) => {
      return dispatch(loginUser(options));
    }
  }
}


export default connect(mapStateToProps, mapDispatchToProps)(LogInForm);