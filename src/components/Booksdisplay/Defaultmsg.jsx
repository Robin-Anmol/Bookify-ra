import React from "react";
import { Link } from "react-router-dom";

function Defaultmsg(props) {
  const { text, link, icon } = props;

  return (
    <Link to={link} className="defaultmsg">
      <span>{text}</span>
      <i className={icon}></i>
    </Link>
  );
}
export default Defaultmsg;
