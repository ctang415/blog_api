const Login = () => {
    return (
        <form style={{display: 'flex', flexDirection: 'column', alignItems: 'center', padding: '1em', gap: '1em'}}>
            <h2>Login</h2>
            <label htmlFor="username">Username:</label>
            <input type="text" name='username' />
            <label htmlFor="password">Password:</label>
            <input type="text"name='password' />
            <div>
                <button type='submit'>Submit</button>
            </div>
        </form>
    )
}

export default Login