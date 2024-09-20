import React, { useState } from "react";
import { useFormik } from "formik"
import * as yup from "yup"

function EditNote( {onClose, note} ) {
    const [errors, setErrors] = useState([])

    const formSchema = yup.object().shape({
        year: yup.string().required("Must enter a year"),
        month: yup.string().required("Must enter a month"),
        day: yup.string().required("Must enter a day"),
        title: yup.string().required("Note must have a title"),
        content: yup.string().required("Note must contain content."),
    });

    const formik = useFormik({
        initialValues: { 
            year: note.year,
            month: note.month,
            day: note.day,
            title: note.title,
            content: note.content 
        },
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
        <div id="share-container">
            <form onSubmit={ formik.handleSubmit }>
                <div>
                    <div>Enter note year:</div>
                    <input
                    type="text"
                    id="year"
                    autoComplete="off"
                    value={ formik.values.year }
                    onChange={ formik.handleChange }
                    />
                </div>
                <div>
                    <div>Enter note month:</div>
                    <input
                    type="text"
                    id="month"
                    autoComplete="off"
                    value={ formik.values.month }
                    onChange={ formik.handleChange }
                    />
                </div>
                <div>
                    <div>Enter note day:</div>
                    <input
                    type="text"
                    id="day"
                    autoComplete="off"
                    value={ formik.values.day }
                    onChange={ formik.handleChange }
                    />
                </div>
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
                <button className="button edit" type="submit">Update note</button>
                <button className="button delete" onClick={()=> onClose()}>cancel</button>
            </div>
            </form>
        </div>
    )
}

export default EditForm