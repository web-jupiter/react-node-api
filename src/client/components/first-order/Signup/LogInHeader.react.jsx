import React from "react";
import {connect} from "react-redux";
import Grid from '@material-ui/core/Grid';
import Link from "@material-ui/core/Link";
import Typography from '@material-ui/core/Typography';
import {LOGIN_HEADER_TEXT, SIGNUP_PROMPT} from "../../../config/constants";
import useStyles from "./SignUpStyles";
import {showSignupFormAction} from "../../../redux/actions";

const SignUpPrompt = (props) => {
  return (
  <Grid container justify="center">
    <Grid item xs>
      <Link href="#" variant="body2" onClick={e => {
        e.preventDefault();
        props.handleClick();
      }}
      >
        {SIGNUP_PROMPT}
      </Link>
    </Grid>
  </Grid>
  );
}

const LogInHeader = (props) => {
  const classes = useStyles();
  const text = props.textProp || LOGIN_HEADER_TEXT;
  return (
    <React.Fragment >
      <Typography variant="h1" component="h2" gutterBottom className={classes.header}>
          {text}
      </Typography>
      <SignUpPrompt handleClick={props.changeAuthType}/>
    </React.Fragment>
  );
}

export const mapDispatchToProps = dispatch => {
  return {
    changeAuthType: (options) => {
      return dispatch(showSignupFormAction(options));
    }
  }
}
export default connect(null, mapDispatchToProps)(LogInHeader);