import React, { Component } from 'react';
import App from './App';
import renderer from 'react-test-renderer';
import rosteredData from './datasample.js';
import ReactDOM from 'react-dom';
import unirest from 'unirest';
// import firebase, { auth, provider } from './firebase.js';
import ReactCSSTransitionGroup from 'react-addons-css-transition-group';
// import logo from './logo.svg';
// import Login from './components/login/login.js';
// import Search from  './components/search.js';
// import Header from  './components/header.js';
// import Container from './components/container.js';
// import Dashboard from './components/dashboard/dashboard.js';
// import LeagueDashboard from './components/league/dashboard.js';
// import LeagueProfile from './components/league/profile.js';
// import TeamDashboard from './components/team/dashboard.js';
// import PlayerDashboard from './components/player/dashboard.js';
// import LoginForm from './components/login/loginform.js';
// import SignupForm from './components/login/signupform.js';
// import ResetPasswordEmail from './components/login/resetpasswordemail.js';
// import ResetPasswordConfirm from './components/login/resetpasswordconfirm.js';
// import UserProfile from './components/user/profile.js';
// import CalendarContainer from './components/calendar/calendar.js';
// import {
//   BrowserRouter,
//   Route,
//   Redirect,
//   Switch,
//   withRouter
// } from 'react-router-dom';

import $ from 'jquery';
import './stylesheets/App.css';

it('renders without crashing', () => {
  const div = document.createElement('div');
  ReactDOM.render(<App stats={rosteredData} />, div);
  ReactDOM.unmountComponentAtNode(div);
});

it('data is object', () => {
  expect(rosteredData).to.be.a('object');
});
