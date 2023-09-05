import { useEffect } from "react"

const MiniModal = ( { setMiniModal, miniModal, params }) => {
    
    useEffect(() => {
        if (miniModal) {
            setTimeout(() => {
                setMiniModal(false)
            }, 1500)
        }
    }, [miniModal]) 

    if (miniModal) { 
        return (
            <div id="myModal" className="modal">
                <div className="modal-content">
                    <p>{params.id ? 'Changes saved!' : 'Post created!'}</p>
                    </div>
            </div>
        )
    }
}

export default MiniModal