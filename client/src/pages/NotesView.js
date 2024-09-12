import { useState, useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";

function NoteView() {
    const navigate = useNavigate()
    const location = useLocation()
    const [notes, setNotes] = useState([])
    const calendarID = location.state.calendarID
    const date = location.state.date

    useEffect(() => {
        fetch(`/calendar_notes/${calendarID}`)
        .then((response) => response.json())
        .then(setNotes)
    }, [])

    return (
        <>{notes}
            <a className="note-card" onClick={() => navigate("/NewNote", {state: {calendarID, date}})}>
                + New
            </a>
        </>
    )
}

export default NoteView