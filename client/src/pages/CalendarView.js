import { useState, useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";

function CalendarView() {
    const navigate = useNavigate()
    const location = useLocation()
    const calendarID = location.state.calendarID
    const today = new Date()
    const [date, setDate] = useState([9999, 1, 1])
    const [calendar, setCalendar] = useState([])
    const [notes, setNotes] = useState([])
    
    //fetch todays date, format to day month year, display calendar
    //allow +/- month, display month
    useEffect(() => {
        formatDate(today)
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
        setDate([year, month, day])
    }

    function daysInMonth (date) {
        return new Date(date[1], date[0], 0).getDate();
    }

    function buildMonth (date) {
        const days = []
        const totalDays = daysInMonth(date)
        const monthsNotes = []
        notes.forEach(note => {
            if (note.month == date[1]) {
                monthsNotes.push(note)
            }
        })
        
        days.push(
            <>
                <h1 key="title">{calendar.title}</h1>
                <div key="month">Month: {date[1]} Year: {date[2]}</div>
            </>
        )
//if note month and day == calendar month and day display #of notes per day OR titles?
        for (let day = 1; day <= totalDays; day++) {
            days.push(
                <a key={day} 
                    className="day-card" 
                    onClick={() => navigate("/Notes", {state: {calendarID, date}})}>
                    {day}
                    <div></div>
                </a>
            );
        }
        return days
    }

    return (
        <div id='month-container'>
            {buildMonth(date)}
        </div>
    )
}

export default CalendarView