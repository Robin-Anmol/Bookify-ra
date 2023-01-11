import React, { createContext, useState, useEffect } from "react";
import { useHistory, withRouter } from "react-router-dom";
import firebase from "firebase";
import { db } from "./Fire";
export let ContextApp = createContext();
let ContextAppProvider = (props) => {
  const user = firebase.auth().currentUser;
  const [add, setAdd] = useState(true);
  const [notification, setNotification] = useState({
    icon: "",
    text: "",
  });
  const [allbooksdoc, setAllbooksdoc] = useState("OwDcz5n4YBd9MvoXtrik");
  const history = useHistory();
  const [scrollto, setScrollto] = useState("");
  const [favoritesbool, setFavoritesbool] = useState(false);
  const [keyword, setKeyword] = useState("All");
  const [notifibool, setNotifibool] = useState(false);
  const [loader, setLoader] = useState(true);
  const [hide, setHide] = useState(false);
  const [morefilters, setMorefilters] = useState(false);
  const [gridview, setGridview] = useState(false);
  const [edit, setEdit] = useState(false);
  const [allusers, setAllusers] = useState([]);
  const [userispro, setUserispro] = useState(false);
  // console.log(allusers);
  const [userIsAdmin, setUserIsAdmin] = useState(false);

  useEffect(() => {
    db.collection("allusers")
      .doc("allusers")
      .onSnapshot((snap) => {
        setAllusers(snap.data()?.users);
      });
    db.collection("users")
      .doc(user.uid)
      .onSnapshot((snap) => {
        setUserispro(snap.data()?.pro);
        setUserIsAdmin(snap.data()?.isAdmin);
      });
  }, []);
  return (
    <ContextApp.Provider
      value={{
        userIsAdmin,
        userispro,
        allusers,
        setAllusers,
        favoritesbool,
        setFavoritesbool,
        add,
        setAdd,
        notification,
        setNotification,
        notifibool,
        setNotifibool,
        keyword,
        setKeyword,
        scrollto,
        setScrollto,
        loader,
        setLoader,
        setHide,
        hide,
        allbooksdoc,
        morefilters,
        setMorefilters,
        gridview,
        setGridview,
      }}
    >
      {props.children}
    </ContextApp.Provider>
  );
};
export default ContextAppProvider;
