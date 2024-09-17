import React, { useEffect, useState } from "react";
import { useFormik } from "formik"
import * as yup from "yup"

function ShareForm( {onClose, calendar} ) {
    const [errors, setErrors] = useState([])
    const [sharedUsers, setSharedUsers] = useState([])

    useEffect(() => {
        fetch(`/share/${calendar.id}`)
        .then((response) => response.json())
        .then(setSharedUsers)
    }, [])

    const formSchema = yup.object().shape({
        username: yup.string().required("Must enter a username"),
    });

    const formik = useFormik({
        initialValues: { username: "" },
        validationSchema: formSchema,
        onSubmit: (values) => {
            fetch(`/share/${calendar.id}`, {
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
        <a id="share-container">
            <h2>Share {calendar.title}:</h2>
            <form onSubmit={ formik.handleSubmit }>
                <div>
                    <div>Enter username:</div>
                    <input
                    type="text"
                    id="username"
                    autoComplete="off"
                    value={ formik.values.username }
                    onChange={ formik.handleChange }
                    />
                </div>
            <div>
                <button type="submit">Share calendar</button>
                <button onClick={()=> onClose()}>cancel</button>
            </div>
            </form>
            Shared with: {sharedUsers.map((sharedUser) => (
                <div key={sharedUser}>{sharedUser}</div>
            ))}
        </a>
    )
}

export default ShareForm