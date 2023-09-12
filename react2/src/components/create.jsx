import { decode } from 'html-entities';
import { useState, useEffect } from 'react'
import { useNavigate, useParams } from 'react-router-dom';
import StyledLink from '../../../react/src/components/styled/styledlink';
import CommentEdit from './commentedit';
import MiniModal from './minimodal';
import Modal from './modal'
import Error from './error'

const Create = () => {
    const [title, setTitle] = useState('');
    const [message, setMessage] = useState("");
    const [publish, setPublish] = useState(true)
    const [url, setUrl] = useState('')
    const [date, setDate] = useState('')
    const [action, setAction] = useState('update')
    const [postDetail, setPostDetail] = useState([])
    const [modal, setModal] = useState(false)
    const [miniModal, setMiniModal] = useState(false)
    const [error, setError] = useState(false)
    const [comments, setComments] = useState([])
    const navigate = useNavigate();
    const [fetchError, setFetchError] = useState([])
    const token = localStorage.getItem('token')
    let ignore = false;
    let params = useParams();
    const divStyle = 
        {
            display: 'flex', flexDirection: 'column',
            alignItems: 'center', padding: '3em', gap: '2em'
        }

    const handleSubmit = async (e) => {
        e.preventDefault()
        let post = { title: title, message: message, visible: publish };
        try {
            let response = await fetch('http://localhost:3000/posts', 
            { method: 'POST', 
            headers: {'Content-Type': 'application/json', 'Authorization': 'Bearer ' + `${token}`},
            body: JSON.stringify(post)
            })
            if (!response.ok) {
                if (response.status === 400) {
                    throw await response.json()
                }
            }
            await response.json()
            if (response.status === 200) {
                setMiniModal(true)
                setFetchError([])
            }
        } catch (err) {
            setFetchError(err.errors)
        }
    }

    const handleEdit = (e) => {
        e.preventDefault()
        if (action === 'delete') {
            handleDelete()
        } else {
            handleUpdate()
        }
    }
    
    const handleUpdate = async (e) => {
        let post = {title: title, message: message, date: date, visible: publish}
        try {
            const response = await fetch(`http://localhost:3000/posts/${params.id}/update`, {
                method: 'POST', headers: {'Content-Type': 'application/json', 
            'Authorization': 'Bearer ' + `${token}`}, body: JSON.stringify(post)
            })
            if (!response.ok) {
                throw new Error (`${response.status}`)
            }
            const data = await response.json()
            if (response.status === 200) {
                setMiniModal(true)
            } 
        } catch (err) {
            console.error(err)
        }
    }
    
    const handleDelete = () => {
        setAction('delete')
        setModal(true)
    }

    const handleUnpublish = () => {
        setAction('update')
        setPublish(false)
    }

    const handlePublish = () => {
        setAction('update')
        setPublish(true)
    }

    useEffect(() => {
        if (params.id) {
            const fetchPost = async () => {
                try {
                    let response = await fetch (`http://localhost:3000/posts/${params.id}`, 
                    { headers: {'Authorization': 'Bearer ' + `${token}`}} );
                    let data = await response.json()
                    if (!response.ok) {
                        throw new Error (`${response.status}`)
                    }
                    if (response.status === 200 ){
                        setPostDetail([data.post_detail])
                        setTitle(decode(data.post_detail.title))
                        setMessage(decode(data.post_detail.message))
                        setPublish(data.post_detail.visible)
                        setDate(data.post_detail.date) 
                        setComments(data.comment_list)
                        console.log(comments)
                    }
                } catch (err) {
                    setError(true)
                    console.log(err)
                }
            }
            if (!ignore) {
                fetchPost()
            }
            return () => { ignore = true }
        }
    }, [])

    if (params.id && error) {
        return (
            <Error error={error} />
        )
    } else if (params.id) {
        return (
            <div style={divStyle}>
                <MiniModal params={params} setMiniModal={setMiniModal} miniModal={miniModal} />
                <Modal action={action} params={params} setModal={setModal} modal={modal} />
            <form onSubmit={handleEdit} style={{ display: 'flex', minWidth: '55vw', textAlign: 'center', 
            flexDirection: 'column', gap: '1em'} }>
                <h2>Edit a Post</h2>
                <label htmlFor="title">Title</label>
                <input type="text" placeholder="Title" name="title" value={title} onChange={(e) => setTitle(e.target.value)}></input>
                <label htmlFor="message">Post</label>
                <textarea rows='20' style={{resize: 'none'}} placeholder="Type your message here" name="message" 
                value={message} onChange={(e) => setMessage(e.target.value)}></textarea>
                    <div style={{display: 'flex', gap: '1em', justifyContent: 'center'}}>
                        <button type="submit" onClick={ publish ? () => handleUnpublish() : () => handlePublish()}>
                            {publish ? 'Unpublish' : 'Publish'}
                        </button>
                        <button type="submit" onClick={()=> setAction('update')}>Save Updates</button>
                        <button type="submit" onClick={()=> setAction('delete')}>Delete</button>
                    </div>
            </form>
            <CommentEdit params={params} postDetail={postDetail} comments={comments} url={url}/>
            <StyledLink to="/">
                <button>Go Back</button>
            </StyledLink>
        </div>    
        )
    } else {
    return (
        <div style={divStyle}>
            <MiniModal params={params} setMiniModal={setMiniModal} miniModal={miniModal} />
            <form onSubmit={handleSubmit} style={  { display: 'flex', minWidth: '55vw', textAlign: 'center', 
            flexDirection: 'column', gap: '1em'} }>
                <h2>Create a Post</h2>
                <label htmlFor="title">Title</label>
                <input type="text" placeholder="Title" name="title" value={title} onChange={(e) => setTitle(e.target.value)}></input>
                <label htmlFor="message">Post</label>
                <textarea rows='20' style={{resize: 'none'}} placeholder="Type your message here" name="message" 
                value={message} onChange={(e) => setMessage(e.target.value)}></textarea>
                    <div style={{display: 'flex', gap: '1em', justifyContent: 'center'}}>
                        <button type="submit" onClick={()=> setPublish(true)}>Publish</button>
                        <button type="submit" onClick={()=> setPublish(false)}>Save as Draft</button>
                    </div>
            </form>
            {fetchError.map(error => {
                return (
                    <div key={error.msg}>
                        **{error.msg}**
                    </div>
                )
            })
    }
            <StyledLink to="/">
                <button>Go Back</button>
            </StyledLink>
        </div>
    )
    }
}

export default Create