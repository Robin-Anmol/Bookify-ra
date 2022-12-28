import React, { useContext, useEffect, useState } from "react";
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link,
  Redirect,
  useLocation,
  NavLink,
} from "react-router-dom";
import NavbarLink from "./NavbarLink";
import { ContextApp } from "../../ContextAPI";
import HideElementLink from "../HideElementLink";

function Quickmenu(props) {
  const location = useLocation();
  const { length } = props;
  return (
    <HideElementLink
      link="/settings"
      html={
        <div className="quickmenu flexrow box-shadow-br">
          <div className="left">
            <NavbarLink link="/home" icon="fal fa-home-lg-alt" />
            <NavbarLink link="/library" icon="fal fa-books" />
          </div>
          {location.pathname.slice(0, 7) !== "/create" ? (
            <div className="middle">
              <NavbarLink link="/create" icon="fal fa-plus" />
            </div>
          ) : (
            ""
          )}
          <div className="right">
            <NavbarLink
              link="/notifications"
              icon="fal fa-bell"
              length={length > 100 ? "!" : length}
            />
            <NavbarLink link="/settings" icon="fal fa-cog" />
          </div>
        </div>
      }
    />
  );
}
export default Quickmenu;
