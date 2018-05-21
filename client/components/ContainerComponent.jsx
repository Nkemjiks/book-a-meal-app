import React from 'react';
import { Router, Route, Switch } from 'react-router-dom';
import { Provider } from 'react-redux';
import { createBrowserHistory } from 'history';

import store from '../store';
import RouteComponent from './RouteComponent';

const history = createBrowserHistory();

const ContainerComponent = () => {
  return (
    <Provider store={store}>
      <Router history={history}>
        <Switch>
          <Route path="/" component={RouteComponent} />
        </Switch>
      </Router>
    </Provider>
  );
};

export default ContainerComponent;
