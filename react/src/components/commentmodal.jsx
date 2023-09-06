
const CommentModal = ( {modal, handleSubmit, setModal}) => {
    
    if (modal) {
        return (

            <div id="myModal" className="modal">
                <div className="modal-content">
                    <span className="close" onClick={() => setModal(false)}>&times;</span>
                    <p>Are you sure you want to post this comment?</p>
                    <button onClick={() => handleSubmit()}>Yes</button><button onClick={() => setModal(false)}>No</button>
                </div>
            </div>
        )
    }
}

export default CommentModal