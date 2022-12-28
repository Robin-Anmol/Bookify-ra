import React, { useCallback, useContext, useEffect, useState } from "react";
import firebase from "firebase";
import { db } from "../../../Fire";
import Userfollowing from "../Userpage/Userfollowing";
import "./Allusers.css";
import Banner from "../../Banner/Banner";
import { ContextApp } from "../../../ContextAPI";
import Defaultmsg from "../../Booksdisplay/Defaultmsg";
import Limitbtn from "../../Limitbtn/Limitbtn";

function Allusers() {
  const { keyword, setKeyword } = useContext(ContextApp);

  const pattern = new RegExp("\\b" + keyword.replace(/[\W_]+/g, ""), "i");
  const [allusers, setAllusers] = useState([]);
  const [limit, setLimit] = useState(45);
  const user = firebase.auth().currentUser;

  const filteredusers = allusers
    ?.filter((all) => all.uid !== user.uid)
    .filter(
      (user) => pattern.test(user.name) || keyword.toLowerCase() === "all"
    )
    .map((user, index) => (
      <Userfollowing key={index} user={user.uid} following={true} />
    ));
  const allusersrow = filteredusers?.length ? (
    filteredusers.splice(0, limit)
  ) : (
    <Defaultmsg
      link="/create"
      text="Nothing here, create your book here!"
      icon="fal fa-layer-plus"
    />
  );

  // useEffect(() => {
  //   db.collection("allusers")
  //     .doc("allusers")
  //     .onSnapshot((snap) => {
  //       setAllusers(snap.data()?.users);
  //     });
  // }, []);

  useEffect(() => {
    db.collection("allusers")
      .doc("allusers")
      .onSnapshot((snap) => {
        // console.log(snap.data()?.users);
        setAllusers(snap.data()?.users);
      });
  }, []);

  return (
    <div className="allusers">
      <Banner
        btn="Home"
        link="/home"
        text="View all users on Bookify."
        title="All Users"
        banner="https://i.imgur.com/Ipx45sY.jpg"
      />
      <div className="allusersgrid">{allusersrow}</div>
      <div className="buttns">
        {limit < allusers?.length && (
          <Limitbtn setLimit={setLimit} text="viewmore" />
        )}
      </div>
      <div className="spacer1"></div>
    </div>
  );
}
export default Allusers;
