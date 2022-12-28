import { db } from "../../../Fire";
import firebase from "firebase";
export default function optionEdit(
  text,
  setDisabled,
  setDropmenu,
  comments,
  disabled,
  comment,
  setNotifibool,
  setNotification,
  book,
  user
) {
  if (text.toLowerCase() === "edit") {
    setDisabled(!disabled);
    setDropmenu(false);
  } else if (text.toLowerCase() === "delete") {
    comments?.map((commentm) => {
      if (commentm.commentid === comment.commentid) {
        let commentIndex = comments.indexOf(commentm);
        comments.splice(commentIndex, 1);
        db.collection("comments").doc(book.bookid).update({
          replies: comments,
        });
      }
    });
  } else if (text.toLowerCase() === "hide") {
    comments &&
      comments.map((commentm) => {
        if (commentm.commentid === comment.commentid) {
          let commentIndex = comments.indexOf(commentm);
          comments[commentIndex].hide = !comment.hide;
          db.collection("comments").doc(book.bookid).update({
            replies: comments,
          });
          setNotifibool(true);
          setNotification({
            icon: "fal fa-check-circle",
            text: "View hidden messages in settings!",
          });
          setTimeout(() => {
            setNotifibool(false);
          }, 7000);
          db.collection("users")
            .doc(user.uid)
            .update({
              hiddenmsgs: firebase.firestore.FieldValue.arrayUnion(
                comments[commentIndex]
              ),
            });
        }
      });
  }
}
