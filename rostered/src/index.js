import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
// import {createStore } from 'redux';
import ReactCSSTransitionGroup from 'react-addons-css-transition-group';
import './index.css';
import rosteredData from './datasample.js';
import store from './store';
// import apiTest from './api.js';
import App from './App';
import registerServiceWorker from './registerServiceWorker';
import {
  BrowserRouter,
  Route,
  Redirect,
  Switch,
  withRouter
} from 'react-router-dom';

ReactDOM.render(
  <Provider store={store}>
    <App stats={rosteredData} />
  </Provider>,
  document.getElementById('root'));
registerServiceWorker();
