import React, { useEffect, useState } from "react";
import { db } from "../../../../Fire";
import Motiondiv from "../../Motiondiv";
import firebase from "firebase";
import Notifirow from "./Notifirow";
function Notifications(props) {
  const user = firebase.auth().currentUser;
  const [notifications, setNotifications] = useState([]);
  const [recnotifis, setRecnotifis] = useState(true);

  useEffect(() => {
    db.collection("notifications")
      .doc(user.uid)
      .onSnapshot((snap) => {
        const notificationsdata = snap.data();
        setNotifications(notificationsdata?.notifications);
      });
    db.collection("users")
      .doc(user.uid)
      .onSnapshot((snap) => {
        const userdata = snap.data();
        setRecnotifis(userdata?.notifis);
      });
  }, []);

  return (
    <Motiondiv
      html={
        <div className="notifications">
          <h2>Notifications</h2>
          <Notifirow
            state={notifications}
            recnotifis={recnotifis}
            setRecnotifis={setRecnotifis}
          />
        </div>
      }
    />
  );
}
export default Notifications;
