import {useState, useEffect} from 'react'
import Modal from './modal'

const CommentEdit = ( { params, postDetail}) => {
    const [comments, setComments ] = useState([])
    const [id, setId] = useState('')
    const [modal, setModal] = useState(false)
    let loading = true;

    const handleDelete = async (id) => {
        setId(id)
        setModal(true)
    }
    
    useEffect (() => {
        if (params.id) {
        const fetchComments = async () => {
            try {
                let response = await fetch(`http://localhost:3000` + postDetail[0].url)
                let data = await response.json()
                setComments(data.comment_list)
            } catch (err) {
                console.log(err)
            }
        }

        if (loading) {
          fetchComments()
        } 
    }
        return () =>  { loading = false}
   }, [postDetail]) 

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