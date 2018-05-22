import React from 'react';
import { Route, Switch } from 'react-router-dom';
import NavbarComponent from './NavbarComponent';
import CatererManageMealComponent from './CatererManageMealComponent';
import CatererManageMenuComponent from './CatererManageMenuComponent';
import CatererManageOrderComponent from './CatererManageOrderComponent';
import CustomerDashboardComponent from './CustomerDashboardComponent';
import LoginComponent from './LoginComponent';
import SignupComponent from './SignupComponent';
import LandingPageComponent from './LandingPageComponent';
import ProtectComponent from './ProtectComponent';

class RouteComponent extends React.Component {
  state = {
    isAuthenticated: true,
  };
  render() {
    const { isAuthenticated } = this.state;
    return (
      <div>
        <NavbarComponent />
        <Switch>
          <Route exact path="/" component={LandingPageComponent} />
          <Route path="/signup" component={SignupComponent} />
          <Route path="/login" component={LoginComponent} />
          <ProtectComponent path="/customer" isAuthenticated={isAuthenticated} component={CustomerDashboardComponent} />
          <ProtectComponent path="/caterer/meal" isAuthenticated={isAuthenticated} component={CatererManageMealComponent} />
          <ProtectComponent path="/caterer/menu" isAuthenticated={isAuthenticated} component={CatererManageMenuComponent} />
          <ProtectComponent path="/caterer/order" isAuthenticated={isAuthenticated} component={CatererManageOrderComponent} />
        </Switch>
      </div>
    );
  }
}

export default RouteComponent;
