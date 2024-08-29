import { useState } from "react"

function SignupForm({ onLogin }) {
    const [username, setUsername] = useState("")
    const [password, setPassword] = useState("")
    const [passwordConfirm, setPasswordConfirm] = useState("")
    const [errors, setErrors] = useState([])
    const [isLoading, setIsLoading] = useState(false)

    function handleSubmit(event) {
        event.preventDefault()
        setIsLoading(true)
        fetch('/login', {
            method: 'POST',
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({ username, password, passwordConfirm}),
        }).then((response) => {
            setIsLoading(false);
            if (response.ok) {
                response.json()
                .then((user) => onLogin(user));
            } else {
                response.json().then((err) => setErrors(err.errors));
            }
        })
    }

    return (
        <form onSubmit={ handleSubmit }>
            <div>Signup</div>
            <div>
                <div>Username</div>
                <input
                type="text"
                id="username"
                autoComplete="off"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                />
            </div>
            <div>
                <div>Password</div>
                <input
                type="password"
                id="password"
                autoComplete="off"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                />
            </div>
            <div>
                <div>Password Confirmation</div>
                <input
                type="password"
                id="passwordConfirm"
                autoComplete="off"
                value={passwordConfirm}
                onChange={(e) => setPasswordConfirm(e.target.value)}
                />
            </div>
            <div>
                <button type="submit">{ isLoading ? "Loading..." : "Login" }</button>
            </div>
            <div>
                {errors.map((err) => (
                 <div key={err}>{err}</div>
                ))}
            </div>
        </form>
    )
}

export default SignupForm