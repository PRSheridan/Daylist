import React, { useEffect, useState } from "react";
import { Switch, Route } from "react-router-dom";
import Login from "../pages/Login.js"
import CalendarList from "../pages/CalendarList.js"
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
      <main>
        <Switch>
          <Route path="/">
            <CalendarList />
          </Route>
        </Switch>
      </main>
    </>
  )
}

export default App;
