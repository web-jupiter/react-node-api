import React from "react";
import {connect} from "react-redux";
import PropTypes from 'prop-types';
import FormFields from "./FormFields.react";
import Grid from '@material-ui/core/Grid';
import SectionHeader from "./SectionHeader.react";

const GalleryComponent = (props) => {
  const {classes, fields, headerText} = props;
  const items = fields.map((field,i) => <FormFields className={classes.field} key={`${field}-${i}`} field={field}/>);
  return (
      <Grid item >
        <SectionHeader textProp={headerText} className={classes.header}/>
        <form  className={classes.form} onSubmit={e => handleSubmit(e, props)}>
          {items}
        </form>
      </Grid>
  );
}

GalleryComponent.propTypes = {
  fields: PropTypes.array,
  classes: PropTypes.object,
  headerText: PropTypes.string
}

GalleryComponent.defaultProps = {
  classes: {}
}
export default GalleryComponent;