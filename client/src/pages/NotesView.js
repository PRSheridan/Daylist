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
                <>
        <div className="header">{date[0]}, {date[1]}, {date[2]} - Notes:</div>
        <hr className="rounded"></hr>
            <div id="note-list"> { notes.length > 0 ? ( notes.map((note) => (
                <div>
                    <a className="note-card" 
                        key={note.id}>
                        {note.title}
                        <div>{note.content}</div>
                    </a>
                </div>
            ))) : (
                <div>no notes found</div> )}
            </div>
            <a className="note-card" onClick={() => navigate("/NewNote", {state: {calendarID, date}})}>
                + New
            </a>
        </>
    )
}

export default NoteView