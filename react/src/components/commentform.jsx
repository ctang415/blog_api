import { useState } from "react";
import { useParams } from "react-router-dom";
import CommentModal from './commentmodal'

const CommentForm = () => {
    let params = useParams()
    const [author, setAuthor] = useState('Anonymous');
    const [message, setMessage] = useState('');
    const [ id, setId ] = useState(params.id)
    const [modal, setModal] = useState(false)
    const [ fetchError, setFetchError] = useState([])

    const confirmPost = (e) => {
        e.preventDefault()
        setModal(true)
    }

    const handleSubmit = async (e) => {
        let comment = {author: author, message: message, post: id}
        try {
            let response = await fetch(`http://localhost:3000/posts/${params.id}/comments`, {
                method: "POST",
                headers: {'Content-Type': 'application/json'},
                body: JSON.stringify(comment)
            })
            if (!response.ok) {
                if (response.status === 400) {
                    throw await response.json()
                }
            }
            await response.json()
            if (response.status === 200) {
                setTimeout(() => {
                    setFetchError([])
                    setModal(false)
                    window.location.reload()
                }, 500)
            }
        } catch(err) {
            setModal(false)
            setFetchError(err.errors)
            console.log(err)
        }
    }


    return (
        <>
        <CommentModal confirmPost={confirmPost} handleSubmit={handleSubmit} setModal={setModal} modal={modal}></CommentModal>
        <form
        style={{display: 'flex', gap: '1em', justifyContent: 'center', alignItems: 'center'}} onSubmit={confirmPost}>
            <label htmlFor="author">Name:</label>
            <input type='text' placeholder='Name (Optional)' value={author} name='author' onChange={(e) => setAuthor(e.target.value)}></input>
            <label htmlFor="Message">Message:</label>
            <textarea style={{resize: 'none'}} cols="40" rows="3" value={message} onChange={(e) => setMessage(e.target.value)}
            placeholder='Enter your message here' name='message'></textarea>
            <button type='submit'>Post</button>
        </form>
        {fetchError.map(error => {
            return (
                <div key={error.msg}>
                    **{error.msg}**
                </div>
            )
        })}
        </>
    )
}

export default CommentForm