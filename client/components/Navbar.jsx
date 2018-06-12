import React, { Component, Fragment } from 'react';
import { withRouter, Link } from 'react-router-dom';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

import '../scss/navbarComponent.scss';

import updateUserRoleAction from '../action/updateUserRoleAction';
import getUserDetailsAction from '../action/getUserDetailsAction';

/**
 * navigate through the application
 *
 * @class Navbar
 *
 * @extends {Component}
 */
class Navbar extends Component {
  /**
   * lifecycle methods called when there is an update to the store
   *
   * @memberof Navbar
   *
   * @returns {object} updates component state
   */
  static getDerivedStateFromProps(props, state) {
    if (props.user !== state.user) {
      return {
        user: props.user,
      };
    }
    return null;
  }

  state = {
    user: {},
  }

  /**
   * lifecycle methods called immediately after a component is mounted
   *
   * @memberof Navbar
   *
   * @returns {object} updates the user information in the redux store
   */
  componentDidMount() {
    const user = JSON.parse(window.localStorage.getItem('@#$user'));
    this.props.getUserDetailsAction(user);
  }

  /**
   * user logout handler
   *
   * @memberof Navbar
   *
   * @returns {undefined} remove user information from local storage and redirect user to login page
   */
  handleLogout = () => {
    window.localStorage.removeItem('@#$user');
    window.localStorage.removeItem('@#$token');
    this.props.history.push('/login');
  }

  /**
   * update user role handler
   *
   * @memberof Navbar
   *
   * @returns {undefined} makes an API call to update user role to caterer
   */
  handleRoleUpdate = () => {
    this.props.updateUserRoleAction(this.props.history);
  }

  /**
   * renders component to DOM
   *
   * @memberof Navbar
   *
   * @returns {JSX} JSX representation of component
   */
  render() {
    return (
      <div id="nav">
        <Link to="/">
          <img src="image/logo.png" alt="logo" />
        </Link>
        {
          ((this.props.location.pathname === '/') ||
          (this.props.location.pathname === '/login') ||
          (this.props.location.pathname === '/signup')) && (this.state.user === null) &&
          <Fragment>
            <Link to="/login">
              <button className="signin tablet">LOGIN</button>
            </Link>
            <Link to="/signup">
              <button className="signup tablet">SIGN UP</button>
            </Link>
          </Fragment>
        }
        {
          ((this.props.location.pathname === '/customer/dashboard') ||
          (this.props.location.pathname === '/customer/order')) && (this.state.user !== null) &&
          <Fragment>
            <div id="dropdown">
              <i className="fas fa-cog" id="nav-setting" />
              <div className="dropdown-content">
                <h4 id="dropdown-name">{this.state.user.fullName}</h4>
                <Link to="/customer/dashboard">Dashboard</Link>
                <Link to="/customer/order">Order History</Link>
                {
                  this.state.user.role === 'customer' &&
                  <button className="logout" onClick={this.handleRoleUpdate}>Become a Caterer</button>
                }
                {
                  this.state.user.role === 'caterer' && <Link to="/caterer/menu">Caterer Panel</Link>
                }
                <button className="logout" onClick={this.handleLogout}>Logout</button>
              </div>
            </div>
            <h3>{this.state.user.fullName}</h3>
            <i className="fas fa-user" id="nav-avatar" />
          </Fragment>
        }
        {
          ((this.props.location.pathname === '/caterer/meal') ||
          (this.props.location.pathname === '/caterer/menu') ||
          (this.props.location.pathname === '/caterer/order')) && (this.state.user !== null) &&
          <Fragment>
            <div id="dropdown">
              <i className="fas fa-cog" id="nav-setting-caterer" />
              <div className="dropdown-content-caterer">
                <h4 id="dropdown-name-caterer">{this.state.user.fullName}</h4>
                <Link to="/caterer/menu" className="dropdown-option">Set Menu</Link>
                <Link to="/caterer/meal" className="dropdown-option">Manage Meals</Link>
                <Link to="/caterer/order" className="dropdown-option">Manage Orders</Link>
                <Link to="/customer/dashboard" className="default">Customer Dashboard</Link>
                <button className="default logout" onClick={this.handleLogout}>Logout</button>
              </div>
            </div>
            <Link to="/caterer/order">
              <button className="manage-button">Manage Orders</button>
            </Link>
            <Link to="/caterer/menu">
              <button className="manage-button">Set Menu</button>
            </Link>
            <Link to="/caterer/meal">
              <button className="manage-button">Manage Meals</button>
            </Link>
          </Fragment>
        }
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

const mapActionToProps = {
  updateUserRoleAction,
  getUserDetailsAction,
};

Navbar.propTypes = {
  updateUserRoleAction: PropTypes.func.isRequired,
  getUserDetailsAction: PropTypes.func.isRequired,
  location: PropTypes.shape({
    pathname: PropTypes.string.isRequired,
  }).isRequired,
  history: PropTypes.shape({
    push: PropTypes.func.isRequired,
  }).isRequired,
};

export default withRouter(connect(mapStateToProps, mapActionToProps)(Navbar));
