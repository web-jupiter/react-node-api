import React from 'react'
import { AddTourForm } from './add-tour-form'

class AddTourPage extends React.Component {
  submit = values => {
    // values.firstName and so on...
    console.log(values);
  }
  render() {
    const { isLoggedIn } = false;
    return (
      <React.Fragment>
      { !isLoggedIn && <AddTourForm /> }
      </React.Fragment>
    );
  }
}

export default AddTourPage;