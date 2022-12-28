import React, { useContext, useEffect, useRef, useState } from "react";
import firebase from "firebase";
import "./Navbar.css";
import {
  BrowserRouter as Router,
  Switch,
  Route,
  NavLink,
  Redirect,
  useHistory,
} from "react-router-dom";
import Dropmenu from "../Dropmenu/Dropmenu";
import { CSSTransition } from "react-transition-group";
import { db } from "../../Fire";
import { HashLink as Link } from "react-router-hash-link";
import HideElementLink from "../HideElementLink";
import Loadingel from "../Loadingelement/Loadingel";
import { ContextApp } from "../../ContextAPI";

function Navbar(props) {
  const history = useHistory();
  const { loader } = useContext(ContextApp);
  const { handleLogout, setKeyword, keyword } = props;
  const [dropmenu, setDropmenu] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const user = firebase.auth().currentUser;
  const [cover, setCover] = useState("");
  const [loading, setLoading] = useState(true);
  const [username, setUsername] = useState("");
  function vh(v) {
    var h = Math.max(
      document.documentElement.clientHeight,
      window.innerHeight || 0
    );
    return (v * h) / 100;
  }
  function handleScroll() {
    if (window.scrollY > vh(50)) {
      setScrolled(true);
    } else {
      setScrolled(false);
    }
  }
  const account = [
    {
      link: `/${user.uid}`,
      text: "Profile",
      icon: "fal fa-user",
    },
    {
      link: "/settings#top",
      text: "Preferences",
      icon: "fal fa-sliders-h",
    },
    {
      link: "/users#top",
      text: "All Users",
      icon: "fal fa-users",
    },
  ];
  const actions = [
    {
      link: "/pro#top",
      text: "Upgrade to Pro",
      icon: "fal fa-unlock-alt",
    },
    {
      link: "/",
      text: "Logout",
      icon: "fal fa-sign-out",
    },
  ];
  useEffect(() => {
    window.addEventListener("scroll", handleScroll);
    window.addEventListener("click", () => {
      setDropmenu(false);
    });
    db.collection("users")
      .doc(user.uid)
      .onSnapshot((snap) => {
        const userdata = snap.data();
        setCover(userdata?.userinfo.cover);
        setLoading(false);
        setUsername(userdata?.userinfo.name);
      });
  }, []);
  return (
    <HideElementLink
      link="/settings"
      html={
        <>
          <div className={scrolled ? "navbar blurrednav" : "navbar"}>
            <div className="mainlogocont">
              <Link smooth to="/home#top" className="flexrow logo">
                <img
                  className="mainlogo"
                  src="https://i.imgur.com/y5bNwaF.png"
                  alt=""
                />
                <h2> Bookify</h2>
              </Link>
              <div className="input flexrow">
                <input
                  type="text"
                  placeholder="Search..."
                  onChange={(e) => setKeyword(e.target.value)}
                />
                <i className="fal fa-search"></i>
              </div>
            </div>
            <div className="NavLinks">
              <div className="dropdown" onClick={(e) => e.stopPropagation()}>
                <div className="user " onClick={() => setDropmenu(!dropmenu)}>
                  <Loadingel El="img" img={cover} size={27} loader={loading} />
                  <p>{username}</p>
                  <i className="fa fa-th"></i>
                </div>
                <CSSTransition
                  in={dropmenu}
                  unmountOnExit
                  timeout={300}
                  classNames="menu"
                >
                  <Dropmenu
                    account={account}
                    actions={actions}
                    handleLogout={handleLogout}
                    setState={setDropmenu}
                    state={!dropmenu}
                  />
                </CSSTransition>
              </div>
            </div>
          </div>
          <div className="navbarspacer"></div>
        </>
      }
    />
  );
}
export default Navbar;
