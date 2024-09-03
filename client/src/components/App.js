import React, { useEffect, useState } from "react";
import { Switch, Route } from "react-router-dom";
import Login from "./pages/Login.js";
import CalendarList from "./pages/CalendarList.js"
import NewCalendar from "./forms/NewCalendar.js"
import NavBar from "./NavBar.js"

function App() {
  const [user, setUser] = useState(null)

  //CheckSession call
  useEffect(() => {
    fetch("/check_session")
    .then((response) => {
      if (response.ok) { response.json().then((user) => setUser(user)) }
    })
  }, [])

  if (!user) return <Login onLogin={setUser}/>

  return (
    <>
      <NavBar user={user} setUser={setUser}/>
      <CalendarList user={user}/>
    </>
  )
}

export default App;
