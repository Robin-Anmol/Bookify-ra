import React, { useContext, useEffect, useState } from "react";
import { ContextApp } from "../../ContextAPI";

function Label(props) {
  const { text, icon, keyword, setKeyword, state2, setMore, fnct } = props;
  const [active, setActive] = useState(false);
  const { setFavoritesbool, favoritesbool } = useContext(ContextApp);
  useEffect(() => {
    if (keyword && keyword.toLowerCase() === text.toLowerCase()) {
      setActive(true);
    } else if (keyword && keyword.toLowerCase() === "" && text === "All") {
      setActive(true);
    } else {
      setActive(false);
    }
  }, [keyword]);
  return (
    <label
      className={active ? "active labelicon" : "labelicon"}
      onClick={() => {
        fnct && fnct();
        setKeyword && setKeyword(text.toLowerCase());
        setFavoritesbool(state2 && state2);
        setMore && setMore((prev) => !prev);
      }}
    >
      <i className={icon}></i>
      <p>{text}</p>
    </label>
  );
}
export default Label;
