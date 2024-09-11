import App from "./components/App.js"
import CalendarList from "./pages/CalendarList.js"
import CalendarView from "./pages/CalendarView.js"
import NewCalendar from "./pages/NewCalendar.js"

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
      ]
    },
];

export default routes;