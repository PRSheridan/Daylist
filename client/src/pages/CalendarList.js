import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import NewCalendar from "./NewCalendar";

function CalendarList({ user }) {
    const [calendars, setCalendars] = useState(null)

    useEffect(() => {
        fetch("/calendars")
        .then((response) => {
          if (response.ok) { 
            response.json().then((calendars) => setCalendars(calendars)) }
        })
      }, [])
    
    return (
        <>
            <div>Calendars:
//populate calendars
            </div>
            <button as={Link} to="/new">
            + New calendar
            </button>
        </>
    )
}

export default CalendarList