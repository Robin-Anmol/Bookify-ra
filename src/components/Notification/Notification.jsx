import React from "react";
import "./Notification.css";
function Notification(props) {
  const { notification, setNotifibool, fixed } = props;
  return (
    <div
      className={
        fixed
          ? "notification box-shadow-br fixednoti"
          : "notification box-shadow-br"
      }
    >
      <i className={notification?.icon}></i>
      <p>{notification?.text}</p>
      <i className="fal fa-times" onClick={() => setNotifibool(false)}></i>
    </div>
  );
}
export default Notification;
