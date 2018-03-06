
import React from "react";
import {connect} from "react-redux";
import PropTypes from 'prop-types';
import FormFields from "./FormFields.react";
import Grid from '@material-ui/core/Grid';
import SectionHeader from "./SectionHeader.react";
import { Link } from "@material-ui/core";
import AccomodationSelectorBlock from "./AccomodationSelectorBlock.react";
import Typography from '@material-ui/core/Typography';

export const AccomodationComponent = (props) => {
  const {classes, fields, headerText} = props;
  const items = fields.map((field,i) => <FormFields className={classes.field} key={`${field}-${i}`} field={field}/>);
  return (
      <Grid item >
        <SectionHeader textProp={headerText} className={classes.header}/>
        <AccomodationSelectorBlock n={1}/>
         <p> If end of the day is not last day, add additional lines as needed.</p>
        <Link>Add another day</Link>
      </Grid>
  );
}

AccomodationComponent.propTypes = {
  fields: PropTypes.array,
  classes: PropTypes.object,
  headerText: PropTypes.string
}

AccomodationComponent.defaultProps = {
  classes: {}
}

export default AccomodationComponent;