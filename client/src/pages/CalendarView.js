import { useState, useEffect } from "react";
import {useLocation, useNavigate, Outlet, useOutletContext } from "react-router-dom";

function CalendarView() {
    const navigate = useNavigate()
    const location = useLocation()
    const calendarID = location.state.calendar.id
    const today = new Date()
    //day month year
    const [date, setDate] = useState([1, 1, 9999])
    const [calendar, setCalendar] = useState([])
    const [notes, setNotes] = useState([])
    //fetch todays date, format to day month year, display calendar
    //allow +/- month, display month
    useEffect(() => {
        fetch(`/calendar/${calendarID}`)
        .then((response) => response.json())
        .then(setCalendar)

        fetch(`/calendar_notes/${calendarID}`)
        .then((response) => response.json())
        .then(setNotes)
    }, [])

    function formatDate(today) {
        const day = today.getDate()
        const month = today.getMonth()
        const year = today.getFullYear()
        setDate([day, month, year])
    }

    function daysInMonth (date) {
        return new Date(date[1], date[2], 0).getDate();
    }

    function buildMonth (date) {
        const days = []
        const totalDays = daysInMonth(date)
        
        days.push(
            <>
                <h1 key="title">{calendar.title}</h1>
                <div key="month">Month: {date[1]}</div>
            </>
        )

        for (let day = 1; day <= totalDays; day++) {
            days.push(
                <a key={day} 
                    className="day-card" 
                    onClick={() => navigate("/NewNote", {state: {calendarID, date}})}>
                    {day}
                </a>
            );
        }
        return days
    }

    return buildMonth(date)
}

export default CalendarView