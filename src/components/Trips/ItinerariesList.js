import React, { Fragment } from 'react';
import { Textarea } from 'react-formik-ui';

const ItinerariesList = ({ days, addDay, removeDay, count }) => (
  <Fragment>
    <div className="form__title form__title--sm">Itinerary</div>
    {days.map((day) => (
      <Textarea
        key={day.id}
        name={day.name}
        label={day.label}
        className="form__textarea"
      />
    ))}
    <button className="add-btn" onClick={addDay}>
      Add another day
    </button>
    {count && (
      <button className="add-btn" onClick={removeDay}>
        Remove last day
      </button>
    )}
  </Fragment>
);

export default ItinerariesList;
