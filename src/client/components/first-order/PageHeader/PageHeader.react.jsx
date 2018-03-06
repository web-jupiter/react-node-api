import React, { useEffect } from "react";
import AppBar from "@material-ui/core/AppBar";
import { makeStyles } from "@material-ui/core/styles";
import Grid from "@material-ui/core/Grid";
import {Typography} from "@material-ui/core"

const useStyles = makeStyles(theme => ({
  root: {
    flexGrow: 1
  },
  pageHeading: {
    padding: "2rem"
  }
}));

const PageHeader = props => {
  const classes = useStyles();
  return (
    <Grid item xs={12}>
      <Typography variant="h4" component="h4" gutterBottom className={classes.pageHeading}>
        <strong>{props.textProp}</strong>
      </Typography>
    </Grid>
  );
};

export default PageHeader;
