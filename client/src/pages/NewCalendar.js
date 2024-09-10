import React, { useEffect, useState } from "react";
import { useHistory } from "react-router-dom";
import { useFormik } from "formik"
import * as yup from "yup"

function NewCalendar() {

    const history = useHistory()
    const [errors, setErrors] = useState([])

    const formSchema = yup.object().shape({
        title: yup.string().required("Must enter a title"),
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
                if (response.ok) { history.push("/") }
                else { response.json().then((err) => setErrors(err.errors)) }
            }
            )
        },
    })

    return (
        <>
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
                <button type="submit">Create calendar</button>
            </div>
            </form>
        </>
    )
}

export default NewCalendar