import React from 'react';
import { Route, Switch, withRouter } from 'react-router-dom';
import NavbarComponent from './NavbarComponent';
import CatererManageMealComponent from './CatererManageMealComponent';
import CatererManageMenuComponent from './CatererManageMenuComponent';
import CatererManageOrderComponent from './CatererManageOrderComponent';
import CustomerDashboardComponent from './CustomerDashboardComponent';
import LoginComponent from './LoginComponent';
import SignupComponent from './SignupComponent';
import LandingPageComponent from './LandingPageComponent';
import { UserProtectComponent, RoleProtectedComponent } from './ProtectComponent';

const RouteComponent = () => {
  return (
    <div>
      <NavbarComponent />
      <Switch>
        <Route exact path="/" component={LandingPageComponent} />
        <Route path="/signup" component={SignupComponent} />
        <Route path="/login" component={LoginComponent} />
        <UserProtectComponent path="/customer" component={CustomerDashboardComponent} />
        <RoleProtectedComponent path="/caterer/meal" component={CatererManageMealComponent} />
        <RoleProtectedComponent path="/caterer/menu" component={CatererManageMenuComponent} />
        <RoleProtectedComponent path="/caterer/order" component={CatererManageOrderComponent} />
      </Switch>
    </div>
  );
};

export default withRouter(RouteComponent);
