/* global window */
/*eslint-disable quotes*/
import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import thunk from 'redux-thunk';
import { createStore, compose, applyMiddleware } from 'redux';
import { persistStore, autoRehydrate } from 'redux-persist';
import { Router, browserHistory } from 'react-router';
import firebase from 'firebase';
import reducers from './src/reducers/index';
import routes from './src/routes';
import { FIREBASE_CONFIG } from '../config';


/*
  Here we are getting the initial state injected by the server. See routes/index.js for more details
 */
const initialState = window.__INITIAL_STATE__;
const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

const store = createStore(
  reducers,
  initialState,
  composeEnhancers(
    applyMiddleware(thunk),
    autoRehydrate()
  )
);

/*
  While creating a store, we will inject the initial state we received from the server to our app.
*/

class App extends Component {
  constructor(props) {
    super(props);
    this.state = { rehydrated: false };
  }

  componentWillMount() {
    firebase.initializeApp(FIREBASE_CONFIG);

    persistStore(store, {}, () => {
      this.setState({ rehydrated: true });
    });
    persistStore(store).purge();
  }
  render() {
    if (!this.state.rehydrated) {
      return null;
    }
    return (
      <Provider store={store}>
        <Router history={browserHistory} routes={routes} />
      </Provider>
    );
  }
}

ReactDOM.render(
  <App />,
  document.getElementById('reactbody')
);
