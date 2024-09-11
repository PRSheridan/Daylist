import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import NewCalendar from "./NewCalendar";

function CalendarList({ user }) {
    const navigate = useNavigate()
    const [calendars, setCalendars] = useState([])

    useEffect(() => {
        fetch("/calendars")
        .then((response) => response.json())
        .then(setCalendars)
    }, [])
    
    return (
        <>
        <div className="header">Calendars:</div>
        <hr className="rounded"></hr>
            <div id="calendar-list"> { calendars.length > 0 ? ( calendars.map((calendar) => (
                <a className="card" 
                    key={calendar.title}  
                    onClick={() => navigate("/Calendar", {state: {calendar}})}>
                    {calendar.title}
                </a>
            ))) : (
                <div>no calendars found</div> )}
            </div>

            <a className="card" onClick={() => navigate("/NewCalendar")}>
                + New
            </a>
        </>
    )
}

export default CalendarList