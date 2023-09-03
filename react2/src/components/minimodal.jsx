import { useEffect } from "react"

const MiniModal = ( { setMiniModal, miniModal }) => {
    
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
                    <p>Changes saved!</p>
                    </div>
            </div>
        )
    }
}

export default MiniModal