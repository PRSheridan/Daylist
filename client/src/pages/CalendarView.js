import { useState, useEffect } from "react";
import {useLocation, useNavigate, Outlet, useOutletContext } from "react-router-dom";

function CalendarView() {
    const location = useLocation();
    const calendarID = location.state.calendar.id
    const [calendar, setCalendar] = useState([])
    
    useEffect(() => {
        fetch(`/calendars/${calendarID}`)
        .then((response) => response.json())
        .then(setCalendar)
    }, [])

    return (
        <h1>{calendar["id"]}</h1>
    )
}

export default CalendarView