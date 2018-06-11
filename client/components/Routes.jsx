import React from 'react';
import { Route, Switch, withRouter } from 'react-router-dom';
import Navbar from './Navbar';
import ManageMeal from './Caterer/ManageMeal';
import ManageMenu from './Caterer/ManageMenu';
import ManageCatererOrder from './Caterer/ManageOrder';
import Dashboard from './Customer/Dashboard';
import ManageCustomerOrder from './Customer/ManageOrder';
import Login from './Login';
import Signup from './Signup';
import LandingPage from './LandingPage';
import { UserProtectComponent, RoleProtectedComponent } from './Protect';

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
      <Route path="/signup" component={Signup} />
      <Route path="/login" component={Login} />
      <UserProtectComponent path="/customer/dashboard" component={Dashboard} />
      <UserProtectComponent path="/customer/order" component={ManageCustomerOrder} />
      <RoleProtectedComponent path="/caterer/meal" component={ManageMeal} />
      <RoleProtectedComponent path="/caterer/menu" component={ManageMenu} />
      <RoleProtectedComponent path="/caterer/order" component={ManageCatererOrder} />
    </Switch>
  </div>
);

export default withRouter(Routes);
