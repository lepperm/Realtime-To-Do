import firebase from "firebase/app";
import "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyCwl85fkweMyQUYYJbI4lcW1ZTdblCIW7Q",
  authDomain: "realtime-to-do-225fa.firebaseapp.com",
  databaseURL: "https://realtime-to-do-225fa.firebaseio.com",
  projectId: "realtime-to-do-225fa",
  storageBucket: "realtime-to-do-225fa.appspot.com",
  messagingSenderId: "160401345542",
  appId: "1:160401345542:web:8814e1e8fe1ada73d94787",
};

if (!firebase.apps.length) {
  firebase.initializeApp(firebaseConfig);
}

const db = firebase.firestore();

export default db;
