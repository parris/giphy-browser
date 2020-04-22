import React from 'react';
import ReactDOM from 'react-dom';
import {
  BrowserRouter as Router,
  Switch,
  Route,
} from "react-router-dom";
import './index.css';
import { createStore } from './utils/createStore';
import { Provider } from 'react-redux';
import * as serviceWorker from './serviceWorker';
import Loadable from 'react-loadable';

// I don't like that we use the <any, any> type for Loadable.OptionsWithRender, but it's better than
// importing the props each of these components, which defeats the whole point of the async loading.
const ViewGiphyImage = Loadable({
  loader: () => import('./pages/ViewGiphyImage'),
} as Loadable.OptionsWithRender<any, any>);
const Home = Loadable({
  loader: () => import('./pages/Home'),
} as Loadable.OptionsWithRender<any, any>);

const startApp = () => {
  const store = createStore();
  ReactDOM.render(
    <React.StrictMode>
      <Provider store={store}>
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
    </React.StrictMode>,
    document.getElementById('root')
  );
};

startApp();

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
