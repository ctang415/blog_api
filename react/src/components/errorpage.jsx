import { useNavigate } from "react-router-dom"

const ErrorPage = () => {
    const navigate = useNavigate()
    return (
        <div style={{ display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center'}}>
            <h2 style={{ textAlign: 'center'}}>Page not found</h2>
            <div>
                <button onClick={() => navigate('/')}>Go back</button>
            </div>
        </div>
    )
}

export default ErrorPage