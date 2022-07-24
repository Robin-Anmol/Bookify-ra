import React, { useEffect, useState } from "react";
import { HashLink as Link } from "react-router-hash-link";
import { db } from "../../../../Fire";
import Settingsbtn from "../../Settings/Settingsbtn";
import "./User.css";
import firebase from "firebase";
import { notificationFunc } from "../../Notification";
function User(props) {
  const { userinfo, user, follower, following } = props;
  const currentuser = firebase.auth().currentUser;
  const [includes, setIncludes] = useState([]);
  function Unfollow() {
    notificationFunc(
      "",
      user,
      "unfollowed you.",
      "follow",
      "",
      currentuser.uid,
      true
    );
    db.collection("users")
      .doc(currentuser.uid)
      .update({
        following: firebase.firestore.FieldValue.arrayRemove(user),
      });
    db.collection("users")
      .doc(user)
      .update({
        followers: firebase.firestore.FieldValue.arrayRemove(currentuser.uid),
      });
  }
  function follow() {
    notificationFunc(
      "",
      user,
      "followed you.",
      "follow",
      "",
      currentuser.uid,
      true
    );
    db.collection("users")
      .doc(currentuser?.uid)
      .update({
        following: firebase.firestore.FieldValue.arrayUnion(user),
      });
    db.collection("users")
      .doc(user)
      .update({
        followers: firebase.firestore.FieldValue.arrayUnion(currentuser.uid),
      });
  }
  useEffect(() => {
    db.collection("users")
      .doc(currentuser.uid)
      .onSnapshot((snap) => {
        setIncludes(snap.data().following);
      });
  }, []);
  return (
    <Link smooth className="profilepic" to={`/${user}#followers`}>
      <div
        style={!follower && !following ? { width: "100%" } : { width: "" }}
        className={!follower && !following ? "flexrow ac sb" : "flexrow ac"}
      >
        <img src={userinfo?.cover} alt="" />
        <p>{userinfo?.name}</p>
      </div>
      {(follower || following) && (
        <div className="button">
          <Link to="/settings/followers">
            {includes && includes.includes(user) ? (
              <button
                className="bannerBtn"
                style={{ marginTop: "0" }}
                onClick={() => Unfollow()}
              >
                Unfollow
              </button>
            ) : (
              <button
                className="bannerBtn"
                onClick={() => follow()}
                style={{ marginTop: "0" }}
              >
                Follow
              </button>
            )}
          </Link>
        </div>
      )}
    </Link>
  );
}
export default User;
