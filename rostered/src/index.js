import React from 'react';
import ReactDOM from 'react-dom';
import ReactCSSTransitionGroup from 'react-addons-css-transition-group';
import './index.css';
import rosteredData from './datasample.js';
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

ReactDOM.render(<App stats={rosteredData} />, document.getElementById('root'));
registerServiceWorker();
