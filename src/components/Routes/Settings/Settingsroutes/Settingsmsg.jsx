import React, { useEffect, useState } from "react";
import { HashLink as Link } from "react-router-hash-link";
import Icon from "../../../Icon/Icon";
import ReactTimeAgo from "react-time-ago";
import { db } from "../../../../Fire";
import firebase from "firebase";
import { notificationFunc } from "../../Notification";
function Settingsmsg(props) {
  const user = firebase.auth().currentUser;
  const {
    book,
    msg,
    fnct,
    comment,
    special,
    usernotifi,
    icon,
    booklink,
    type,
  } = props;
  const [following, setFollowing] = useState([]);
  const [followers, setFollowers] = useState([]);
  function accept() {
    db.collection("users")
      .doc(user.uid)
      .update({
        following: firebase.firestore.FieldValue.arrayUnion(msg.notificator),
      });
    db.collection("users")
      .doc(msg.notificator)
      .update({
        followers: firebase.firestore.FieldValue.arrayUnion(user.uid),
      });
    notificationFunc(
      "",
      msg.notificator,
      "followed you back.",
      "follow",
      "",
      user.uid,
      true
    );
  }
  function determineLink(book, comment) {
    if (type === "follow") {
      return "/" + msg.notificator;
    } else if (typeof book.bookid === "undefined") {
      return "/404#top";
    } else if (booklink) {
      return "/home#" + book.bookid;
    } else {
      return "/books/" + book.bookid + "#" + comment && comment.commentid;
    }
  }
  function determineImg() {
    if (type === "follow" || type === "replycomment") {
      return <img src={usernotifi?.cover} alt="" />;
    } else if (type === "sendcomment") {
      return <img src={book.cover} alt="" />;
    } else if (
      type === "likepost" ||
      type === "sendcomment" ||
      type === "hidden"
    ) {
      return <img src={book.cover} alt="" />;
    }
  }
  function determineClass() {
    if (type === "follow" || type === "replycomment") {
      return "theme";
    } else if (type === "sendcomment") {
      return "bluetheme";
    } else if (type === "likecomment" || type === "likepost") {
      return "thirdtheme";
    } else {
      return "thirdtheme";
    }
  }
  useEffect(() => {
    db.collection("users")
      .doc(user.uid)
      .onSnapshot((snap) => {
        setFollowing(snap.data()?.following);
        setFollowers(snap.data()?.followers);
      });
    // console.log(book);
  }, []);
  return (
    <div
      style={{ position: "relative", maxWidth: "100%" }}
      className={determineClass()}
    >
      <Link
        smooth
        to={
          type === "follow"
            ? "/" + msg.notificator
            : type === "replycomment"
            ? "/books/" + msg.bookid + "#" + msg.commentid
            : typeof book.bookid === "undefined"
            ? "/404#top"
            : booklink
            ? "/home#" + book.bookid
            : "/books/" + book.bookid + "#" + comment.commentid
        }
        onClick={() => (special && !type === "follow" ? fnct && fnct() : "")}
      >
        <div className="hiddenmsg flex">
          <h5>{book.title}</h5>
          <div className="flexrow rowmsg">
            <div className="bookmsg">{determineImg()}</div>
            <div className="msgcont flex">
              <span className="msg spanoverflow">
                {special ? comment && comment.msg : ""}
              </span>
              <span>
                <strong>{special ? usernotifi?.name : ""}</strong>{" "}
                <strong>{msg && msg.msg}</strong>
              </span>
              <span className="flexrow ac">
                <ReactTimeAgo date={msg.sent.toDate()} />
                {type === "follow" && (
                  <Link to="/notifications" className="acceptBtns">
                    {msg.msg !== "unfollowed you." &&
                      following &&
                      !following.includes(msg.notificator) && (
                        <button className="bannerBtn" onClick={() => accept()}>
                          Follow Back
                        </button>
                      )}
                  </Link>
                )}
              </span>
            </div>
          </div>
          <div className="dottedline stylemsg"></div>
          <div className="stripe stylemsg"></div>
        </div>
      </Link>
      <Icon icon={icon + " eye"} fnct={fnct} />
    </div>
  );
}
export default Settingsmsg;
