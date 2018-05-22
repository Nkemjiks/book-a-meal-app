import React, { Component } from 'react';
import { withRouter} from 'react-router-dom';
import '../scss/navbarComponent.scss';

class NavbarComponent extends Component {
  state = {
    isAuthenticated: true,
  };
  render() {
    if (
      (this.props.location.pathname === '/') ||
      (this.props.location.pathname === '/login') ||
      (this.props.location.pathname === '/signup')
    ) {
      return (
        <div id="nav">
          <a href="/">
            <img src="image/logo.png" alt="logo" />
          </a>
          <a href="/login">
            <button className="signin tablet">LOGIN</button>
          </a>
          <a href="/signup">
            <button className="signup tablet">SIGN UP</button>
          </a>
        </div>
      );
    } else if (this.props.location.pathname === '/customer') {
      return (
        <div id="nav" className="dashboard">
          <a href="/">
            <img src="image/logo.png" alt="logo" />
          </a>
          <div id="dropdown">
            <img src="../../image/setting.png" alt="settings" id="nav-setting" />
            <div className="dropdown-content">
              <h4 id="dropdown-name">Mbonu Blessing</h4>
              <a href="/caterer/menu">Caterer's panel</a>
              <a href="/login">Sign out</a>
            </div>
          </div>
          <h3>Mbonu Blessing</h3>
          <img src="../../image/avatar.png" alt="avatar" id="nav-avatar" />
        </div>
      );
    } else if (
      (this.props.location.pathname === '/caterer/meal') ||
      (this.props.location.pathname === '/caterer/menu') ||
      (this.props.location.pathname === '/caterer/order')
    ) {
      return (
        <div id="nav">
          <a href="/">
            <img src="image/logo.png" alt="logo" />
          </a>
          <div id="dropdown">
            <img src="../../image/setting.png" alt="settings" id="nav-setting-caterer" />
            <div className="dropdown-content-caterer">
              <h4 id="dropdown-name-caterer">Mbonu Blessing</h4>
              <a href="/caterer/menu" className="dropdown-option">Set Menu</a>
              <a href="/caterer/meal" className="dropdown-option">Manage Meals</a>
              <a href="/caterer/order" className="dropdown-option">Manage Orders</a>
              <a href="/customer" className="default">Customer Dashboard</a>
              <a href="/login" className="default">Sign out</a>
            </div>
          </div>
          <a href="/caterer/order">
            <button className="manage-button">Manage Orders</button>
          </a>
          <a href="/caterer/menu">
            <button className="manage-button">Set Menu</button>
          </a>
          <a href="/caterer/meal">
            <button className="manage-button">Manage Meals</button>
          </a>
        </div>
      );
    }
  }
}

export default withRouter(NavbarComponent);
