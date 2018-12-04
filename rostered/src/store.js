import { createStore, applyMiddleware, combineReducers} from 'redux'
import firebase from './firebase'
import thunkMiddleware from 'redux-thunk'
import rosteredData from './datasample'


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
 firebase.database().ref('stats').on('child_changed', (snap) => {
   console.log(snap.val());
   dispatch(updateStats(snap.val()));
 });
}


let stats;

function getData() {
  return firebase.database().ref('stats').on('value', snap => {
    stats = snap.val();
    let initialState = {stats};

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

  });
}

getData();

console.log(stats);

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
    console.log(action.stats);
   return action.stats.stats
  case UPDATE_STATS:
   return action.stats.stats
  default:
   return state
  }
}



export default createStore(
  Reducer,
  window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__(),
  applyMiddleware(thunkMiddleware)
)
