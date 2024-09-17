import React, { useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { useFormik } from "formik"
import * as yup from "yup"

function NewNote( {onClose, calendarID, date } ) {
    const navigate = useNavigate()
    const location = useLocation()
    const [errors, setErrors] = useState([])

    const year = date[0]
    const month = date[1]
    const day = date [2]

    const formSchema = yup.object().shape({
        title: yup.string().required("Note must have a title").max(24),
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
        <a id="new-note-container">
            <h2>New note:</h2>
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
                <button onClick={()=> onClose()}>cancel</button>
            </div>
            </form>
        </a>
    )
}

export default NewNote