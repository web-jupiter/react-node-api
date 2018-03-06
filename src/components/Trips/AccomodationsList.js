import React, { Fragment } from 'react';
import { Select, Textarea } from 'react-formik-ui';

const AccomodationsList = ({ accomodations, addDay, removeDay, count }) => {
  return (
    <Fragment>
      <div className="form__title form__title--sm">Accomodation</div>
      <div
        className="form__container"
        style={{ justifyContent: 'left', alignItems: 'center' }}
      >
        <label htmlFor="accomodationDays" style={{ marginRight: '1em' }}>
          Day 1
        </label>
        <Select
          name="accomodationDays"
          placeholder="Select an Option"
          options={[
            { value: '1', label: '1' },
            { value: '2', label: '2' },
            { value: '3', label: '3' },
            { value: '4', label: '4' },
            { value: '5', label: '5' },
            { value: '6', label: '6' },
            { value: '7', label: '7' }
          ]}
          className="form__select"
          style={{ marginRight: '1em' }}
        />

        <Textarea name="accomodationDaysDesc" className="form__textarea" />
      </div>
      {accomodations.map((item) => (
        <div
          key={item.id}
          className="form__container"
          style={{ justifyContent: 'left', alignItems: 'center' }}
        >
          <label
            className="form__label"
            htmlFor={item.dayStart}
            style={{ marginRight: '1em' }}
          >
            <span style={{ marginRight: '1em' }}>Day</span>
            <Select
              name={item.dayStart}
              placeholder="Select an Option"
              options={[
                { value: '1', label: '1' },
                { value: '2', label: '2' },
                { value: '3', label: '3' },
                { value: '4', label: '4' },
                { value: '5', label: '5' },
                { value: '6', label: '6' },
                { value: '7', label: '7' }
              ]}
              className="form__select"
              style={{ marginRight: '1em' }}
            />
          </label>
          <label
            className="form__label"
            htmlFor={item.numberOfDays}
            style={{ marginRight: '1em' }}
          >
            <span style={{ marginRight: '1em' }}>for</span>
            <Select
              name={item.numberOfDays}
              placeholder="Select an Option"
              options={[
                { value: '1', label: '1' },
                { value: '2', label: '2' },
                { value: '3', label: '3' },
                { value: '4', label: '4' },
                { value: '5', label: '5' },
                { value: '6', label: '6' },
                { value: '7', label: '7' }
              ]}
              className="form__select"
              style={{ marginRight: '1em' }}
            />
            <span style={{ marginRight: '1em' }}>nights</span>
          </label>
          <Textarea name={item.description} className="form__textarea" />
        </div>
      ))}
      <p style={{ color: '#808080' }}>
        If end of day is not the last day, add additional lines as needed.
      </p>
      <button className="add-btn" onClick={addDay}>
        Add new line
      </button>
      {count && (
        <button className="add-btn" onClick={removeDay}>
          Remove last line
        </button>
      )}
    </Fragment>
  );
};

export default AccomodationsList;
