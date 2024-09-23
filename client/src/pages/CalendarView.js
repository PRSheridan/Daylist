import { useState, useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import ShareForm from '../components/ShareForm'
import EditForm from '../components/EditCalendar'

function CalendarView() {
    const navigate = useNavigate()
    const location = useLocation()

    const [calendar, setCalendar] = useState([])
    const [notes, setNotes] = useState([])
    const [date, setDate] = useState([9999, 1, 1])
    const months = ['January', 'February', 'March', 'April', 'May', 'June',
        'July', 'August', 'September', 'October', 'November', 'December']
    const calendarID = location.state.calendarID
    const today = new Date()

    const [showShareForm, setShowShareForm] = useState(false)
    const [showEditForm, setShowEditForm] = useState(false)
    
    useEffect(() => {
        formatDate(today)
        fetch(`/calendar/${calendarID}`)
        .then((response) => response.json())
        .then(setCalendar)

        fetch(`/calendar_notes/${calendarID}`)
        .then((response) => response.json())
        .then(setNotes)
    }, [showEditForm])

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

    function deleteCalendar(id) {
        fetch(`/calendar/${id}`, {
            method: 'DELETE',
            headers: { 'Content-Type':'application/json' }
        })
        .then( navigate("/CalendarList") )
    }

    function buildMonth (date) {
        const days = []
        const totalDays = daysInMonth(date)
        
        days.push(
            <div key="header">
                <div id="calendar-title" className="header-text">{calendar.title}:</div>
                <button className="button month-counter"
                        onClick={() => setDate([date[0], date[1]-1, date[2]])}> last month </button>
                <button className="button month-counter"
                        onClick={() => setDate([date[0], date[1]+1, date[2]])}> next month </button>
                <div className="calendar-container fade-in-text">
                    <div className="date">{months[date[1]-1]}, {date[0]}</div>
                    <div className="button-container">
                        <button className="button new"
                                onClick={() => setShowShareForm(!showShareForm)}>share calendar</button>
                        <button className="button edit"
                                onClick={() => setShowEditForm(!showEditForm)}>edit calendar</button>
                        <button className="button delete" 
                                onClick={() => deleteCalendar(calendar.id)}>delete calendar</button>
                    </div>
                </div>
                {showShareForm ? <ShareForm onClose={() => { setShowShareForm(false) }}
                                        calendar={calendar}/> : <></>}
                {showEditForm ? <EditForm onClose={() => { setShowEditForm(false) }}
                                        calendar={calendar}/> : <></>}
            </div>
        )

        for (let day = 1; day <= totalDays; day++) {
            let filteredNotes = notes.filter((note) => note.month === date[1] && note.day === day)
            days.push(
                <a key={day}
                    className={`day-card fade-in-text ${isToday(day) ? 'new' : ''}`}
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