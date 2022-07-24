import React, { useContext, useEffect, useState } from "react";
import ReactTimeAgo from "react-time-ago";
import { CSSTransition } from "react-transition-group";
import Dropmenu from "../../Dropmenu/Dropmenu";
import Icon from "../../Icon/Icon";
import firebase from "firebase";
import { db } from "../../../Fire";
import { ContextApp } from "../../../ContextAPI";
import Notification from "../../Notification/Notification";
import Individcomment from "./Individcomment";
import { notificationFunc } from "../Notification";

function Comment(props) {
  const { comment, book, comments, userimg } = props;
  const user = firebase.auth().currentUser;
  const [disabled, setDisabled] = useState(true);
  const [dropmenu, setDropmenu] = useState(false);
  const [editmsgstring, setEditmsgstring] = useState(comment.msg);
  const [liked, setLiked] = useState(false);
  const [enabled, setEnabled] = useState(true);
  const { notification, setNotification, notifibool, setNotifibool } =
    useContext(ContextApp);
  const msgoptions = [
    {
      icon: "fal fa-edit",
      text: "Edit",
    },
    {
      icon: "fal fa-eye-slash",
      text: "Hide",
    },
    {
      icon: "fal fa-trash red",
      text: "Delete",
    },
    {
      icon: "fal fa-flag red",
      text: "Report",
    },
  ];

  function saveMsg() {
    if (editmsgstring !== comment?.msg) {
      comments?.map((commentm) => {
        if (commentm.commentid === comment.commentid) {
          let commentIndex = comments.indexOf(commentm);
          comments[commentIndex].msg = editmsgstring;
          comments[commentIndex].edited = true;
          db.collection("comments").doc(book.bookid).update({
            replies: comments,
          });
        }
      });
    }
    setDisabled(true);
  }
  function likes() {
    comments?.map((commentm) => {
      if (!commentm.likedby.includes(user.uid)) {
        if (commentm.commentid === comment.commentid) {
          let commentIndex = comments.indexOf(commentm);
          comments[commentIndex].likedby.push(user.uid);
          setLiked(true);
          db.collection("comments").doc(book.bookid).update({
            replies: comments,
          });
          notificationFunc(
            book,
            user.uid,
            "liked your comment.",
            "likecomment",
            comment.commentid,
            commentm.senderid,
            enabled
          );
        }
      } else {
        if (commentm.commentid === comment.commentid) {
          let commentIndex = comments.indexOf(commentm);
          const ind = comments[commentIndex].likedby.indexOf(user.uid);
          comments[commentIndex].likedby.splice(ind, 1);
          setLiked(false);
          db.collection("comments").doc(book.bookid).update({
            replies: comments,
          });
          notificationFunc(
            book,
            user.uid,
            "unliked your comment.",
            "likecomment",
            comment.commentid,
            commentm.senderid,
            enabled
          );
        }
      }
    });
  }
  // function reply(){
  //   comments && comments.map(commentm=>{
  //     if(commentm.commentid===comment.commentid){
  //       let commentIndex = comments.indexOf(commentm)
  //       comments[commentIndex].replies.push()
  //     }
  //   })
  // }

  useEffect(() => {
    document.addEventListener("click", (e) => {
      setDropmenu(false);
    });

    comments?.map((commentm) => {
      if (commentm.likedby.includes(user.uid)) {
        if (commentm.commentid === comment.commentid) {
          setLiked(true);
        }
      } else {
        if (commentm.commentid === comment.commentid) {
          setLiked(false);
        }
      }
    });
    db.collection("users")
      .doc(comment.senderid)
      .onSnapshot((snap) => {
        setEnabled(snap.data().notifis);
      });
  }, [comment]);
  return (
    <>
      {comment?.hide ? (
        ""
      ) : (
        <Individcomment
          comments={comments}
          comment={comment}
          editmsgstring={editmsgstring}
          disabled={disabled}
          setDisabled={setDisabled}
          setNotifibool={setNotifibool}
          likes={likes}
          setEditmsgstring={setEditmsgstring}
          saveMsg={saveMsg}
          liked={liked}
          dropmenu={dropmenu}
          setDropmenu={setDropmenu}
          msgoptions={msgoptions}
          userimg={userimg}
          book={book}
        />
      )}
    </>
  );
}
export default Comment;
