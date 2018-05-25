import React, { Component, Fragment } from 'react';
import { withRouter, Link } from 'react-router-dom';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import '../scss/navbarComponent.scss';
import logoutAction from '../action/logoutAction';
import updateUserRoleAction from '../action/updateUserRoleAction';
import apiCall from '../helpers/axios';

let isUser;

class NavbarComponent extends Component {
  componentWillReceiveProps(nextProps) {
    if (nextProps) {
      isUser = JSON.parse(window.localStorage.getItem('user'));
    }
  }

  handleLogout = () => {
    window.localStorage.removeItem('user');
    window.localStorage.removeItem('token');
    this.props.logoutAction();
    this.props.history.push('/login');
  }

  handleRoleUpdate = () => {
    const token = window.localStorage.getItem('token');

    apiCall('/auth/update', 'put', null, token)
      .then((response) => {
        window.localStorage.setItem('user', JSON.stringify(response.data.data));
        window.localStorage.setItem('token', response.data.token);
        this.props.updateUserRoleAction(response.data.data, true);
        this.props.history.push('/caterer/menu');
      })
      .catch((err) => {
        this.props.updateUserRoleAction(err.response.data.message, false);
        return toast.error(err.response.data.message, {
          hideProgressBar: true,
        });
      });
  }

  render() {
    return (
      <div id="nav">
        <Link to="/">
          <img src="image/logo.png" alt="logo" />
        </Link>
        <ToastContainer />
        {
          ((this.props.location.pathname === '/') ||
          (this.props.location.pathname === '/login') ||
          (this.props.location.pathname === '/signup')) &&
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
          (this.props.location.pathname === '/customer') &&
          <Fragment>
            <div id="dropdown">
              <img src="image/setting.png" alt="settings" id="nav-setting" />
              <div className="dropdown-content">
                <h4 id="dropdown-name">{isUser && isUser.fullName}</h4>
                {
                  isUser && isUser.role === 'customer' &&
                  <button className="logout" onClick={this.handleRoleUpdate}>Become a Caterer</button>
                }
                {
                  isUser && isUser.role === 'caterer' && <Link to="/caterer/menu">Caterer Panel</Link>
                }
                <button className="logout" onClick={this.handleLogout}>Logout</button>
              </div>
            </div>
            <h3>{isUser && isUser.fullName}</h3>
            <img src="image/avatar.png" alt="avatar" id="nav-avatar" />
          </Fragment>
        }
        {
          ((this.props.location.pathname === '/caterer/meal') ||
          (this.props.location.pathname === '/caterer/menu') ||
          (this.props.location.pathname === '/caterer/order')) &&
          <Fragment>
            <div id="dropdown">
              <img src="image/setting.png" alt="settings" id="nav-setting-caterer" />
              <div className="dropdown-content-caterer">
                <h4 id="dropdown-name-caterer">{isUser && isUser.fullName}</h4>
                <Link to="/caterer/menu" className="dropdown-option">Set Menu</Link>
                <Link to="/caterer/meal" className="dropdown-option">Manage Meals</Link>
                <Link to="/caterer/order" className="dropdown-option">Manage Orders</Link>
                <Link to="/customer" className="default">Customer Dashboard</Link>
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
  logoutAction,
  updateUserRoleAction,
};

NavbarComponent.propTypes = {
  logoutAction: PropTypes.func.isRequired,
  updateUserRoleAction: PropTypes.func.isRequired,
  location: PropTypes.shape({
    pathname: PropTypes.string.isRequired,
  }).isRequired,
  history: PropTypes.shape({
    push: PropTypes.func.isRequired,
  }).isRequired,
};

export default withRouter(connect(mapStateToProps, mapActionToProps)(NavbarComponent));
