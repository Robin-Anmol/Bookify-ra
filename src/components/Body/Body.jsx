import React, { useContext, useState, useEffect } from "react";
import firebase from "firebase";
import Banner from "../Banner/Banner";
import Routes from "../Routes/Routes";
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link,
  NavLink,
  Redirect,
} from "react-router-dom";

import "./Body.css";
import Quickmenu from "./Quickmenu";
import Navbar from "../Navbar/Navbar";
import { ContextApp } from "../../ContextAPI";
import { db } from "../../Fire";
import Notification from "../Notification/Notification";
import { CSSTransition } from "react-transition-group";
import Morefilters from "../Booksdisplay/Morefilters";
function Body(props) {
  const user = firebase.auth().currentUser;
  const { setLoading, handleLogout } = props;
  const [cover, setCover] = useState("https://i.imgur.com/rV86FxA.jpg");
  const [add, setAdd] = useState(false);
  const {
    keyword,
    setKeyword,
    scrollto,
    setNotification,
    setNotifibool,
    notifibool,
    morefilters,
    edit,
  } = useContext(ContextApp);
  const [notifilength, setNotifilength] = useState(0);
  const [noti, setNoti] = useState("");

  useEffect(() => {
    db.collection("notifications")
      .doc(user.uid)
      .onSnapshot((snap) => {
        const notificationsdata = snap.data()?.notifications;
        setNotifilength(notificationsdata?.length);
      });
  }, []);

  return (
    <div className="body">
      <div
        className="top"
        style={{ position: "absolute", top: "-100px" }}
        id="top"
      ></div>
      <Navbar
        setKeyword={setKeyword}
        keyword={keyword}
        handleLogout={handleLogout}
      />
      <Routes keyword={keyword} setKeyword={keyword} />
      <Quickmenu length={notifilength} />
      <CSSTransition
        in={morefilters}
        unmountOnExit
        timeout={300}
        classNames="morefilters"
      >
        <Morefilters />
      </CSSTransition>
      {noti}
    </div>
  );
}
export default Body;
