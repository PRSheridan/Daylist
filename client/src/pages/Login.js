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
                    <p>No account? Create one here
                    <button onClick={() => setShowLogin(false)}>
                        Signup
                    </button>
                    </p>
                </>
            ) : (
                <>
                    <SignupForm onLogin={onLogin} />
                    <p>Already Have an Account? Sign in Here
                    <button onClick={() => setShowLogin(true)}>
                        Login
                    </button>
                    </p>
                </>
            )}
        </>
    )
}

export default Login