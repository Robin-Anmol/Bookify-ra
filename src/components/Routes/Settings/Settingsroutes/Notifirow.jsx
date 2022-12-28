import React, { useState } from "react";
import { db } from "../../../../Fire";
import Icon from "../../../Icon/Icon";
import Settingsbtn from "../Settingsbtn";
import Notifimsg from "./Notifimsg";
import firebase from "firebase";
import Switchdiv from "../../../Switch/Switchdiv";
import Defaultmsg from "../../../Booksdisplay/Defaultmsg";
function Notifirow(props) {
  const [clearnotifisstate, setClearnotifsstate] = useState(false);
  const { state, recnotifis, setRecnotifis } = props;
  const user = firebase.auth().currentUser;
  const staterow = state?.map((el) => {
    return <Notifimsg el={el} state={state} />;
  });
  // console.log(state);
  function clearNotifis() {
    db.collection("notifications").doc(user.uid).update({
      notifications: [],
    });
    setClearnotifsstate(true);
    setTimeout(() => {
      setClearnotifsstate(false);
    }, 600);
  }
  function endisNotifis() {
    db.collection("users").doc(user.uid).update({
      notifis: !recnotifis,
    });
  }
  return (
    <div className="overflow">
      <h3>Manage Your Notifications</h3>
      <div style={{ margin: "20px 0" }}>
        <Switchdiv
          state={clearnotifisstate}
          fnct={clearNotifis}
          title={"Clear Notifications:"}
        />
      </div>
      <div style={{ margin: "20px 0" }}>
        <Switchdiv
          state={recnotifis}
          setState={setRecnotifis}
          fnct={endisNotifis}
          title={"Receive Notifications:"}
        />
      </div>
      {staterow && staterow.length === 0 ? (
        <Defaultmsg
          link="/home"
          text="No Notifications"
          icon="fal fa-bell-slash"
        />
      ) : (
        <div className="msgs">{staterow}</div>
      )}
    </div>
  );
}
export default Notifirow;
