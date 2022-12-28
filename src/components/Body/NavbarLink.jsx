import React, { useContext } from "react";
import { NavHashLink } from "react-router-hash-link";
import { ContextApp } from "../../ContextAPI";

function NavbarLink(props) {
  const { icon, link, length } = props;
  const { setKeyword, setFavoritesbool } = useContext(ContextApp);
  return (
    <NavHashLink
      to={link + "#top"}
      activeClassName="activelink"
      onClick={() => {
        setKeyword("all");
        setFavoritesbool(false);
      }}
      isActive={(match, location) => {
        return match?.url === location.pathname;
      }}
    >
      <i className={icon}></i>
      {length ? <span className="count">{length}</span> : ""}
    </NavHashLink>
  );
}
export default NavbarLink;
