import React, {PureComponent, useState} from "react";
import PropTypes from 'prop-types';
import {connect} from "react-redux";

import CssBaseline from '@material-ui/core/CssBaseline';
import Paper from '@material-ui/core/Paper';
import Grid from '@material-ui/core/Grid';
import useStyles from "./SignUpStyles";

import { ThemeProvider } from '@material-ui/styles';
import theme from '../../../themes/common';

import SignUpForm from "./SignUpForm.react";
import LoginForm from "./LogInForm.react";
import { AUTH_STATE_VARIANTS } from "../../../config/constants";
import ResetPassword from "./ResetPassword.react";
import ErrorBoundary from "../Error/ErrorBoundry.react";
import Header from "../Header/Header.react";

/**
 * @name AuthEntryPage @extends React.PureComponent
 * @description Renders if user is not logged in and determines
 * which screen to show 1) Sign up 2) Login 3) Reset Password
 * @todo Add tests
 */

const StyleComponent = (props) => {
  const classes = useStyles();
  return (
      <Grid container component="main" className={classes.root}>
          <CssBaseline />
          <Grid item xs={false} sm={false} md={7} className={classes.image} />
          <Grid item xs={12} sm={12} md={5} component={Paper} elevation={6} square className={classes.sidebar}>
            <div className={classes.paper} >
              {props.children}
            </div>
          </Grid>
      </Grid>
  );
}

const AuthComponent = (AuthState) => {
  const classes = useStyles();
  switch (AuthState) {
    case AUTH_STATE_VARIANTS.SIGN_UP:
      return <SignUpForm classes={classes} />
    case AUTH_STATE_VARIANTS.LOGIN:
      return <LoginForm classes={classes} />
    case AUTH_STATE_VARIANTS.RESET:
      return <ResetPassword classes={classes} />
    default:
      return <SignUpForm classes={classes} />
  }
}

const AuthEntryPage = (props) => {
  const {AuthState} = props;
  return (
    <ErrorBoundary>
      <ThemeProvider theme={theme}>
        <Header />
        <StyleComponent>
          {AuthComponent(AuthState)}
        </StyleComponent>
      </ThemeProvider>   
    </ErrorBoundary>
  );

}

AuthEntryPage.propTypes = {
  AuthState: PropTypes.string
}

const mapStateToProps = (state) => {
  const {authForms} = state;
  return {
    AuthState: authForms.AuthState
  }
}

export default connect(mapStateToProps)(AuthEntryPage);