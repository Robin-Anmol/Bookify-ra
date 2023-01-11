import React, { useContext, useEffect, useState } from "react";
import firebase from "firebase";
import "./Routes.css";
import Booksdisplay from "../Booksdisplay/Booksdisplay";
import {
  Switch,
  Route,
  useLocation,
  useHistory,
  Redirect,
} from "react-router-dom";
import Create from "./Create/Create";
import { ContextApp } from "../../ContextAPI";
import { AnimatePresence, motion } from "framer-motion";
import Favorites from "./Favorites/Favorites";
import { db } from "../../Fire";
import Bookpage from "./Bookpage/Bookpage";
import Settings from "./Settings/Settings";
import Notifications from "./Settings/Settingsroutes/Notifications";
import Userpage from "./Userpage/Userpage";
import Allusers from "./Allusers/Allusers";
import NotFound from "./Notfound/Notfound";
import Pro from "./Pro/Pro";
import Defaultmsg from "../Booksdisplay/Defaultmsg";

function Routes(props) {
  const location = useLocation();
  const history = useHistory();
  const user = firebase.auth().currentUser;
  const { setLoading, handleLogout } = props;
  const {
    allusers,
    setAllusers,
    add,
    setAdd,
    keyword,
    setKeyword,
    setLoader,
    setHide,
    setNotifibool,
    setNotification,
  } = useContext(ContextApp);
  const [books, setBooks] = useState([]);
  const [usersbooks, setUsersbooks] = useState([]);
  const [favorites, setFavorites] = useState([]);
  const [userbks, setUserbks] = useState([]);

  const allbooksroute = books?.map((book, index) => {
    return (
      <Route path={`/books/${book?.bookid}`} key={index}>
        <Bookpage book={book} books={books} favorites={favorites} />
      </Route>
    );
  });
  const allusersroute = allusers?.map((userm, index) => {
    return (
      <Route key={index} path={`/${userm.uid}`}>
        <Userpage user={userm} allusers={allusers} />
      </Route>
    );
  });

  useEffect(() => {
    db.collection("allbooks")
      .doc("allbooks")
      .onSnapshot((snap) => {
        const booksdata = snap.data();
        // console.log(booksdata);
        setBooks(booksdata?.books);
      });
    db.collection("books")
      .doc(user.uid)
      .onSnapshot((snap) => {
        const booksdata = snap.data();
        console.log(booksdata);
        setUsersbooks(booksdata?.books);
      });

    setLoader(false);
  }, []);
  useEffect(() => {
    db.collection("allbooks")
      .doc("allbooks")
      .onSnapshot((snap) => {
        const booksdata = snap.data();

        setUsersbooks(booksdata?.books?.filter((x) => x.userid === user.uid));
      });
  }, []);
  useEffect(() => {
    db.collection("favorites")
      .doc(user.uid)
      .onSnapshot((snap) => {
        const favoritesdata = snap.data();
        setFavorites(favoritesdata?.favorites);
        setLoader(false);
      });
  }, []);

  useEffect(() => {
    if (location.pathname.startsWith("/settings")) {
      setHide(true);
    } else {
      setHide(false);
    }
  }, [location]);
  console.log(usersbooks);
  return (
    <div className="routes">
      <AnimatePresence>
        <Switch location={location}>
          <Route path="/home">
            <Booksdisplay
              books={books}
              carousel={true}
              banner="https://i.imgur.com/JSX5EoC.png"
              setAdd={setAdd}
              setKeyword={setKeyword}
              keyword={keyword}
            />
          </Route>
          <Route path="/create">
            <Create usersbooks={usersbooks} />
          </Route>
          <Route path="/library">
            <Booksdisplay
              usersbooks={usersbooks}
              carousel={true}
              banner="https://i.imgur.com/CVlHJxM.jpg"
              favorites={favorites}
              setFavorites={setFavorites}
              userimgbool={true}
              hidelike={true}
              editable={true}
              saved={true}
              books={usersbooks}
              allbooks={books}
              keyword={keyword}
              setKeyword={setKeyword}
            />
          </Route>
          <Route path="/notifications">
            <div className="notificationsroute">
              <Notifications />
            </div>
          </Route>
          <Route path="/settings">
            <Settings />
          </Route>
          <Route path="/users">
            <Allusers />
          </Route>
          <Route path="/premiumpost">
            <Defaultmsg
              text="Premium Post, get pro to gain access to this post."
              link="/pro"
              icon="fal fa-exclamation-circle"
            />
          </Route>
          <Route path="/pro">
            <Pro />
          </Route>
          <Route path="/404">
            <NotFound />
          </Route>
          {allusersroute}
          {allbooksroute}
        </Switch>
      </AnimatePresence>
    </div>
  );
}
export default Routes;
