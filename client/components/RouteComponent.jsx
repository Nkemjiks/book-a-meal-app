import React from 'react';
import { Route, Switch } from 'react-router-dom';
import NavbarComponent from './NavbarComponent';
import CatererDashboardComponent from './CatererDashboardComponent';
import CustomerDashboardComponent from './CustomerDashboardComponent';
import LoginComponent from './LoginComponent';
import SignupComponent from './SignupComponent';
import LandingPageComponent from './LandingPageComponent';
import ProtectComponent from './ProtectComponent';

class RouteComponent extends React.Component {
  state = {
    isAuthenticated: false,
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
          <ProtectComponent path="/caterer" isAuthenticated={isAuthenticated} component={CatererDashboardComponent} />
        </Switch>
      </div>
    );
  }
}

export default RouteComponent;
