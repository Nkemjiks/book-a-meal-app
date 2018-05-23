import React from 'react';
import { Route, Switch } from 'react-router-dom';
import { connect } from 'react-redux';
import NavbarComponent from './NavbarComponent';
import CatererManageMealComponent from './CatererManageMealComponent';
import CatererManageMenuComponent from './CatererManageMenuComponent';
import CatererManageOrderComponent from './CatererManageOrderComponent';
import CustomerDashboardComponent from './CustomerDashboardComponent';
import LoginComponent from './LoginComponent';
import SignupComponent from './SignupComponent';
import LandingPageComponent from './LandingPageComponent';
import { UserProtectComponent, RoleProtectedComponent } from './ProtectComponent';

class RouteComponent extends React.Component { 
  state = {
    isValidated: false,
    isCaterer: false,
  };
  componentWillReceiveProps(nextProps) {
    if (nextProps.user.role === 'customer') {
      this.setState({
        isValidated: true,
        isCaterer: false,
      });
    } else if (nextProps.user.role === 'caterer') {
      this.setState({
        isCaterer: true,
      });
    }
  }
  render() {
    const { isValidated, isCaterer } = this.state;
    return (
      <div>
        <NavbarComponent />
        <Switch>
          <Route exact path="/" component={LandingPageComponent} />
          <Route path="/signup" component={SignupComponent} />
          <Route path="/login" component={LoginComponent} />
          <UserProtectComponent path="/customer" isValidated={isValidated} component={CustomerDashboardComponent} />
          <RoleProtectedComponent path="/caterer/meal" isCaterer={isCaterer} component={CatererManageMealComponent} />
          <RoleProtectedComponent path="/caterer/menu" isCaterer={isCaterer} component={CatererManageMenuComponent} />
          <RoleProtectedComponent path="/caterer/order" isCaterer={isCaterer} component={CatererManageOrderComponent} />
        </Switch>
      </div>
    );
  }
}
const mapStateToProps = ({ userInformation }) => {
  const { user, error } = userInformation;
  return {
    user,
    error,
  };
};
export default connect(mapStateToProps)(RouteComponent);
