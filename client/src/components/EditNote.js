import React from "react";
import {useNavigate } from "react-router-dom";
import { useFormik } from "formik"
import * as yup from "yup"

function EditNote( {onClose, note, calendarID} ) {
    const navigate = useNavigate()

    const formSchema = yup.object().shape({
        year: yup.string().required("Year required.").max(4, "Must be a year (yyyy)."),
        month: yup.string().required("Must enter a month").max(2, "Must be a month (mm)."),
        day: yup.string().required("Must enter a day").max(2, "Must be a day (dd)."),
        title: yup.string().required("Note must have a title").max(24, "Title must be less than 24 characters"),
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
            fetch(`/note/${note.id}`, {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(values, null, 1),
            }).then((response) => {
                if (response.ok) {navigate("/calendar", {state: {calendarID}})}
            })
        },
    })

    return (
        <div id="share-container">
            <form onSubmit={ formik.handleSubmit }>
                <div>
                    <div className="form-field">Enter note year:</div>
                    <div className="error">{formik.errors.year}</div>
                    <input
                        type="text"
                        id="year"
                        autoComplete="off"
                        value={ formik.values.year }
                        onChange={ formik.handleChange }
                    />
                </div>
                <div>
                    <div className="form-field">Enter note month:</div>
                    <div className="error">{formik.errors.month}</div>
                    <input
                        type="text"
                        id="month"
                        autoComplete="off"
                        value={ formik.values.month }
                        onChange={ formik.handleChange }
                    />
                </div>
                <div>
                    <div className="form-field">Enter note day:</div>
                    <div className="error">{formik.errors.day}</div>
                    <input
                        type="text"
                        id="day"
                        autoComplete="off"
                        value={ formik.values.day }
                        onChange={ formik.handleChange }
                    />
                </div>
                <div>
                    <div className="form-field">Enter note title:</div>
                    <div className="error">{formik.errors.title}</div>
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
                    <div className="error">{formik.errors.content}</div>
                    <textarea   
                        type="text"
                        id="content"
                        autoComplete="off"
                        value={ formik.values.content }
                        onChange={ formik.handleChange } rows="4" cols="50"
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

export default EditNote