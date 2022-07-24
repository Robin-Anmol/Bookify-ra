import React from "react";
import Defaultmsg from "../../Booksdisplay/Defaultmsg";
import "./Notfound.css";
function NotFound() {
  return (
    <div className="notfound">
      <h2>404 Page Not Found!</h2>
      <small>Post was most likely deleted.</small>
      <Defaultmsg
        link="/home#top"
        text="Page not found, return Home!"
        icon="fad fa-home"
      />
    </div>
  );
}
export default NotFound;
