import React from 'react';
import { Route, IndexRoute, Router, browserHistory } from 'react-router';

import Header from './components/header';
import Main from './components/main';

export default (
  <Router history={browserHistory} >
    <Route path="/" component={Header}>
      <IndexRoute component={Main} />
    </Route>
  </Router>
);
