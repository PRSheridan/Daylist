import { useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import NewNote from '../components/NewNote';

function NoteView() {
    const navigate = useNavigate()
    const location = useLocation()
    const calendarID = location.state.calendarID
    const [notes, setNotes] = useState(location.state.filteredNotes)
    const [showNewNote, setShowNewNote] = useState(false)
    const [showEditNote, setShowEditNote] = useState(false)
    const date = location.state.selectedDate

    const months = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December']

    function deleteNote(noteID) {
        fetch(`/note/${noteID}`, {
            method: 'DELETE',
            headers: { 'Content-Type':'application/json' }
        })
        .then(() => setNotes(notes.filter((note) => note.id !== noteID)))
    }
    
    return (
        <>
        <button className="button edit return"
                onClick={() => navigate("/calendar", {state: {calendarID}})}>
                return to calendar view
        </button>
        <div id="month-container">
            <div className="date center">{months[date[1]-1]} {date[2]}, {date[0]}</div>

            {showNewNote ? <NewNote onClose={() => { setShowNewNote(false) }}
                                    notes={notes} date={date} calendarID={calendarID} /> : <></> }

            
            <div id="note-list"> { notes.length > 0 ? ( notes.map((note) => (
                <div key={note.id}>
                    <a className="note-card"> {note.title}
                        <button className="nav-button"
                                onClick={() => setShowEditNote(true)}>edit note</button>
                        <button className="nav-button" 
                                onClick={() => deleteNote(note.id)}>delete note</button>
                        <p className="note-card-content">{note.content} </p>
                    </a>
                </div>
                ))) : (
                <div className="alert"> No notes found </div> )}
                <a className="note-card new" onClick={() => setShowNewNote(true)}>
                    + New
                </a>
            </div>
        </div>
        </>
    )
}

export default NoteView