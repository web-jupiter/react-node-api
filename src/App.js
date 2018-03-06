import React from 'react';

import TripSidebar from './components/Trips/TripSidebar';
import SignupSidebar from './components/Signup/SignupSidebar';



class App extends React.Component {
  render() {
    const locationState = this.props.history.location.state;
    const isLoggedIn =
      locationState &&
      (locationState.isSignUpSupplierDetailsFormComplete ||
        locationState.isLoggedIn);
    const userId = locationState && locationState.userId;
    const token = locationState && locationState.token;

    if (isLoggedIn) {
      return (
        <TripSidebar
          {...this.props}
          userId={userId}
          token={token}
          isLoggedIn={isLoggedIn}
        />
      );
    } else {
      if (this.props.reasonForRedirection) {
        return (
          <React.Fragment>
            <div> {this.props.reasonForRedirection} </div>
            <SignupSidebar />
          </React.Fragment>
        );
      }
      return <SignupSidebar />;
    }
  }
}
export default App;
