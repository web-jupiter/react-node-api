import React from 'react';

import TripSidebar from './TripSidebar';

import logo from '../../images/logoBlack.png';

import TripComponent from './TripComponent';

import { confirmAlert } from 'react-confirm-alert'; // Import

import 'react-confirm-alert/src/react-confirm-alert.css'; // Import css

import { TripApi } from "../../client/api";


class AllTripsPage extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      error: null,
      isLoaded: false,
      trips: [],
      activeTrip: null
    };

  }

  handleChange(e, id) {    
    const isChecked = e.target.checked;
    if (!isChecked) {
      this.setState({ activeTrip: null });
    } else {
      this.setState({ activeTrip: id });
    }
    TripApi.handleChange(e, id, this.props.history.location.state);
  }


  hamburgerClick = () => {
    document.querySelector('.hamburger--spring').classList.toggle('is-active');
    document.querySelector('.trip__sidebar').classList.toggle('is-visible');
  };

  componentDidMount() {
    const locationState = this.props.history.location.state;

    TripApi.getAllTripsData(locationState).then(response => {
      this.setState({
        isLoaded: true,
        trips: response.result
      });
    }).catch((error) => {
      this.setState({
        isLoaded: true,
        error
      });
    });

  }

  triggerDelete(trip, token) {
    confirmAlert({
      customUI: ({ onClose }) => {
        return (
          <div className='custom-ui'>
            <h1>Are you sure?</h1>
            <p>You want to delete this trip?</p>
            <button onClick={onClose}>No</button>
            <button
              trip={this.props.trip}
              token={this.props.token}
              onClick={() => {
                this.handleClickDelete(trip);//tripId, this.props.history.location.state.token
                // onClose();
              }}
            >
              Yes, Delete it!
              </button>
          </div>
        );
      }
    });
  };

  triggerReplicate(trip, token) {
    const locationState = this.props.history.location.state;
    TripApi.repTripData(locationState, trip).then(response => {
      // this.setState({
      //   isLoaded: true,
      //   trips: response.result
      // });
    }).catch((error) => {
      this.setState({
        isLoaded: true,
        error
      });
    });
  };




  handleClickDelete(trip) {//tripId, token
    const locationState= this.props.history.location.state;
    console.log(locationState);
    TripApi.delTripData(locationState, trip).then(response => {
      // this.setState({
      //   isLoaded: true,
      //   trips: response.result
      // });
    }).catch((error) => {
      this.setState({
        isLoaded: true,
        error
      });
    });
  }



  render() {
    const { isLoggedIn, token, userId } = this.props.history.location.state;
    const { error, isLoaded, trips, activeTrip } = this.state;
    if (error) {
      return <div>Error: {error.message}</div>;
    } else if (!isLoaded) {
      return <div>Loading...</div>;
    } else {
      return (
        <div className="trip__page">
          <div className="logo">
            <img src={logo} alt="" className="logo__img" />
          </div>
          <button
            onClick={this.hamburgerClick}
            className="hamburger hamburger--spring"
            type="button"
          >
            <span className="hamburger-box">
              <span className="hamburger-inner"></span>
            </span>
          </button>
          <TripSidebar isLoggedIn={isLoggedIn} token={token} userId={userId} />
          <div className="trip__block">
            <h3 className="trip__list-title">Select a trip to edit:</h3>
            <ul className="trip__list">
              {trips.map((trip, key) => (
                <li key={trip.id} className={`trip__list-item ${activeTrip === trip.id ? 'active-trip': '' }`} >
                  <TripComponent
                    activeTrip={activeTrip}
                    handleChange={(e, id) => this.handleChange(e, id)}
                    key={key}
                    trip={trip}
                    isLoaded={isLoaded}
                    token={token}
                    userId={userId}
                    isLoggedIn={isLoggedIn}
                    triggerReplicate={(trip, token) => this.triggerReplicate(trip, token)}
                    triggerDelete={(trip, token) => this.triggerDelete(trip, token)} />
                </li>
              ))}
            </ul>
          </div>
        </div >
      );
    }
  }
}

export default AllTripsPage;
