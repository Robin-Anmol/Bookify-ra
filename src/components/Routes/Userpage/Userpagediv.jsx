import React, { useEffect, useState } from "react";
import firebase from "firebase";
import { db } from "../../../Fire";
import { notificationFunc } from "../Notification";
import Icon from "../../Icon/Icon";
import { useHistory } from "react-router-dom";
function Userpagediv(props) {
  const { userinfo, userbookslength, user, currentuserinfo, userisfollowing } =
    props;
  const currentuser = firebase.auth().currentUser;
  function sendFollowRequest() {
    notificationFunc(
      "",
      user.uid,
      "followed you.",
      "follow",
      "",
      currentuser.uid,
      true
    );
    db.collection("users")
      .doc(currentuser.uid)
      .update({
        following: firebase.firestore.FieldValue.arrayUnion(user.uid),
      });
    db.collection("users")
      .doc(user.uid)
      .update({
        followers: firebase.firestore.FieldValue.arrayUnion(currentuser.uid),
      });
  }
  function unFollow() {
    notificationFunc(
      "",
      user?.uid,
      "unfollowed you.",
      "follow",
      "",
      currentuser.uid,
      true
    );
    db.collection("users")
      .doc(currentuser.uid)
      .update({
        following: firebase.firestore.FieldValue.arrayRemove(user.uid),
      });
    db.collection("users")
      .doc(user.uid)
      .update({
        followers: firebase.firestore.FieldValue.arrayRemove(currentuser.uid),
      });
  }
  const history = useHistory();
  function goBack() {
    history.goBack();
  }
  return (
    <div className="userdiv">
      <div className="profileimg" style={{ marginTop: "25px" }}>
        <Icon icon="fal fa-chevron-left abs" fnct={goBack} />
        <div className="pdng">
          {" "}
          <img src={userinfo.cover} alt="" />
        </div>
        <h3>{userinfo.name}</h3>
      </div>
      <div className="generalinfo flexrow">
        <span>
          <span>Followers</span>
          <strong>
            {userisfollowing?.length ? userisfollowing.length : 0}
          </strong>
        </span>
        <hr className="vertical" />
        <span>
          <span>Post</span>
          <strong className="length">
            {" "}
            {userbookslength?.length ? userbookslength.length : 0}
          </strong>
        </span>
        <hr className="vertical" />
        <span>
          <span>Comments</span>
          <strong>0</strong>
        </span>
      </div>
      <div className="userdescription">{userinfo.description}</div>
      <div
        className="flex"
        style={{ justifyContent: "center", alignItems: "center" }}
      >
        {currentuser.uid === user.uid ? (
          ""
        ) : currentuserinfo.following &&
          currentuserinfo.following.includes(user.uid) ? (
          <button className="bannerBtn" onClick={() => unFollow()}>
            <i className="fal fa-user-minus"></i>
            Unfollow
          </button>
        ) : (
          <button
            className="bannerBtn"
            onClick={() => {
              sendFollowRequest();
            }}
          >
            <i className="fal fa-user-plus"></i>
            Follow
          </button>
        )}
      </div>
    </div>
  );
}
export default Userpagediv;
