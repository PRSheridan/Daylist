import { useState, useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";

function NoteView() {
    const navigate = useNavigate()
    const location = useLocation()
    const calendarID = location.state.calendarID
    const [notes, setNotes] = useState(location.state.filteredNotes)
    const date = location.state.selectedDate

    const months = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December']

    function deleteNote(noteID) {
        fetch(`/note/${noteID}`)
        .then((response) => response.json())
        .then({
            //remove the note from the current notes + delete is broken
        })
    }

    return (
        <div id="note-container">
            <button className="back-button" onClick={() => navigate("/calendar", {state: {calendarID}})}>return to calendar view</button>
            <div className="header">Notes:</div>
            <hr className="rounded"></hr>
            <div className="date">{months[date[1]-1]}, {date[2]}, {date[0]}</div>
            <div id="note-list"> { notes.length > 0 ? ( notes.map((note) => (
                <div key={note.id}>
                    <a className="note-card"> {note.title}
                    <button className="back-button" onClick={deleteNote(note.id)}>delete note</button>
                    <button className="back-button">edit note</button>
                        <div className="note-card-content">{note.content} </div>
                    </a>
                </div>
            ))) : (
                <div className="alert"> No notes found </div> )}
            </div>
            <a className="note-card new" onClick={() => navigate("/NewNote", {state: {notes, date, calendarID}})}>
                + New
            </a>
        </div>
    )
}

export default NoteView