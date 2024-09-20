import React, { useState } from "react";
import { useFormik } from "formik"
import * as yup from "yup"

function NewCalendar( {onClose} ) {
    const [errors, setErrors] = useState([])

    const formSchema = yup.object().shape({
        title: yup.string().required("Must enter a title").max(24),
    });

    const formik = useFormik({
        initialValues: { title: "" },
        validationSchema: formSchema,
        onSubmit: (values) => {
            fetch("/calendars", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(values, null, 1),
            }).then(
            (response) => {
                if (response.ok) { onClose() }
                else { response.json().then((err) => setErrors(err.errors)) }
            }
            )
        },
    })

    return (
        <a id="new-calendar-container">
            <h2>New Calendar:</h2>
            <form onSubmit={ formik.handleSubmit }>
                <div>
                    <div>Enter calendar title:</div>
                    <input
                    type="text"
                    id="title"
                    autoComplete="off"
                    value={ formik.values.title }
                    onChange={ formik.handleChange }
                    />
                </div>
            <div>
                <button className="button new" type="submit">Create calendar</button>
                <button className="button delete" onClick={()=> onClose()}>cancel</button>
            </div>
            </form>
        </a>
    )
}

export default NewCalendar