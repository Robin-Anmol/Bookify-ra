import firebase from "firebase";

const firebaseApp = firebase.initializeApp({
  apiKey: "your api key",
  authDomain: "auth domain",
  projectId: "project id",
  storageBucket: "storage bucket",
  messagingSenderId: "messagingSenderId",
  appId: "appId",
});

const db = firebaseApp.firestore();
const Fire = firebaseApp;
export { db, Fire };
