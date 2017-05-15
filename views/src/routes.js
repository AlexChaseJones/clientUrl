import React from 'react';
import { Route, IndexRoute, Router, browserHistory } from 'react-router';

import Header from './components/header';
import GenerateUrl from './containers/GenerateUrl';
import LoginForm from './containers/LoginForm.js';
import EnsureLoggedInContainer from './containers/EnsureLoggedInContainer';

export default (
  <Router history={browserHistory} >
    <Route path="/" component={Header}>
      <IndexRoute component={LoginForm} />
      <Route path='login' component={LoginForm} />

      <Route component={EnsureLoggedInContainer} >
        <Route path='generateUrl' component={GenerateUrl} />
      </Route>
    </Route>
  </Router>
);
