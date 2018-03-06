
import React from "react";
import {connect} from "react-redux";
import PropTypes from 'prop-types';
import FormFields from "./FormFields.react";
import Grid from '@material-ui/core/Grid';
import SectionHeader from "./SectionHeader.react";
import { Link } from "@material-ui/core";
import ATSelectNumber from "../../features/AT-Select/ATSelectNumber";
import ATField from "../../features/AT-Field/ATField";

const AccomodationSelectorBlock = (props) => {
  const [spacing, setSpacing] = React.useState(2);
  const {n} = props;
  return (
    <Grid container spacing={spacing} style={{"alignItems": "center"}}>
      <Grid item>
        <div>Day {n}</div>
      </Grid>
      <Grid item>
        <ATSelectNumber />
      </Grid>
      <Grid item>
      <ATField />
      </Grid>
      
    </Grid>

  );
}

AccomodationSelectorBlock.propTypes = {
  n: PropTypes.number
}

AccomodationSelectorBlock.defaultProps = {
  classes: {},
  n: 5
}

export default AccomodationSelectorBlock;