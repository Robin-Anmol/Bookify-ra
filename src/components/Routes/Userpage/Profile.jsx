import React from "react";
import { HashLink as Link } from "react-router-hash-link";
import Defaultmsg from "../../Booksdisplay/Defaultmsg";
import Userfollowing from "./Userfollowing";

function Profile(props) {
  const {
    usersinfo,
    usersbooks,
    following,
    followers,
    user,
    currentuser,
    userisfollowing,
    userispro,
  } = props;
  const arraylength = Math.min(usersbooks?.length, 4);
  const recentbooks =
    usersbooks &&
    usersbooks
      ?.slice(0)
      .reverse()
      .slice(0, arraylength)
      .map((el) => {
        return (
          <Link
            to={
              el.pro && currentuser?.uid !== el.userid && !userispro
                ? "/premiumpost"
                : `/books/${el && el.bookid}#top`
            }
          >
            <div className="recentpostimg">
              {el.pro && (
                <div className="protag" style={{ fontSize: "9px" }}>
                  Premium
                </div>
              )}
              <img
                src={el.cover}
                onError={(e) =>
                  (e.target.src = "https://i.imgur.com/eabLbmq.jpg")
                }
                alt=""
              />
              <div className="titlecover">
                <strong className="textoverflow">{el.title}</strong>
                <span className="textoverflow">{el.author}</span>
              </div>
            </div>
          </Link>
        );
      });
  const followingrow = userisfollowing?.map((userm) => {
    return <Userfollowing user={userm} currentuser={currentuser} />;
  });
  return (
    <div className="profiletab">
      <div className="cover">
        <img
          src={usersinfo?.aboutcover}
          onError={(e) => (e.target.src = "https://i.imgur.com/PR8Lpxg.jpg")}
          alt=""
        />
      </div>
      <h2>
        Recent Posts {`(${recentbooks?.length ? recentbooks.length : 0})`}
      </h2>
      <div
        className={
          recentbooks?.length === 0 ? "recentposts aboutuser" : "recentposts"
        }
      >
        {usersbooks?.length === 0 ? (
          <Defaultmsg
            text="No recent posts!"
            icon="fal fa-exclamation-circle"
          />
        ) : (
          recentbooks
        )}
      </div>
      <h2 id="followers">Followers</h2>
      <div className={userisfollowing?.length === 0 && "aboutuser"}>
        {userisfollowing?.length === 0 ? (
          <Defaultmsg text="No Followers!" icon="fal fa-exclamation-circle" />
        ) : (
          followingrow
        )}
      </div>
      <h2>About</h2>
      <div className="aboutuser">
        <div className="texts">
          {(following?.includes(user.uid) &&
            followers?.includes(currentuser?.uid)) ||
          user.uid === currentuser.uid ? (
            <>
              <p className="textoverflow">
                <strong>Age: </strong>
                <span>{usersinfo?.age ? usersinfo?.age : "N/A"}</span>
              </p>
              <p className="textoverflow">
                <strong>Email: </strong>
                <span>{usersinfo?.email ? usersinfo?.email : "N/A"}</span>
              </p>
              <p className="textoverflow">
                <strong>Phone: </strong>
                <span>{usersinfo?.phone ? usersinfo?.phone : "N/A"}</span>
              </p>
              <p className="textoverflow">
                <strong>City: </strong>
                <span>{usersinfo?.city ? usersinfo?.city : "N/A"}</span>
              </p>
              <p className="textoverflow">
                <strong>Country: </strong>
                <span>{usersinfo?.country ? usersinfo?.country : "N/A"}</span>
              </p>
            </>
          ) : (
            <Defaultmsg
              text="You must both be following each other to see this content!"
              icon="fal fa-exclamation-circle"
            />
          )}
        </div>
      </div>
    </div>
  );
}
export default Profile;
