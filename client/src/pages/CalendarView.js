import { useState, useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";

function CalendarView() {
    const navigate = useNavigate()
    const location = useLocation()
    const months = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December']
    const [calendar, setCalendar] = useState([])
    const [notes, setNotes] = useState([])
    const [date, setDate] = useState([9999, 1, 1])

    const calendarID = location.state.calendarID
    const today = new Date()
    
    useEffect(() => {
        formatDate(today)
        fetch(`/calendar/${calendarID}`)
        .then((response) => response.json())
        .then(setCalendar)

        fetch(`/calendar_notes/${calendarID}`)
        .then((response) => response.json())
        .then(setNotes)
    }, [])

    function daySelect(day, filteredNotes) {
        const selectedDate = [date[0], date[1], day]
        navigate("/Notes", {state: {filteredNotes, selectedDate, calendarID}})
    }

    function isToday(day) {
        return day === today.getDate() && date[1] === today.getMonth() + 1 && date[0] === today.getFullYear();
    }

    function formatDate(today) {
        const day = today.getDate()
        const month = today.getMonth() + 1
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
            <div key="header">
                <div className="header">{calendar.title}:
                    <button className="back-button">share calendar</button>
                    <button className="back-button">delete calendar</button>
                </div>
                <hr className="rounded"></hr>
                <div className="date">{months[date[1]-1]}, {date[0]}</div>
            </div>
        )

        for (let day = 1; day <= totalDays; day++) {
            let filteredNotes = notes.filter((note) => note.month === date[1] && note.day === day)
            days.push(
                <a key={day}
                    className={`day-card ${isToday(day) ? 'new' : ''}`}
                    onClick={() => daySelect(day, filteredNotes)}> {day}
                    <div className="note-count"> { filteredNotes.length > 0 ?
                     `${filteredNotes.length}` : "" }
                    </div>
                </a>
            );
        }
        return days
    }

    return (
        <div id='month-container'>
            { buildMonth(date) }
        </div>
    )
}

export default CalendarView