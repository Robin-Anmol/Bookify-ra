import React, { useState } from "react";
import firebase from "firebase";
import Navbar from "../Navbar/Navbar";
import "./Banner.css";
import { Link } from "react-router-dom";
import Carousel from "./Carousel";
function Banner(props) {
  const { link, btn, setLoading, handleLogout, text, title, banner, white } =
    props;
  return (
    <>
      <div
        className="bannercreate"
        style={{ backgroundImage: "url(" + banner + ")" }}
      >
        <div className="infobanner">
          <h2 style={white ? { color: "#000" } : { color: "" }}>{title}</h2>
          <small
            style={white ? { color: "#000", fontWeight: 500 } : { color: "" }}
          >
            {text}
          </small>
          <Link to={link}>
            <button className="bannerBtn">{btn}</button>
          </Link>
        </div>
      </div>
    </>
  );
}
export default Banner;
