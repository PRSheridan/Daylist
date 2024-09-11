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
        >Calendars
      </NavLink>
      <NavLink
        to="/NewCalendar"
        className="nav-link"
        >+ New Calendar
      </NavLink>
      <button onClick={handleLogoutClick}>
        Logout  
      </button>
    </nav>
  )
}

export default NavBar