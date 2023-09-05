import {useState, useEffect} from 'react'
import Modal from './modal'

const CommentEdit = ( { ignore, params, postDetail, comments }) => {
    const [id, setId] = useState('')
    const [modal, setModal] = useState(false)
    let loading = true;

    const handleDelete = async (id) => {
        setId(id)
        setModal(true)
    }
        return (
            <>
            <Modal setModal={setModal} modal={modal} id={id} params={params} />
            {comments.map(comment => {
                return (
                <div key={comment._id} style={{display: 'flex', flexDirection: 'column', minWidth:'55vw', maxWidth: '55vw',
                alignItems: 'center', justifyContent: 'center', border: '1px solid grey', padding: '1em', backgroundColor:'white'}}>
                    <p>{comment.author} posted on {comment.date_formatted}</p>
                    <p>{comment.message}</p>
                    <button onClick={() => handleDelete(comment._id)}>Delete this comment</button>
                </div>
            )
        })}
        </>
    )
}

export default CommentEdit