import App from "./components/App.js"
import CalendarList from "./pages/CalendarList.js"
import CalendarView from "./pages/CalendarView.js"
import NewCalendar from "./pages/NewCalendar.js"
import NewNote from "./pages/NewNote.js"
import NoteList from "./pages/NoteList.js"
//potentially make newcalendar, newnote popup windows? possible?
//share button, delete buttons, edit buttons
const routes = [
    {
      path: "/",
      element: <App />,
      children: [
        {
          path: "/CalendarList",
          element: <CalendarList />
        },
        {
            path: "/NewCalendar",
            element: <NewCalendar />
        },
        {
          path: "/Calendar",
          element: <CalendarView />
        },
        {
          path: "/NewNote",
          element: <NewNote />
        },
        {
          path: "/Notes",
          element: <NoteList />
        },
      ]
    },
];

export default routes;