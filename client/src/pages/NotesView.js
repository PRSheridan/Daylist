import { useLocation, useNavigate } from "react-router-dom";

function NoteView() {
    const navigate = useNavigate()
    const location = useLocation()
    const calendarID = location.state.calendarID
    const notes = location.state.filteredNotes
    const date = location.state.selectedDate

    const months = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December']

    return (
        <div>
            <button className="back-button" onClick={() => navigate("/calendar", {state: {calendarID}})}>return to calendar view</button>
            <div className="header">{months[date[1]-1]}, {date[2]}, {date[0]} - Notes:</div>
            <hr className="rounded"></hr>
            <div id="note-list"> { notes.length > 0 ? ( notes.map((note) => (
                <div key={note.id}>
                    <a className="note-card"> {note.title}
                    <button className="back-button">delete note</button>
                    <button className="back-button">edit note</button>
                        <div className="note-card-content">{note.content} </div>
                    </a>
                </div>
            ))) : (
                <div className="alert"> No notes found </div> )}
            </div>
            <a className="note-card new" onClick={() => navigate("/NewNote", {state: {calendarID, date}})}>
                + New
            </a>
        </div>
    )
}

export default NoteView