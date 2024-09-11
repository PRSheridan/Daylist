import { useState, useEffect } from "react";
import {useLocation, useNavigate, Outlet, useOutletContext } from "react-router-dom";

function CalendarView() {
    const navigate = useNavigate()
    const location = useLocation()
    const calendarID = location.state.calendar.id
    const [calendar, setCalendar] = useState([])
    const [notes, setNotes] = useState([])
    
    useEffect(() => {
        fetch(`/calendar/${calendarID}`)
        .then((response) => response.json())
        .then(setCalendar)

        fetch(`/calendar_notes/${calendarID}`)
        .then((response) => response.json())
        .then(setNotes)
    }, [])

    function createDays() {
        return ""
    }
//for days in given month multiply
    return (
        <a className="day-card" onClick={() => navigate("/NewNote", {state: {calendarID}})}></a>
    )
}

export default CalendarView