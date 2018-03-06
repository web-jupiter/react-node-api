import React from "react";
import Typography from '@material-ui/core/Typography';
import {connect} from "react-redux";
import Grid from '@material-ui/core/Grid';
import Link from "@material-ui/core/Link";
import {SIGNUP_HEADER_TEXT, SIGN_IN_PROMPT} from "../../../config/constants";
import useStyles from "./SignUpStyles";
import {showLoginFormAction} from "../../../redux/actions";

const SignInPrompt = (props) => {
  return (
  <Grid container justify="center">
    <Grid item xs>
      <Link href="#" variant="body2" onClick={e => {
        e.preventDefault();
        props.handleClick();
      }}
      >
        {SIGN_IN_PROMPT}
      </Link>
    </Grid>
  </Grid>
  );
}
const SignUpHeader = (props) => {
  const classes = useStyles();
  const text = props.textProp || SIGNUP_HEADER_TEXT;
  return (
    <React.Fragment >
      <Typography variant="h3" component="h3" gutterBottom className={classes.header}>
          {text}
      </Typography>
      <SignInPrompt handleClick={props.changeAuthType}/>
    </React.Fragment>

  );
}
export const mapDispatchToProps = dispatch => {
  return {
    changeAuthType: (options) => {
      return dispatch(showLoginFormAction(options));
    }
  }
}

export default connect(null, mapDispatchToProps)(SignUpHeader);