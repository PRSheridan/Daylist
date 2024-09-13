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
        
        days.push(
            <>
                <h1>{calendar.title}</h1>
                <div>Month: {date[1]} Year: {date[2]}</div>
            </>
        )
//onClick setDate (currently all days show all notes)
//all notes displaying on current day
        for (let day = 1; day <= totalDays; day++) {
            const filteredNotes = notes.filter((note) => note.month === date[1] && note.day === day)
            days.push(
                <a key={day} 
                    className="day-card" 
                    onClick={() => navigate("/Notes", {state: {notes, date, calendarID}})}>
                    {day}
                    {filteredNotes.map((note, index) => (
                        <div key={index}>
                            {note.title}
                        </div>
                    ))}
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