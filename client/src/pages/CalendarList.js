import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

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
                    onClick={() => navigate("/Calendar", {state: {calendarID: calendar.id}})}>
                    {calendar.title}
                </a>
            ))) : (
                <div className="alert"> no calendars found </div> 
            )}
                <a id="new-card" className="card" onClick={() => navigate("/NewCalendar")}>
                    + New
                </a>
            </div>

        </>
    )
}

export default CalendarList