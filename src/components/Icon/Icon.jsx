import React from "react";
import "./Icon.css";
function Icon(props) {
  const { icon, setState, set, fnct, stopprop } = props;
  return (
    <i
      className={icon + " icon"}
      onClick={(e) => {
        stopprop ? e.stopPropagation() : "";
        setState && setState(set);
        fnct && fnct();
      }}
    ></i>
  );
}
export default Icon;
