import { useState } from "react"
import LoginForm from "../components/LoginForm"
import SignupForm from "../components/SignupForm"

function Login({onLogin}) {
    const [showLogin, setShowLogin] = useState(true)

    return (
        <>
            {showLogin ? (
                <>
                    <LoginForm onLogin={onLogin} />
                    <p className="footer">No account? Create one here
                    <button className="login-button" onClick={() => setShowLogin(false)}>
                        Signup
                    </button>
                    </p>
                </>
            ) : (
                <>
                    <SignupForm onLogin={onLogin} />
                    <p className="footer">Already have an account? Sign in here
                    <button className="login-button" onClick={() => setShowLogin(true)}>
                        Login
                    </button>
                    </p>
                </>
            )}
        </>
    )
}

export default Login