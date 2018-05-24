import React from 'react';
import { Route, Redirect } from 'react-router-dom';
import PropTypes from 'prop-types';

const isUser = JSON.parse(window.localStorage.getItem('user'));

export const UserProtectComponent = ({ component: Component, path }) => {
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
