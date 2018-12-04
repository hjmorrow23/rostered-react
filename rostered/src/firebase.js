import firebase from 'firebase';

// Initialize Firebase
  var config = {
    apiKey: "AIzaSyA-DtI-pj3NUd_Zwb8mj8L3cQom6zO8vKk",
    authDomain: "rostered-26b64.firebaseapp.com",
    databaseURL: "https://rostered-26b64.firebaseio.com",
    projectId: "rostered-26b64",
    storageBucket: "",
    messagingSenderId: "911681674419"
  };
  firebase.initializeApp(config);


  export const provider = new firebase.auth.GoogleAuthProvider();
  export const auth = firebase.auth();
  export const database = firebase.database();
  export const updateFirebase = (stats) => {
    database.ref('stats').set(stats);
  };

  export default firebase;
