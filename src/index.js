import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import { createStore, applyMiddleware, combineReducers} from 'redux'
import firebase from './firebase'
import thunkMiddleware from 'redux-thunk'
// import {createStore } from 'redux';
import ReactCSSTransitionGroup from 'react-addons-css-transition-group';
import './index.css';
import rosteredData from './datasample.js';
// import store from './store';
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

//INLINE STORE ACTION TYPES, ACTIONS, REDUCERS, and STORE Creation

/**
* ACTION TYPES
*/
const GET_STATS = 'get stats'
const UPDATE_STATS = 'update stats'
/**
* ACTION CREATORS
*/
export const getStats = (stats) => ({type: GET_STATS, stats})
export const updateStats = (stats) => ({type: UPDATE_STATS, stats})

export function getStatsThunk() {
 return dispatch => {
   let stats;
   firebase.database().ref(`/`).once('value', snap => {
      stats = snap.val();
   })
   .then(() => dispatch(getStats(stats)))
 }
}

//Object.assign()

/**
* LISTENERS
*/
export function watchStatUpdatedEvent(dispatch) {
 firebase.database().ref('stats').on('child_changed', (snap) => {
   console.log(snap.val());
   dispatch(updateStats(snap.val()));
 });
}


let stats;

 firebase.database().ref('stats').on('value', snap => {
    stats = snap.val();
    let stat = {stats};
    let initialState = stat.stats;
    console.log(initialState);

    function Reducer (state = initialState, action) {
     switch (action.type) {
      case GET_STATS:
        console.log(action.stats);
       return action.stats.stats
      case UPDATE_STATS:
       return action.stats.stats
      default:
       return state
      }
    }

    const store = createStore(
      Reducer,
      window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__(),
      applyMiddleware(thunkMiddleware)
    )

    ReactDOM.render(
      <Provider store={store}>
        <App />
      </Provider>,
      document.getElementById('root'));
    registerServiceWorker();

  });


// ReactDOM.render(
//   <Provider store={store}>
//     <App />
//   </Provider>,
//   document.getElementById('root'));
// registerServiceWorker();
