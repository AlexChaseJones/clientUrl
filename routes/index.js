import express from 'express';
import React from 'react';
import ReactDOMServer from 'react-dom/server';
import { match, RouterContext } from 'react-router';
import { compose, createStore, applyMiddleware } from 'redux';
import { autoRehydrate } from 'redux-persist';
import thunk from 'redux-thunk';
import { Provider } from 'react-redux';

import routes from '../views/src/routes';
import reducers from '../views/src/reducers/index';

const router = express.Router();


router.get('*', (req, res) => {
    // Here we are first matching if the current url exists in the react router routes
  match({ routes, location: req.originalUrl }, (error, redirectLocation, renderProps) => {
    if (error) {
      res.status(500).send(error.message);
    } else if (redirectLocation) {
      res.redirect(302, redirectLocation.pathname + redirectLocation.search);
    } else if (renderProps) {
    // Server Rendering... http://redux.js.org/docs/recipes/ServerRendering.html
      const store = createStore(
        reducers,
        { user: { loggedIn: false } },
        compose(
          applyMiddleware(thunk),
          autoRehydrate()
        )
      );

      const html = ReactDOMServer.renderToString(
        <Provider store={store}>
          <RouterContext {...renderProps} />
        </Provider>
      );

      const finalState = store.getState();
      res.status(200).send(renderFullPage(html, finalState));
    } else {
      res.status(404).send('Not found');
    }
  });
});

function renderFullPage(html, initialState) {
  return `
    <!DOCTYPE html>
    <html lang="en">
    <head>
      <!-- Required meta tags always come first -->
      <meta charset="utf-8">
      <meta name="viewport" content="width=device-width, initial-scale=1, shrink-to-fit=no">
      <meta http-equiv="x-ua-compatible" content="ie=edge">
      <title>React Router Redux Express</title>

      <!-- Bootstrap CSS -->
      <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/foundation/6.3.1/css/foundation.min.css" integrity="sha256-itWEYdFWzZPBG78bJOOiQIn06QCgN/F0wMDcC4nOhxY=" crossorigin="anonymous" />
      <link rel="stylesheet" href="../stylesheets/main.css">
    </head>
    <body>

      <div id="reactbody"><div>${html}</div></div>
      <footer>
        <div className="row">
          <div className="columns medium-12">
            <img alt="Intersection" src="../images/intersectionLogoImage.png" />
          </div>
        </div>
      </footer>
        <script>
            window.__INITIAL_STATE__ = ${JSON.stringify(initialState)}
          </script>
      <script src="../bin/app.bundle.js"></script>
      <!-- jQuery first, then Bootstrap JS. -->
      <script src="https://ajax.googleapis.com/ajax/libs/jquery/2.1.4/jquery.min.js"></script>
      <script src="https://cdnjs.cloudflare.com/ajax/libs/foundation/6.3.1/js/foundation.min.js" integrity="sha256-Nd2xznOkrE9HkrAMi4xWy/hXkQraXioBg9iYsBrcFrs=" crossorigin="anonymous"></script>
      <script src="../js/script.js"></script>
    </body>
    </html>
    `;
}

export default router;
