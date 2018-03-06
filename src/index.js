import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';

import 'normalize.css';
import './styles/main.scss';

import App from './App';

import SignupUserPage from './components/Signup/SignupUserPage';
import SignupSupplierPage from './components/Signup/SignupSupplierPage';

import EditSupplierProfilePage from './components/Supplier/EditSupplierProfilePage';

import AddTripPage from './components/Trips/AddTripPage';
import AllTripsPage from './components/Trips/AllTripsPage';
import UpdateTripPage from './components/Trips/UpdateTripPage';

import Notfound from './components/NotFound';
import SigninUserPage from './components/Signin/SigninUserPage';

const routing = (
  <Router>
    <Switch>
      <Route exact path="/" component={App} />
      <Route path="/signin-user" component={SigninUserPage} />
      <Route path="/signup-user" component={SignupUserPage} />
      <Route path="/signup-supplier" component={SignupSupplierPage} />
      <Route
        path="/edit-supplier-profile"
        component={EditSupplierProfilePage}
      />
      <Route path="/add-trip" component={AddTripPage} />
      <Route path="/all-trips" component={AllTripsPage} />
      <Route path="/update-trip" component={UpdateTripPage} />
      <Route component={Notfound} />
    </Switch>
  </Router>
);

ReactDOM.render(routing, document.getElementById('root'));
