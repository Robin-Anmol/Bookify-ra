import React, { useState, useEffect, useContext } from "react";
import "./styles.css";
import { db, Fire } from "./Fire";
import firebase from "firebase";
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link,
  NavLink,
  Redirect,
} from "react-router-dom";
import Login from "./components/Login/Login";
import Body from "./components/Body/Body";
import ScrollToTop from "./components/Scrolltotop";
import ContextAppProvider from "./ContextAPI";
import Loadingel from "./components/Loadingelement/Loadingel";

function App() {
  const [update, setUpdate] = useState(0);
  const [user, setUser] = useState("");
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [emailError, setEmailError] = useState("");
  const [passwordError, setPasswordError] = useState("");
  const [hasAccount, setHasAccount] = useState(false);
  const [lname, setlName] = useState("");
  const [userinfo, setUserinfo] = useState([]);
  const [users, setUsers] = useState([]);
  const [cover, setCover] = useState("https://i.imgur.com/0mIK5qf.png");
  const [forgotpassword, setForgotpassword] = useState(false);
  const [msgids, setMsgIds] = useState([""]);
  const [loading, setLoading] = useState(false);
  const [scrollto, setScrollto] = useState("");

  // console.log(user);
  const clearInputs = () => {
    setEmail("");
    setPassword("");
  };
  const clearErrors = () => {
    setEmailError("");
    setPasswordError("");
  };
  const handleLogin = () => {
    clearErrors();
    firebase
      .auth()
      .signInWithEmailAndPassword(email, password)
      .then(() => {
        setLoading(true);
      })
      .catch((err) => {
        switch (err.code) {
          case "auth/invalid-email":
            setEmailError(err.message);
            break;
          case "auth/user/disabled":
          case "auth/user-not-found":
            setEmailError("Email does not exist");
            break;
          case "auth/wrong-password":
            setPasswordError("Incorrect Password");
            break;
          default:
        }
        setTimeout(() => {
          setPasswordError("");
          setEmailError("");
        }, 3000);
      });
  };
  const handleSignup = () => {
    // console.log("signup");
    clearErrors();
    if (name !== "" && email !== "" && password !== "") {
      firebase
        .auth()
        .createUserWithEmailAndPassword(email, password)
        .then((result) => {
          const userinfo = {
            name,
            cover,
            age: "",
            phone: "",
            city: "",
            country: "",
            email,
            uid: firebase.auth().currentUser.uid,
            description: "",
            aboutcover: "https://i.imgur.com/EPGteyo.jpg",
          };
          {
            result?.user?.uid &&
              db
                .collection("allusers")
                .doc("allusers")
                .update({
                  users: firebase.firestore.FieldValue.arrayUnion(userinfo),
                });
          }
        })
        .catch((err) => {
          switch (err.code) {
            case "auth/email-already-in-use":
              setEmailError(err.message);

              break;
            case "auth/invalid-email":
              setEmailError(err.message);
              break;
            case "auth/weak-password":
              setPasswordError(err.message);
              break;
            default:
              setEmailError("Invalid");
          }
          setTimeout(() => {
            setEmailError("");
            setPasswordError("");
          }, 3000);
        });
      firebase.auth().onAuthStateChanged((user) => {
        if (user) {
          const userinfo = {
            name,
            cover,
            age: "",
            phone: "",
            city: "",
            country: "",
            email,
            uid: firebase.auth().currentUser.uid,
            description: "",
            aboutcover: "https://i.imgur.com/EPGteyo.jpg",
          };
          user.updateProfile({
            displayName: name,
          });
          db.collection("users").doc(user.uid).set({
            created: new Date(),
            uid: firebase.auth().currentUser.uid,
            userinfo,
            hiddenmsgs: [],
            notifis: true,
            grid: false,
            pro: false,
            following: [],
            followers: [],
          });
          db.collection("notifications").doc(user.uid).set({
            notifications: [],
          });
          db.collection("books").doc(user.uid).set({
            books: [],
          });
          db.collection("favorites").doc(user.uid).set({
            favorites: [],
          });
        } //if (user)
        else {
          setUser("");
        }
      });
    }
  };
  const handleLogout = () => {
    window.location.reload();
    firebase.auth().signOut();
  };
  const authListener = () => {
    firebase.auth().onAuthStateChanged((user) => {
      if (user) {
        clearInputs();
        setUser(user);
        setLoading(false);
      } else {
        setUser("");
      }
    });
  };

  function loginwithGoogle() {
    var provider = new firebase.auth.GoogleAuthProvider();
    provider.addScope("email");

    firebase
      .auth()
      .signInWithPopup(provider)
      .then((result) => {
        if (result.additionalUserInfo.isNewUser) {
          /** @type {firebase.auth.OAuthCredential} */
          var credential = result.credential;

          // This gives you a Google Access Token. You can use it to access the Google API.
          var token = credential.accessToken;
          // The signed-in user info.
          var user = result?.user;
          // ...
          const userinfo = {
            name: user?.displayName,
            cover: user?.photoURL,
            age: "",
            phone: user?.phoneNumber,
            city: "",
            country: "",
            email: user?.email,
            uid: firebase.auth().currentUser?.uid,
            description: "",
            aboutcover: "https://i.imgur.com/ZmEcN9a.jpg",
          };
          db.collection("users").doc(user.uid).set({
            created: new Date(),
            uid: user.uid,
            userinfo,
            hiddenmsgs: [],
            notifis: true,
            grid: false,
            pro: false,
            following: [],
            followers: [],
          });
          db.collection("notifications").doc(user.uid).set({
            notifications: [],
          });
          db.collection("books").doc(user.uid).set({
            books: [],
          });

          db.collection("favorites").doc(user.uid).set({
            favorites: [],
          });
          db.collection("allusers")
            .doc("allusers")
            .update({
              users: firebase.firestore.FieldValue.arrayUnion(userinfo),
            });
        }
      })
      .catch((error) => {
        // Handle Errors here.
        var errorCode = error.code;
        var errorMessage = error.message;
        // The email of the user's account used.
        var email = error.email;
        // The firebase.auth.AuthCredential type that was used.
        var credential = error.credential;
        // ...
        setEmailError(error.message);
        setTimeout(() => {
          setEmailError("");
        }, 3000);
      });
  }

  function loginwithFacebook() {
    var provider = new firebase.auth.FacebookAuthProvider();
    provider.addScope("email");

    firebase
      .auth()
      .signInWithPopup(provider)
      .then((result) => {
        if (result.additionalUserInfo.isNewUser) {
          /** @type {firebase.auth.OAuthCredential} */
          var credential = result.credential;

          // This gives you a Google Access Token. You can use it to access the Google API.
          var token = credential.accessToken;
          // The signed-in user info.

          var user = result.user;
          const userinfo = {
            name: user.displayName,
            cover: user.photoURL,
            age: "",
            phone: user.phoneNumber,
            city: "",
            country: "",
            email: user.email,
            uid: firebase.auth().currentUser.uid,
            description: "",
            aboutcover: "https://i.imgur.com/ZmEcN9a.jpg",
          };
          db.collection("users").doc(user.uid).set({
            created: new Date(),
            uid: firebase.auth().currentUser.uid,
            userinfo,
            hiddenmsgs: [],
            notifis: true,
            grid: false,
            pro: false,
            following: [],
            followers: [],
          });
          db.collection("notifications").doc(user.uid).set({
            notifications: [],
          });
          db.collection("books").doc(user.uid).set({
            books: [],
          });
          db.collection("favorites").doc(user.uid).set({
            favorites: [],
          });
          db.collection("allusers")
            .doc("allusers")
            .update({
              users: firebase.firestore.FieldValue.arrayUnion(userinfo),
            });
        }
      })
      .catch((error) => {
        // Handle Errors here.
        var errorCode = error.code;
        var errorMessage = error.message;
        // The email of the user's account used.
        var email = error.email;
        // The firebase.auth.AuthCredential type that was used.
        var credential = error.credential;

        // ...
        setEmailError(email);
        setTimeout(() => {
          setEmailError("");
        }, 3000);
        // console.log(errorCode);
      });
  }

  useEffect(() => {
    setLoading(true);
    authListener();
    document.addEventListener("contextmenu", (event) => {
      event.preventDefault();
    });
  }, []);

  return (
    <Router>
      <div className="App">
        {user ? (
          <ContextAppProvider>
            <>
              <Body setLoading={setLoading} handleLogout={handleLogout} />
              <Redirect to="/home" />
            </>
          </ContextAppProvider>
        ) : (
          <>
            <Login
              loginwithFacebook={() => loginwithFacebook}
              loginwithGoogle={() => loginwithGoogle}
              loading={loading}
              name={name}
              setName={setName}
              lname={lname}
              setlName={setlName}
              email={email}
              setEmail={setEmail}
              password={password}
              setPassword={setPassword}
              handleLogin={handleLogin}
              handleSignup={handleSignup}
              hasAccount={hasAccount}
              setHasAccount={setHasAccount}
              emailError={emailError}
              passwordError={passwordError}
            />
            <Redirect to="/" />
          </>
        )}
      </div>
    </Router>
  );
}

export default App;
