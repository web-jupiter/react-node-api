import React from "react";
import PropTypes from 'prop-types';
import {connect} from "react-redux";

import CssBaseline from '@material-ui/core/CssBaseline';
import Grid from '@material-ui/core/Grid';
import Paper from '@material-ui/core/Paper';

import { ThemeProvider } from '@material-ui/styles';
import theme from '../../../themes/common';

import ErrorBoundary from "../Error/ErrorBoundry.react";
import Sidebar from "../Sidebar/Sidebar.react";
import Header from "../Header/Header.react";

import useStyles from "./UserPageStyles";
import PageHeader from "../PageHeader/PageHeader.react";
import TripEntryPageReact from "../Trips/TripEntryPage.react";
import DashboardReact from "../Dashboard/Dashboard.react";
import AddTourPage from "../Tourv2/add-tour-page";


const getContent = (textProp, theme) => {
  const classes = useStyles();
  return (
    <Grid item xs={10} className={classes.content}>
      <PageHeader textProp={textProp || "Dashboard"} />
      {/* <TripEntryPageReact /> */}
      <AddTourPage />
      <DashboardReact />
    </Grid>
  )
}

const UserEntryPage = (props) => {
  const classes = useStyles();
  const {textProp} = props;
  return (
    <ErrorBoundary>
      <ThemeProvider theme={theme}>
        <Grid container className={classes.root}>
          <CssBaseline />
          <Header className={classes.containerHeader} />
          <Grid item xs={2}>
            <Sidebar className={classes.sideBar}/>
          </Grid>
          {getContent(textProp, theme)}
        </Grid>
      </ThemeProvider>
    </ErrorBoundary>
  );

}

UserEntryPage.propTypes = {
  AuthState: PropTypes.string,
  textProp: PropTypes.string
}

const mapStateToProps = (state) => {
  const {user} = state;
  return {
    isLoggedIn: user.isLoggedIn,
    textProp: user.pageHeader
  }
}

export default connect(mapStateToProps)(UserEntryPage);