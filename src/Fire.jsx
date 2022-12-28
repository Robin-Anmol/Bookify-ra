import firebase from "firebase";

const firebaseApp = firebase.initializeApp({
  apiKey: "AIzaSyCFFyjjnhabx1fMVmHGgzXdypLAi8tkC1w",
  authDomain: "bookify-89b5d.firebaseapp.com",
  projectId: "bookify-89b5d",
  storageBucket: "bookify-89b5d.appspot.com",
  messagingSenderId: "510254075581",
  appId: "1:510254075581:web:963eb59da350269c45f1d4",
});

const db = firebaseApp.firestore();
const Fire = firebaseApp;
export { db, Fire };
