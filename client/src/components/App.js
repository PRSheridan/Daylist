import React, { useEffect, useState } from "react";
import { Switch, Route } from "react-router-dom";
import Login from "./Login.js"

function App() {
  const [user, setUser] = useState(null)

  //CheckSession call
  useEffect(() => {
    fetch("/check_session")
    .then((response) => {
      if (response.ok) { response.json 
      .then((user) => setUser(user));
      }});
  }, []);

  if (!user) return <Login onLogin={setUser}/>

  return (
    <header>DayTracker</header>
  )
}

export default App;
