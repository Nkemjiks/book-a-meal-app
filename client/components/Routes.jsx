import React from 'react';
import { Route, Switch, withRouter, Redirect } from 'react-router-dom';
import { ToastContainer } from 'react-toastify';

import 'react-toastify/dist/ReactToastify.css';

import Navbar from './Navbar';
import ManageMeal from './Caterer/ManageMeal';
import ManageMenu from './Caterer/ManageMenu';
import ManageCatererOrder from './Caterer/ManageOrder';
import Dashboard from './Customer/Dashboard';
import ManageCustomerOrder from './Customer/ManageOrder';
import Login from './Login';
import Signup from './Signup';
import LandingPage from './LandingPage';
import { UserProtected, RoleProtected } from './Protect';

/**
 * route for each component
 *
 * @param {none}
 *
 * @returns {JSX} JSX representation of component
 */
const Routes = () => (
  <div>
    <Navbar />
    <Switch>
      <Route exact path="/" component={LandingPage} />
      <Route exact path="/signup" component={Signup} />
      <Route exact path="/login" component={Login} />
      <UserProtected exact path="/customer/dashboard" component={Dashboard} />
      <UserProtected exact path="/customer/order" component={ManageCustomerOrder} />
      <RoleProtected exact path="/caterer/meal" component={ManageMeal} />
      <RoleProtected exact path="/caterer/menu" component={ManageMenu} />
      <RoleProtected exact path="/caterer/order" component={ManageCatererOrder} />
      <Redirect to="/customer/dashboard" />
    </Switch>
    <ToastContainer />
  </div>
);

export default withRouter(Routes);
