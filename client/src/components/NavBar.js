import React from "react";
import { NavLink } from "react-router-dom";

function NavBar({ user, setUser }) {

  function handleLogoutClick() {
    fetch("/logout", { method: "DELETE" }).then((r) => {
      if (r.ok) {
        setUser(null);
      }});
  }

  return (
    <nav id="navbar">
      <NavLink
        to={{pathname: "/CalendarList"}}
        className="nav-link"
        >CALENDAR LIST
      </NavLink>
      <a className="nav-link logout" onClick={handleLogoutClick}>
        LOGOUT  
      </a>
    </nav>
  )
}

export default NavBar