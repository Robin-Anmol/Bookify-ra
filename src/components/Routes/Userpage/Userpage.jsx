import React, { useContext, useEffect, useState } from "react";
import firebase from "firebase";
import ReactTimeAgo from "react-time-ago";
import Motiondiv from "../Motiondiv";
import { db } from "../../../Fire";
import { ContextApp } from "../../../ContextAPI";
import Userpagediv from "./Userpagediv";
import Userroutes from "./Userroutes";
import "./Userpage.css";
function Userpage(props) {
  const { allbooksdoc } = useContext(ContextApp);
  const { user, allusers } = props;
  const [usersbooks, setUsersbooks] = useState([]);
  const [usersdata, setUsersdata] = useState({});
  const [comments, setComments] = useState([]);
  const [currentuserinfo, setCurrentuserinfo] = useState([]);
  const [followers, setFollowers] = useState([]);
  const [following, setFollowing] = useState([]);
  const [userisfollowing, setUserisfollowing] = useState([]);
  const currentuser = firebase.auth().currentUser;
  useEffect(() => {
    db.collection("users")
      .doc(user.uid)
      .onSnapshot((snap) => {
        setUsersdata(snap.data().userinfo);
        setFollowers(snap.data().following);
        setUserisfollowing(snap.data().followers);
      });
    db.collection("users")
      .doc(currentuser.uid)
      .onSnapshot((snap) => {
        setCurrentuserinfo(snap.data());
        setFollowing(snap.data().following);
      });
  }, [user]);
  useEffect(() => {
    db.collection("allbooks")
      .doc("allbooks")
      .onSnapshot((snap) => {
        const allbooksdata = snap.data()?.books;
        setUsersbooks(allbooksdata?.filter((x) => x?.userid === user?.uid));
      });
  }, [user]);
  return (
    <Motiondiv
      html={
        <>
          <div className="userpage">
            <Userpagediv
              userisfollowing={userisfollowing}
              user={user}
              userinfo={usersdata}
              userbookslength={usersbooks?.length}
              currentuserinfo={currentuserinfo}
            />
            <Userroutes
              userisfollowing={userisfollowing}
              following={following}
              followers={followers}
              setFollowers={setFollowers}
              setFollowing={setFollowing}
              usersinfo={usersdata}
              usersbooks={usersbooks}
              user={user}
            />
          </div>
        </>
      }
    />
  );
}
export default Userpage;
