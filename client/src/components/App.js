import React, { useEffect, useState } from "react";
import { Switch, Route } from "react-router-dom";
import NavBar from "./NavBar.js"
import Login from "../pages/Login.js";
import CalendarList from "../pages/CalendarList.js"
import NewCalendar from "../pages/NewCalendar.js"

function App() {
  const [user, setUser] = useState(null)

  useEffect(() => {
    fetch("/check_session")
    .then((response) => {
      if (response.ok) {
         response.json().then((user) => setUser(user)) 
      }
    })
  }, [])

  if (!user) return <Login onLogin={setUser}/>

  return (
    <>
      <NavBar user={user} setUser={setUser}/>
      <Route>
        <Switch>
          <Route exact path="/calendars">
            <CalendarList user={user}/>
          </Route>
          <Route exact path="/new">
            <NewCalendar user={user}/>
          </Route>
        </Switch>
      </Route>
    </>
  )
}

export default App;
