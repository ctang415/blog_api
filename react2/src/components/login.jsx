import { useContext } from 'react'
import { useState, useEffect } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import { LoginContext } from './logincontext'

const Login = () => {
    const [ username, setUsername ] = useState('')
    const [ password, setPassword] = useState('')
    const [ error, setError ] = useState('')
    const navigate = useNavigate();
    const params = useParams()
    const { logOut } = useContext(LoginContext)    
    let ignore = false;
    
    const handleSubmit = async (e) => {
        e.preventDefault()
        const login = { username: username, password: password }
        try {
            const response = await fetch('http://localhost:3000' + '/login', {
            method: 'POST', headers: {'Content-Type': 'application/json', 'Accept': 'application/json',
            }, 
            credentials: 'include', body: JSON.stringify(login) 
        })
        if (!response.ok) {
            if (response.status === 404) {
                throw await response.json()
            } 
        }
        let data = await response.json()
        if (response.status === 200) {
            localStorage.setItem('token', data.accessToken)
            setTimeout(() => {
                navigate('/')
            }, 750)
        }
        } catch (err) {
            setError(err.error)
            console.log(err)
        }
    }

    useEffect(() => {
        if (window.location.pathname === '/logout') {
            if (!ignore) {
                logOut() 
            }
        return () => { ignore = true}
        }
    }, [])

    return (
        <form onSubmit={handleSubmit} style={{display: 'flex', flexDirection: 'column', alignItems: 'center', padding: '1em', gap: '1em'}}>
            <h2>Login</h2>
            <label htmlFor="username">Username:</label>
            <input type="text" name='username' onChange={(e) => setUsername(e.target.value)} required/>
            <label htmlFor="password">Password:</label>
            <input type="password" name='password' onChange={(e) => setPassword(e.target.value)} required />
            <div>{ !error ? '' : `**${error}**`}</div>
            <div>
                <button type='submit'>Submit</button>
            </div>
        </form>
    )
}

export default Login