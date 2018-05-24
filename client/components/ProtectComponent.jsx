import React from 'react';
import { Route, Redirect } from 'react-router-dom';
import PropTypes from 'prop-types';

let isUser;

export const UserProtectComponent = ({ component: Component, path }) => {
  isUser = JSON.parse(window.localStorage.getItem('user'));
  return (<Route
    path={path}
    render={({ location }) => (
      isUser && (isUser.role === 'customer' || isUser.role === 'caterer')
      ? <Component />
      : <Redirect to={{ pathname: '/login', state: { from: location } }} />
    )}
  />);
};

export const RoleProtectedComponent = ({ component: Component, path }) => {
  isUser = JSON.parse(window.localStorage.getItem('user'));
  return (<Route
    path={path}
    render={({ location }) => (
      isUser && (isUser.role === 'caterer')
      ? <Component />
      : <Redirect to={{ pathname: '/customer', state: { from: location } }} />
    )}
  />);
};

UserProtectComponent.propTypes = {
  component: PropTypes.func.isRequired,
  path: PropTypes.string.isRequired,
};

RoleProtectedComponent.propTypes = {
  component: PropTypes.func.isRequired,
  path: PropTypes.string.isRequired,
};
