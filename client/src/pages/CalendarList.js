import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import NewCalendar from "./NewCalendar";
import Calendar from "../components/Calendar"

function CalendarList({ user }) {
    const [calendars, setCalendars] = useState([])

    useEffect(() => {
        fetch("/calendars")
        .then((response) => response.json())
        .then(setCalendars)
        console.log(calendars)
    }, [])
    
    return (
        <>
            <div>Calendars:
                <>{calendars.length > 0 ? (
                    calendars.map((calendar) => (
                        <h2>{calendar.title}</h2>
                    ))
                ) : (
                    <div>no calendars found</div>
                )}</>
            </div>
            <button>
                <Link to="/new_calendar">+ New Calendar</Link>
            </button>
        </>
    )
}

export default CalendarList