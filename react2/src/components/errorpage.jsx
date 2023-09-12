import { useNavigate } from "react-router-dom"

const ErrorPage = () => {
    const navigate = useNavigate();
    
    return (
        <div style={{display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
            <h2>Page does not exist</h2>
            <div>
                <button onClick={() => navigate('/')}>Go back</button>
            </div>
        </div>
    )
}

export default ErrorPage