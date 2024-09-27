import { useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import NewNote from '../components/NewNote';
import EditNote from "../components/EditNote";

function NoteView() {
    const navigate = useNavigate()
    const location = useLocation()
    const calendarID = location.state.calendarID
    const [notes, setNotes] = useState(location.state.filteredNotes)
    const [currentNote, setCurrentNote] = useState([])
    const [showNewNote, setShowNewNote] = useState(false)
    const [showEditNote, setShowEditNote] = useState(false)
    const date = location.state.selectedDate

    const months = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December']

    function deleteNote(noteID) {
        fetch(`/note/${noteID}`, {
            method: 'DELETE',
            headers: { 'Content-Type':'application/json' }
        }).then((response) => {
            if (response.ok) { setNotes(notes.filter((note) => note.id !== noteID))}
        })
    }

    function editNote(note) {
        setShowEditNote(true)
        setCurrentNote(note)
    }
    
    return (
        <>
            <button className="button edit return"
                    onClick={() => navigate("/calendar", {state: {calendarID}})}>
                    return to calendar view
            </button>
            <div id="notes-container">
                <div className="date center">{months[date[1]-1]} {date[2]}, {date[0]}</div>

                {showNewNote ? <NewNote onClose={() => { setShowNewNote(false) }}
                                        notes={notes} date={date} calendarID={calendarID} /> : <></> }

                {showEditNote ? <EditNote onClose={() => { setShowEditNote(false) }}
                                            note={currentNote} calendarID={calendarID} /> : <></>}
                
                <div id="note-list"> { notes.length > 0 ? ( notes.map((note) => (
                    <div key={note.id}>
                        <div className="note-card">
                            <div className="note-header">
                                <div className="note-title">{note.title}</div>
                                <div className="note-buttons">
                                    <button className="button edit"
                                            onClick={() => editNote(note)}>edit note</button>
                                    <button className="button delete" 
                                            onClick={() => deleteNote(note.id)}>delete note</button>
                                </div>
                            </div>
                            <p className="note-card-content">{note.content} </p>
                        </div>
                    </div>
                    ))) : (
                    <div className="alert"> No notes found </div> )}
                    <div className="note-card new" onClick={() => setShowNewNote(true)}>
                        <div className="new-note-card"> + new note </div>
                    </div>
                </div>
            </div>
        </>
    )
}

export default NoteView