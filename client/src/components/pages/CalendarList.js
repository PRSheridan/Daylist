import React, { useEffect, useState } from "react";

function CalendarList() {
    const [calendars, setCalendars] = useState(null)

    useEffect(() => {
        fetch("/")
        .then((response) => {
          if (response.ok) { response.json().then((calendars) => setCalendars(calendars)) }
        })
      }, [])

    console.log(calendars)
    
    return (
        <>
            <div>test</div>
        </>
    )
}

export default CalendarList