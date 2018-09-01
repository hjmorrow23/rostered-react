import { createStore, applyMiddleware } from 'redux'
import firebase from './firebase'
import thunkMiddleware from 'redux-thunk'


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
/**
* THUNKS
*/
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
 firebase.database().ref('/').on('child_changed', (snap) => {    dispatch(updateStats(snap.val()));
 });
}

let initialState = {
    leagues: [
      {
        name: "Initial",
        teams: []
      }
    ]
}

/**
* REDUCER
*/
function Reducer (state = initialState, action) {
 switch (action.type) {
  case GET_STATS:
   return action.stats.stats
  case UPDATE_STATS:
   return action.stats.stats
  default:
   return state
  }
}
export default createStore(Reducer, applyMiddleware(thunkMiddleware))
