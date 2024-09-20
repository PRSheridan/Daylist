import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import NewCalendar from '../components/NewCalendar'

function CalendarList() {
    const navigate = useNavigate()
    const [calendars, setCalendars] = useState([])
    const [showNewCalendar, setShowNewCalendar] = useState(false)

    useEffect(() => {
        fetch("/calendars")
        .then((response) => response.json())
        .then(setCalendars)
    }, [showNewCalendar])
    
    return (
        <div id="calendar-list">
            <div className="header-text">Calendars:</div>
            { showNewCalendar ? <NewCalendar onClose={() => setShowNewCalendar(false)}/> : <></>}
            <div> { calendars.length > 0 ? ( calendars.map((calendar) => (
                <a className="card" 
                    key={calendar.title}  
                    onClick={() => navigate("/Calendar", {state: {calendarID: calendar.id}})}>
                    {calendar.title}
                </a>
            ))) : (
                <div className="alert"> No calendars found </div> 
            )}
                <a className="card new" onClick={() => setShowNewCalendar(true)}>
                    + New
                </a>
            </div>

        </div>
    )
}

export default CalendarList