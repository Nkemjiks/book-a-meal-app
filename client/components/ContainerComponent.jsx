import React from 'react';
import { createBrowserHistory } from 'history';
import { Router, Route, Switch } from 'react-router-dom';
import { Provider } from 'react-redux';

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
