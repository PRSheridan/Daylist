import React, { useEffect, useState } from "react";
import { Outlet, useNavigate } from "react-router-dom";
import NavBar from "./NavBar.js"
import Login from "../pages/Login.js";

function App() {
  const navigate = useNavigate()
  const [user, setUser] = useState(null)

  useEffect(() => {
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
      <NavBar user={user} setUser={setUser}/>
      <Outlet />
    </>
  )
}

export default App;
