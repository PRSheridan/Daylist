import React, { useEffect, useState } from "react";
import { useFormik } from "formik"
import * as yup from "yup"

function ShareForm( {onClose, calendar} ) {
    const [sharedUsers, setSharedUsers] = useState([])
    const [update, setUpdate] = useState(false)

    useEffect(() => {
        fetch(`/share/${calendar.id}`)
        .then((response) => response.json())
        .then(setSharedUsers)
        setUpdate(false)
    }, [update])

    const formSchema = yup.object().shape({
        username: yup.string().required("Must enter a username"),
        permission: yup.string().required("Must select a permission level")
    });

    const formik = useFormik({
        initialValues: { username: "", permission: "read-only" },
        validationSchema: formSchema,
        onSubmit: (values) => {
            fetch(`/share/${calendar.id}`, {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(values, null, 1),
            }).then((response) => { if (response.ok) { onClose() }
            })
        },
    })

    return (
        <div id="share-container">
            <form className="shared-form in-line" onSubmit={ formik.handleSubmit }>
                <div>
                    <div>Share with (Enter username):</div>
                    <div className="error">{formik.errors.username}</div>
                    <input
                    type="text"
                    id="username"
                    autoComplete="off"
                    value={ formik.values.username }
                    onChange={ formik.handleChange }
                    />
                </div>
                <div>
                    <div className="error">{formik.errors.permission}</div>
                    <select
                    type="text"
                    id="permission"
                    autoComplete="off"
                    value={ formik.values.permission }
                    onChange={ formik.handleChange }>
                          <option value="read-only">read-only</option>
                          <option value="owner">owner</option>
                    </select>
                </div>
                <div>
                    <button className="button edit" type="submit">Share calendar</button>
                    <button className="button delete" onClick={()=> onClose()}>cancel</button>
                </div>
            </form>
            <div className="shared-users in-line">Shared with: {sharedUsers.map(
                (sharedUser) => ( <div key={sharedUser}>{sharedUser}</div> ))}
            </div>
        </div>
    )
}

export default ShareForm