import React from "react";
import {connect} from "react-redux";
import PropTypes from 'prop-types';
import SignUpHeader from "./SignUpHeader.react";
import FormFields from "./FormFields.react";
import Grid from '@material-ui/core/Grid';
import {submitSignupFormAction} from "../../../redux/actions";

const handleSubmit = (e, props) => {
  e.preventDefault();
  return props.signup({
    AuthState: props.authState, 
    AuthStage: props.authStage
  });
}

const SignUpForm = (props) => {
  const {classes, fields, headerText} = props;
  console.log(fields);
  const items = fields.map((field,i) => <FormFields className={classes.field} key={`${field}-${i}`} field={field}/>);
  return (
      <Grid container justify="center">
        <SignUpHeader textProp={headerText} className={classes.header}/>
        <form  className={classes.form} onSubmit={e => handleSubmit(e, props)}>
          {items}
        </form>
      </Grid>
  );
}

SignUpForm.propTypes = {
  fields: PropTypes.array,
  classes: PropTypes.object,
  signup: PropTypes.func,
  authStage: PropTypes.string,
  authState: PropTypes.string
}

SignUpForm.defaultProps = {
  fields: [],
  classes: {}
}

export const mapStateToProps = (state) => {
  const {authForms} = state;
  return {
    fields : authForms.fields,
    headerText: authForms.headerText,
    authState: authForms.AuthState,
    authStage: authForms.AuthStage
  }
}

export const mapDispatchToProps = dispatch => {
  return {
    signup: (options) => {
      return dispatch(submitSignupFormAction(options));
    }
  }
}


export default connect(mapStateToProps, mapDispatchToProps)(SignUpForm);