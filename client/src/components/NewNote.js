import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useFormik } from "formik"
import * as yup from "yup"

function NewNote( {onClose, calendarID, date } ) {
    const navigate = useNavigate()
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
        <div className="new-form">
            <div>New note:</div>
            <form onSubmit={ formik.handleSubmit }>
                <div>
                    <div className="form-field">Enter note title:</div>
                    <input
                        type="text"
                        id="title"
                        autoComplete="off"
                        value={ formik.values.title }
                        onChange={ formik.handleChange }
                    />
                </div>
                <div>
                    <div className="form-field">Enter note content:</div>
                    <textarea   
                        type="text"
                        id="content"
                        autoComplete="off"
                        value={ formik.values.content }
                        onChange={ formik.handleChange } rows="4" cols="50"
                    />
                </div>
            <div>
                <button className="button new" type="submit">Create note</button>
                <button className="button delete" onClick={()=> onClose()}>cancel</button>
            </div>
            </form>
        </div>
    )
}

export default NewNote