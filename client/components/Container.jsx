import React from 'react';
import { createBrowserHistory } from 'history';
import { Router, Route, Switch } from 'react-router-dom';
import { Provider } from 'react-redux';

import store from '../store';
import Routes from './Routes';

const history = createBrowserHistory();

/**
 * landing page of the application
 *
 * @description React Component encapsulating application user interface
 *
 * @returns {JSX} JSX representation of component
 */
const Container = () => (
  <Provider store={store}>
    <Router history={history}>
      <Switch>
        <Route path="/" component={Routes} />
      </Switch>
    </Router>
  </Provider>
);

export default Container;
