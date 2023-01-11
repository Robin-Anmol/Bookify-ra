import React, { useEffect, useState } from "react";
import { HashLink as Link } from "react-router-hash-link";
import { db } from "../../../Fire";
import User from "./User/User";

function Userfollowing(props) {
  const { user, follower, following } = props;
  const [userinfo, setUserinfo] = useState({});
  useEffect(() => {
    db.collection("users")
      .doc(user)
      .onSnapshot((snap) => {
        setUserinfo(snap.data()?.userinfo);
      });
  }, [user]);

  return (
    <div className="aboutuser">
      <User
        userinfo={userinfo}
        user={user}
        follower={follower}
        following={following}
      />
    </div>
  );
}
export default Userfollowing;
