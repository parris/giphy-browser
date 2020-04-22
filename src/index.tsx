import React from 'react';
import ReactDOM from 'react-dom';
import {
  BrowserRouter as Router,
  Switch,
  Route,
} from "react-router-dom";
import { Provider } from 'react-redux';
import * as serviceWorker from './serviceWorker';
import Loadable from 'react-loadable';
import { Helmet } from 'react-helmet';
import { ThemeProvider, CssBaseline } from '@material-ui/core';

import './index.css';
import { createStore } from './utils/createStore';
import Loading from './features/Loading';
import theme from './theme';

// Typescript really doesn't like the code below, skipping for now
// @ts-ignore
const ViewGiphyImage = Loadable({
  loader: () => import('./pages/ViewGiphyImage'),
  loading: Loading,
} as Loadable.OptionsWithRender<any, any>);
// @ts-ignore
const Home = Loadable({
  loader: () => import('./pages/Home'),
  loading: Loading,
} as Loadable.OptionsWithRender<any, any>);

const startApp = () => {
  const store = createStore();
  ReactDOM.render(
    <React.StrictMode>
      <ThemeProvider theme={theme}>
        <CssBaseline />
        <Provider store={store}>
          <Helmet>
            <link rel="stylesheet" href="https://fonts.googleapis.com/css?family=Roboto:300,400,500,700&display=swap" />
          </Helmet>
          <Router>
            <Switch>
              <Route path="/about">
              </Route>
              <Route path="/view/:id">
                <ViewGiphyImage />
              </Route>
              <Route path="/">
                <Home />
              </Route>
            </Switch>
          </Router>
        </Provider>
      </ThemeProvider>
    </React.StrictMode>,
    document.getElementById('root')
  );
};

startApp();

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
