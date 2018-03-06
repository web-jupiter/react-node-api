import React, {useState} from "react";
import PropTypes from 'prop-types';
import {connect} from "react-redux";
import {STATE_SIDEBAR} from "../../../config/constants";

import GalleryComponent from "./GalleryComponent.react";
import InfoComponent from "./InfoComponent.react";
import ItineraryComponent from "./ItineraryComponent.react";
import AccomodationComponent from "./AccomodationComponent.react";
import ErrorBoundary from "../Error/ErrorBoundry.react";

const DEFAULT_RENDER_TYPE = "InfoComponent";
const renderAs = {
  InfoComponent,
  ItineraryComponent,
  AccomodationComponent,
  GalleryComponent
}

const TripEntryPage = (props) => {
  const {formState, fields} = props;
  const pageSelected = STATE_SIDEBAR[formState];
  return(
    <React.Fragment>
      {
        Object.keys(fields).map((field) => {
          let renderType = field || DEFAULT_RENDER_TYPE;
          let $component = renderAs[renderType];
          let headerText = fields[field]["header"];
          let fieldArr = fields[field]["fields"];
          return (
            <React.Fragment key={field}>
              <$component  headerText={headerText} fields={fieldArr} />
            </React.Fragment>
          )
          
        })
      }
    </React.Fragment>
  );
}


TripEntryPage.propTypes = {
  isLoggedIn: PropTypes.bool,
  savedTrips: PropTypes.array,
  editingTrip: PropTypes.bool,
  formState: PropTypes.number,
  fields: PropTypes.object
}

const mapStateToProps = (state) => {
  const {user, trips} = state;
  return {
    isLoggedIn: user.isLoggedIn,
    savedTrips: user.savedTrips,
    formState: user.formState,
    fields: user.fields
  }
}

export default connect(mapStateToProps)(TripEntryPage);