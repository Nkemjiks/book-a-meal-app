import React from 'react';
import { HashRouter, Route, Switch } from 'react-router-dom';
import { Provider } from 'react-redux';
import { ToastContainer } from 'react-toastify';

import 'react-toastify/dist/ReactToastify.css';

import Navbar from './Navbar';
import ManageMeal from './Caterer/ManageMeal';
import ManageMenu from './Caterer/ManageMenu';
import ManageCatererOrder from './Caterer/ManageOrder';
import AvaliableMenu from './Customer/Dashboard';
import Meals from './Customer/Dashboard/Meals';
import ManageCustomerOrder from './Customer/ManageOrder';
import Login from './Login';
import Signup from './Signup';
import LandingPage from './LandingPage';
import NotFound from './NotFound';
import { UserProtected, RoleProtected } from './Protect';

import store from '../store';

/**
 * landing page of the application
 *
 * @description React Component encapsulating application user interface
 *
 * @returns {JSX} JSX representation of component
 */
const Routes = () => (
  <Provider store={store}>
    <HashRouter>
      <div>
        <Navbar />
        <Switch>
          <Route exact path="/" component={LandingPage} />
          <Route exact path="/signup" component={Signup} />
          <Route exact path="/login" component={Login} />
          <UserProtected exact path="/customer/dashboard" component={AvaliableMenu} />
          <UserProtected exact path="/customer/dashboard/:businessName" component={Meals} />
          <UserProtected exact path="/customer/order" component={ManageCustomerOrder} />
          <RoleProtected exact path="/caterer/meal" component={ManageMeal} />
          <RoleProtected exact path="/caterer/menu" component={ManageMenu} />
          <RoleProtected exact path="/caterer/order" component={ManageCatererOrder} />
          <Route component={NotFound} />
        </Switch>
        <ToastContainer />
      </div>
    </HashRouter>
  </Provider>
);

export default Routes;
