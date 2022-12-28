import React, { useContext, useEffect, useState } from "react";
import { db } from "../../../../../Fire";
import Loadingel from "../../../../Loadingelement/Loadingel";
import "./Hiddenmsg.css";
import ReactTimeAgo from "react-time-ago";
import { HashLink as Link } from "react-router-hash-link";
import Icon from "../../../../Icon/Icon";
import firebase from "firebase";
import { ContextApp } from "../../../../../ContextAPI";
import Settingsmsg from "../Settingsmsg";
function Hiddenmsg(props) {
  const { msg, msgs } = props;
  const [book, setBook] = useState("");
  const [comments, setComments] = useState();
  const user = firebase.auth().currentUser;
  const { setNotification, setNotifibool } = useContext(ContextApp);
  function removeHidden() {
    msgs &&
      msgs.map((msgm) => {
        if (msgm.commentid === msg.commentid) {
          const commentIndex = msgs.indexOf(msgm);
          msgs.splice(commentIndex, 1);
          db.collection("users").doc(user.uid).update({
            hiddenmsgs: msgs,
          });
        }
      });
    comments &&
      comments.map((commentm) => {
        if (commentm.commentid === msg.commentid) {
          const commentIndex = comments.indexOf(commentm);
          comments[commentIndex].hide = false;
          db.collection("comments").doc(msg.bookid).update({
            replies: comments,
          });
        }
      });
    setNotifibool(true);
    setNotification({
      text: "Message is now visible!",
      icon: "fal fa-check-circle",
    });
    setTimeout(() => {
      setNotifibool(false);
    }, 3500);
  }

  useEffect(() => {
    db.collection("allbooks")
      .doc("allbooks")
      .onSnapshot((snap) => {
        const booksdata = snap.data();
        booksdata &&
          booksdata.books.map((book) => {
            if (book.bookid === msg.bookid) {
              setBook(book);
              console.log(book);
            }
          });
      });
    db.collection("comments")
      .doc(msg.bookid)
      .onSnapshot((snap) => {
        const commentsdata = snap.data();
        setComments(commentsdata.replies);
      });
  }, [msg]);
  return (
    <Settingsmsg
      type="hidden"
      comment={msg}
      msg={msg}
      book={book}
      fnct={removeHidden}
      icon="fal fa-eye"
    />
  );
}
export default Hiddenmsg;
