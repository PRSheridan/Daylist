import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import NewCalendar from '../components/NewCalendar'

function CalendarList() {
    const navigate = useNavigate()
    const [calendars, setCalendars] = useState([])
    const [showNewCalendar, setShowNewCalendar] = useState(false)
    const [isLoading, setIsLoading] = useState(false)

    useEffect(() => {
        setIsLoading(true);
        fetch("/calendars")
        .then((response) => response.json())
        .then((data) => {
            setIsLoading(false)
            setCalendars(data)
        })
    }, [showNewCalendar])
    
    return (
        <div id="calendar-list">
            <div className="header-text">Calendars:</div>
            { showNewCalendar ? <NewCalendar onClose={() => setShowNewCalendar(false)}/> : <></>}
            <div> { calendars.length > 0 ? ( calendars.map((calendar) => (
                <a className="card fade-in-text" 
                    key={calendar.title}  
                    onClick={() => navigate("/Calendar", {state: {calendarID: calendar.id}})}>
                    <div className="card-title">{calendar.title}</div>
                </a>
            ))) : (
                isLoading ? <div className="header-text">LOADING...</div> : <div className="alert"> No calendars found </div>
            )} 
                <a className="card new fade-in-text" onClick={() => setShowNewCalendar(true)}>
                    <div className="card-title">+ new calendar</div>
                </a>
            </div>

        </div>
    )
}

export default CalendarList