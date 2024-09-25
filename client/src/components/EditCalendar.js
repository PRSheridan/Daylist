import React from "react";
import { useFormik } from "formik"
import * as yup from "yup"

function EditForm( {onClose, calendar} ) {
    const formSchema = yup.object().shape({
        title: yup.string().required("Must enter a new title"),
    });

    const formik = useFormik({
        initialValues: { title: calendar.title },
        validationSchema: formSchema,
        onSubmit: (values) => {
            fetch(`/calendar/${calendar.id}`, {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(values, null, 1),
            }).then((response) => {if(response.ok){ onClose() }})
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
                <button className="button edit" type="submit">Change title</button>
                <button className="button delete" onClick={()=> onClose()}>cancel</button>
            </div>
            </form>
        </div>
    )
}

export default EditForm