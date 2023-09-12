import { useNavigate } from "react-router-dom"

const Modal = ( { action, setModal, modal, params, id }) => {
let navigate = useNavigate()

    const confirmDelete = async () => {
        setModal(false)
        const token = localStorage.getItem('token')
        if (id) {
            try {
                let response = await fetch(`http://localhost:3000/posts/${params.id}/comments/${id}/delete`, {
                    method: 'POST', headers: {'Content-Type': 'application/json', 'Authorization': 'Bearer ' + `${token}`}
                })
                let data = await response.json()
                if (response.status === 200) {
                    setTimeout(() => window.location.reload(), 500)
                }
            } catch (err) {
                console.log(err)
            }         
        } else {
            try {
                let response = await fetch(`http://localhost:3000/posts/${params.id}/${action}`, {
                    method: 'POST', headers: {'Content-Type': 'application/json', 'Authorization': 'Bearer ' + `${token}` }
                })
                if (!response.ok) {
                    throw new Error(`${response.status}`)
                } 
                await response.json()
                if (response.status === 200) {
                    setTimeout(() => {
                        navigate('/')
                    }, 500)
                }
            } catch (err) {
                console.log(err)
            }
        }
    }

    if (modal) { 
        return (
            <div id="myModal" className="modal">
                <div className="modal-content">
                    <span className="close" onClick={() => setModal(false)}>&times;</span>
                    <p>Are you sure you want to delete this?</p>
                    <button onClick={() => confirmDelete()}>Yes</button><button onClick={() => setModal(false)}>No</button>
                </div>
            </div>
        )
    }
}

export default Modal