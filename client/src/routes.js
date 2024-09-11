import App from "./components/App.js"
import CalendarList from "./pages/CalendarList.js"
import CalendarView from "./pages/CalendarView.js"
import NewCalendar from "./pages/NewCalendar.js"
import NewNote from "./pages/NewNote.js"
import NoteView from "./pages/NoteView.js"

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
          path: "/Note",
          element: <NoteView />
        },
      ]
    },
];

export default routes;