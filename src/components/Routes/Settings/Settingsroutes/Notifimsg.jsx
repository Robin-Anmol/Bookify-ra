import React, { useEffect, useState } from "react";
import { db } from "../../../../Fire";
import Settingsmsg from "./Settingsmsg";
import firebase from "firebase";
function Notifimsg(props) {
  const { el, state } = props;
  const [book, setBook] = useState("");
  const [usernotifi, setUsernotifi] = useState("");
  const [comment, setComment] = useState("");
  const user = firebase.auth().currentUser;
  function deleteNotifi() {
    state &&
      state.map((element) => {
        if (element.notificationid === el.notificationid) {
          let notificationIndex = state.indexOf(element);
          state.splice(notificationIndex, 1);
          db.collection("notifications").doc(user.uid).update({
            notifications: state,
          });
        }
      });
  }

  useEffect(() => {
    if (el.type === "likepost" || el.type === "sendcomment") {
      db.collection("allbooks")
        .doc("allbooks")
        .onSnapshot((snap) => {
          const booksdata = snap.data().books;

          booksdata?.map((book) => {
            if (book.bookid === el.bookid) {
              setBook(book);
            }
          });
        });
    }
    db.collection("users")
      .doc(el.notificator)
      .onSnapshot((snap) => {
        const userdata = snap.data();
        setUsernotifi(userdata?.userinfo);
      });
    if (el.type === "sendcomment") {
      db.collection("comments")
        .doc(el.bookid)
        .onSnapshot((snap) => {
          const commentsdata = snap.data().replies;
          setComment(commentsdata?.filter((x) => x.commentid === el.commentid));
        });
    }
    if (el.type === "replycomment") {
      db.collection("comments")
        .doc(el.bookid)
        .onSnapshot((snap) => {
          const commentsdata = snap.data().replies;
          commentsdata?.map((comment) => {});
        });
    }
  }, [el]);

  return (
    <Settingsmsg
      type={el.type}
      msg={el}
      usernotifi={usernotifi}
      comment={comment}
      book={book}
      booklink={el.type === "likepost"}
      special={true}
      fnct={deleteNotifi}
      icon={"fal fa-times"}
    />
  );
}
export default Notifimsg;
