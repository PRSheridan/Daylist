import { useState } from "react"
import LoginForm from "../components/LoginForm"
import SignupForm from "../components/SignupForm"

function Login({onLogin}) {
    const [showLogin, setShowLogin] = useState(true)

    return (
        <>
            <div className="header">
                <div className="title in-line">Daylist</div>
            </div>
            <div id="app-container">
                {showLogin ? ( <div>
                    <div className="login-container">
                        <LoginForm onLogin={onLogin} />
                        <p className="footer">No account? Create one here
                        <button className="button new" onClick={() => setShowLogin(false)}>
                            Signup
                        </button>
                        </p>
                    </div>
                </div> ) : ( <div>
                    <div className="login-container">
                        <SignupForm onLogin={onLogin} />
                        <p className="footer">Already have an account? Sign in here
                        <button className="button new" onClick={() => setShowLogin(true)}>
                            Login
                        </button>
                        </p>
                    </div> 
                    </div> )}
            </div>
        </>
    )
}

export default Login