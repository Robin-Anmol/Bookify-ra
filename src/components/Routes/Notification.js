import { db } from "../../Fire";
import firebase from "firebase";

export function notificationFunc(
  book,
  user,
  msg,
  type,
  commentid,
  senderid,
  enabled
) {
  const curentuser = firebase.auth().currentUser;
  let notifiobj = {
    notificator: user,
    bookid: book.bookid,
    type,
    msg,
    commentid,
    sent: new Date(),
    notificationid: db.collection("users").doc().id,
  };
  let followobj = {
    notificator: senderid,
    receiver: user,
    type,
    msg,
    sent: new Date(),
    notificationid: db.collection("users").doc().id,
  };
  if (enabled) {
    if (type === "likepost") {
      if (book.userid !== user) {
        db.collection("notifications")
          .doc(book.userid)
          .update({
            notifications: firebase.firestore.FieldValue.arrayUnion(notifiobj),
          });
      }
    }
    if (type === "likecomment") {
      if (user !== senderid) {
        db.collection("notifications")
          .doc(senderid)
          .update({
            notifications: firebase.firestore.FieldValue.arrayUnion(notifiobj),
          });
      }
    }
    if (type === "sendcomment" && book.userid !== user) {
      db.collection("notifications")
        .doc(book.userid)
        .update({
          notifications: firebase.firestore.FieldValue.arrayUnion(notifiobj),
        });
    }
    if (type === "replycomment") {
      db.collection("notifications")
        .doc(senderid)
        .update({
          notifications: firebase.firestore.FieldValue.arrayUnion(notifiobj),
        });
    }
    if (type === "follow") {
      db.collection("notifications")
        .doc(user)
        .update({
          notifications: firebase.firestore.FieldValue.arrayUnion(followobj),
        });
    }
  }
}
