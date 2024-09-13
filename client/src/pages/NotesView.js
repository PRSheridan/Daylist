import { useLocation, useNavigate } from "react-router-dom";

function NoteView() {
    const navigate = useNavigate()
    const location = useLocation()
    const calendarID = location.state.calendarID
    const notes = location.state.filteredNotes
    const date = location.state.selectedDate

    return (
        <div>
            <div className="header">{date[0]}, {date[1]}, {date[2]} - Notes:</div>
            <hr className="rounded"></hr>
            <div id="note-list"> { notes.length > 0 ? ( notes.map((note) => (
                <div key={note.id}>
                    <a className="note-card"> {note.title}
                        <div className="note-card-content">{note.content} </div>
                    </a>
                </div>
            ))) : (
                <div>no notes found</div> )}
            </div>
            <a className="note-card new" onClick={() => navigate("/NewNote", {state: {calendarID, date}})}>
                + New
            </a>
        </div>
    )
}

export default NoteView