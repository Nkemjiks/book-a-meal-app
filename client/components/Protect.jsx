import React from 'react';
import { Route, Redirect } from 'react-router-dom';
import PropTypes from 'prop-types';

let isUser;

export const UserProtected = ({ component: Component, path }) => {
  isUser = JSON.parse(window.localStorage.getItem('@#$user'));
  return (<Route
    path={path}
    render={({ location }) => (
      /* istanbul ignore next */
      isUser && (isUser.role === 'customer' || isUser.role === 'caterer')
      ? <Component />
      : <Redirect to={{ pathname: '/login', state: { from: location } }} />
    )}
  />);
};

export const RoleProtected = ({ component: Component, path }) => {
  isUser = JSON.parse(window.localStorage.getItem('@#$user'));
  return (<Route
    path={path}
    render={({ location }) => (
      /* istanbul ignore next */
      isUser && (isUser.role === 'caterer')
      ? <Component />
      : <Redirect to={{ pathname: '/customer/dashboard', state: { from: location } }} />
    )}
  />);
};

UserProtected.propTypes = {
  component: PropTypes.func.isRequired,
  path: PropTypes.string.isRequired,
};

RoleProtected.propTypes = {
  component: PropTypes.func.isRequired,
  path: PropTypes.string.isRequired,
};
