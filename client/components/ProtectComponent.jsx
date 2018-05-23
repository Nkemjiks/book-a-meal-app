import React from 'react';
import { Route, Redirect } from 'react-router-dom';
import PropTypes from 'prop-types';

export const UserProtectComponent = ({ component: Component, isValidated, path }) => {
  return (<Route
    path={path}
    render={() => (
      isValidated
      ? <Component />
      : <Redirect to="/login" />
    )}
  />);
};

export const RoleProtectedComponent = ({ component: Component, isCaterer, path }) => {
  return (<Route
    path={path}
    render={() => (
      isCaterer
      ? <Component />
      : <Redirect to="/customer" />
    )}
  />);
};

UserProtectComponent.propTypes = {
  component: PropTypes.func.isRequired,
  isValidated: PropTypes.bool.isRequired,
  path: PropTypes.string.isRequired,
};

RoleProtectedComponent.propTypes = {
  component: PropTypes.func.isRequired,
  isCaterer: PropTypes.bool.isRequired,
  path: PropTypes.string.isRequired,
};
