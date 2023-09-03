const Modal = ( { action, setModal, modal, params, id }) => {
    
    const confirmDelete = async () => {
        setModal(false)
        if (id) {
        try {
            let response = await fetch(`http://localhost:3000/posts/${params.id}/comments/${id}/delete`, {
                method: 'POST'
            })
            if (!response.ok) {
                return response.status
            }
            await response.json()
        } catch (err) {
            console.log(err)
        } 
    } else {
            try {
                let response = await fetch(`http://localhost:3000/posts/${params.id}/${action}`, {
                    method: 'POST', redirect: "follow", headers: {'Content-Type': 'application/json'}
                })
                if (!response.ok) {
                    throw new Error(`${response.status}`)
                } 
                await response.json()
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