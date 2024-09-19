import React, { useState } from "react"
import { useNavigate } from "react-router-dom";
import { useFormik } from "formik"
import * as yup from "yup"

function SignupForm({ onLogin }) {

    const navigate = useNavigate()
    const [errors, setErrors] = useState([])
    const [isLoading, setIsLoading] = useState(false)

    const formSchema = yup.object().shape({
        username: yup.string().required("Must enter username"),
        password: yup.string().required("Must enter a password"),
        password: yup.string().required("Passwords must match"),
      });

    const formik = useFormik({
        initialValues: { username: "", password: "", passwordConfirm: "", },
        validationSchema: formSchema,
        onSubmit: (values) => {
          setIsLoading(true);
          fetch("/signup", {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify(values, null, 2),
          }).then(
            (response) => {
              setIsLoading(false);
              if (response.ok) { 
                navigate("/CalendarList")
                response.json().then((user) => onLogin(user)) 
              } else {
                response.json().then((err) => setErrors(err.errors));
          }})
        },
      })

    return (
        <form onSubmit={ formik.handleSubmit }>
            <div className="header">Signup</div>
            <div id="login-container">
            <div>
                <div className="login">Username</div>
                <input
                type="text"
                id="username"
                autoComplete="off"
                value={ formik.values.username }
                onChange={ formik.handleChange }
                />
                <a style={{ color: "red" }}> {formik.errors.username}</a>
            </div>
            <div>
                <div className="login">Password</div>
                <input
                type="password"
                id="password"
                autoComplete="off"
                value={ formik.values.password }
                onChange={ formik.handleChange }
                />
                <a style={{ color: "red" }}> {formik.errors.password}</a>
            </div>
            <div>
                <div className="login">Confirm password</div>
                <input
                type="password"
                id="passwordConfirm"
                autoComplete="off"
                value={ formik.values.passwordConfirm }
                onChange={ formik.handleChange }
                />
                <a style={{ color: "red" }}> {formik.errors.password}</a>
            </div>
                <div>
                    <button className="login-button" type="submit">{ isLoading ? "Loading..." : "Create account" }</button>
                </div>
            </div>            
        </form>
    )
}

export default SignupForm