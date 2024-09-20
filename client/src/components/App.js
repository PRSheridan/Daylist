import React, { useEffect, useState } from "react";
import { Outlet, useNavigate } from "react-router-dom";
import NavBar from "./NavBar.js"
import Login from "../pages/Login.js";

function App() {
  const navigate = useNavigate()
  const [user, setUser] = useState(null)

  useEffect(() => {
    document.title = 'Day Tracker'
    fetch("/check_session")
    .then((response) => {
      if (response.ok) {
         response.json().then((user) => setUser(user)) 
         navigate("/CalendarList")
      }
    })
  }, [])

  if (!user) return <Login onLogin={setUser}/>
  return (
    <>
      <div className="header">
        <div className="title in-line">DAYLIST</div>
        {user ? <div className="username-display in-line">{user.username}</div> : <></>}
        <NavBar user={user} setUser={setUser}/>
      </div>
      <div id="app-container">
        <Outlet />
      </div>
    </>
  )
}

export default App;
