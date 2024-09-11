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
        <h1>Calendars:</h1>
            <div>
                <>
                { calendars.length > 0 ? ( calendars.map((calendar) => (
                    <button key={calendar.title} 
                            onClick={() => navigate("/Calendar", {state: {calendar}})}>
                        {calendar.title}
                    </button> ))
                ) : (
                    <div>no calendars found</div> )}
                </>
            </div>
            <button onClick={() => navigate("/NewCalendar")}>
                + New Calendar
            </button>
        </>
    )
}

export default CalendarList