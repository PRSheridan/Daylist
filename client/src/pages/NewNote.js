import React, { useEffect, useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { useFormik } from "formik"
import * as yup from "yup"

function NewNote() {
    const navigate = useNavigate()
    const location = useLocation()
    const [errors, setErrors] = useState([])
    const calendarID = location.state.calendarID
    const selectedDate = location.state.date
    const filteredNotes = location.state.notes

    const year = selectedDate[0]
    const month = selectedDate[1]
    const day = selectedDate [2]

    const formSchema = yup.object().shape({
        title: yup.string().required("Note must have a title"),
        content: yup.string().required("Note must have content"),
      });

    const formik = useFormik({
        initialValues: { 
            year: year,
            month: month,
            day: day,
            title: "",
            content: "",
            calendar_id: calendarID },
        validationSchema: formSchema,
        onSubmit: (values) => {
            fetch(`/calendar_notes/${calendarID}`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(values, null, 1),
            }).then((response) => {
                if (response.ok) { navigate(`/calendar/`, {state: {calendarID}}) }
                else { response.json().then((err) => setErrors(err.errors)) }
            })
        },
    })

    return (
        <>
            <div className="header">New note:</div>
            <hr className="rounded"></hr>
            <div>{selectedDate[0]}, {selectedDate[1]}, {selectedDate[2]}:</div>
            <form onSubmit={ formik.handleSubmit }>
                <div>
                    <div>Enter note title:</div>
                    <input
                    type="text"
                    id="title"
                    autoComplete="off"
                    value={ formik.values.title }
                    onChange={ formik.handleChange }
                    />
                </div>
                <div>
                    <div>Enter note content:</div>
                    <input
                    type="text"
                    id="content"
                    autoComplete="off"
                    value={ formik.values.content }
                    onChange={ formik.handleChange }
                    />
                </div>
            <div>
                <button type="submit">Create note</button>
            </div>
            </form>
        </>
    )
}

export default NewNote