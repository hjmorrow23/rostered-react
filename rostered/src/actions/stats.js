// import * as StatActionTypes from '../actiontypes/stats';
// import firebase, { auth, provider } from '../firebase.js';
//
// const dataBase = firebase.database().ref('data');
//
// export const fetchStats = () => async dispatch => {
//   dataBase.on("value", snapshot => {
//     dispatch({
//       type: StatActionTypes.FETCH_STATS,
//       payload: snapshot.val()
//     });
//   });
// }
//
// export const updateStats = stats => async dispatch => {
//   firebase.database().ref().set({stats});
// };
