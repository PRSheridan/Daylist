

function LoginForm({ onLogin }) {
    const [username, setUsername] = useState("")
    const [password, setPassword] = useState("")
    const [errors, setErrors] = useState([])
    const [isLoading, setIsLoading] = useState(false)

    function handleSubmit(event) {
        event.preventDefault()
        setIsLoading(true)
        fetch('/login', {
            //finish this please
        })
    }
}

export default LoginForm