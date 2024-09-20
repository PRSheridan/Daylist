import App from "./components/App.js"
import CalendarList from "./pages/CalendarList.js"
import CalendarView from "./pages/CalendarView.js"
import NoteList from "./pages/NoteList.js"
import EditNote from "./components/EditNote.js"
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
          path: "/Calendar",
          element: <CalendarView />
        },
        {
          path: "/Notes",
          element: <NoteList />
        },
        {
          path: "/EditNote",
          element: <EditNote />
        },
      ]
    },
];

export default routes;