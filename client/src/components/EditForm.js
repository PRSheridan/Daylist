import React, { useState } from "react";
import { useFormik } from "formik"
import * as yup from "yup"

function EditForm( {onClose, calendar} ) {
    const [errors, setErrors] = useState([])

    const formSchema = yup.object().shape({
        title: yup.string().required("Must enter a new title"),
    });

    const formik = useFormik({
        initialValues: { title: calendar.title },
        validationSchema: formSchema,
        onSubmit: (values) => {
            fetch(`/calendar/${calendar.id}`, {
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
        <div id="share-container">
            <form className="edit-form" onSubmit={ formik.handleSubmit }>
                <div>
                    <div>Enter a new title:</div>
                    <input
                    type="text"
                    id="title"
                    autoComplete="off"
                    value={ formik.values.title }
                    onChange={ formik.handleChange }
                    />
                </div>
            <div>
                <button className="shared-button" type="submit">Change title</button>
                <button className="shared-button" onClick={()=> onClose()}>cancel</button>
            </div>
            </form>
        </div>
    )
}

export default EditForm