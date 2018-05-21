import React from 'react';
import { Route, Redirect } from 'react-router-dom';
import PropTypes from 'prop-types';

const ProtectComponent = ({ component: Component, isAuthenticated, path }) => {
  return (<Route
    path={path}
    render={() => (
      isAuthenticated
      ? <Component />
      : <Redirect to="/login" />
    )}
  />);
};

ProtectComponent.propTypes = {
  component: PropTypes.func.isRequired,
  isAuthenticated: PropTypes.bool.isRequired,
  path: PropTypes.string.isRequired,
};

export default ProtectComponent;
