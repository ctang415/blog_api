import { decode } from 'html-entities';
import { useState, useEffect } from 'react'
import { useParams } from 'react-router-dom';
import StyledLink from '../../../react/src/components/styled/styledlink';
import CommentEdit from './commentedit';

const Create = () => {
    const [title, setTitle] = useState('');
    const [message, setMessage] = useState("");
    const [publish, setPublish] = useState(true)
    const [url, setUrl] = useState('')
    const [date, setDate] = useState('')
    const [action, setAction] = useState('update')
    const [postDetail, setPostDetail] = useState([])
    let ignore = false;
    let params = useParams();
    const divStyle = 
        {
            display: 'flex', flexDirection: 'column',
            alignItems: 'center', padding: '3em', gap: '2em'
        }

    const handleSubmit = async (e) => {
        let post = { title: title, message: message, visible: publish };
        try {
            let response = await fetch('http://localhost:3000/posts', 
            { method: 'POST', 
            headers: {'Content-Type': 'application/json'},
            body: JSON.stringify(post)
            })
            if (!response.ok) {
                throw new Error(`${response.status}`)
            } 
            await response.json()
            setUrl(response.url)
        } catch (err) {
            console.log(err)
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
            let response = await fetch(`http://localhost:3000/posts/${params.id}/${action}`, {
                method: 'POST', headers: {'Content-Type': 'application/json'}, body: JSON.stringify(post)
            })
            if (!response.ok) {
                throw new Error(`${response.status}`)
            } 
            let data = await response.json()
        } catch (err) {
            console.log(err)
        }
    }
    
    const handleDelete = async (e) => {
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
                    let response = await fetch (`http://localhost:3000/posts/${params.id}`)
                    let data = await response.json()
                    setPostDetail([data.post_detail])
                    setTitle(decode(data.post_detail.title))
                    setMessage(decode(data.post_detail.message))
                    setPublish(data.post_detail.visible)
                    setDate(data.post_detail.date)
                } catch (err) {
                    console.log(err)
                }
            }
            if (!ignore) {
                fetchPost()
            }
            return () => { ignore = true }
        }
    }, [])

    if (params.id) {
        return (
            <div style={divStyle}>
            <form action={`http://localhost:5173/posts/${params.id}/${action}`} onSubmit={handleEdit} style={{ display: 'flex', minWidth: '55vw', textAlign: 'center', 
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
            <CommentEdit params={params} postDetail={postDetail}/>
            <StyledLink to="/">
                <button>Go Back</button>
            </StyledLink>
        </div>    
        )
    } else {
    return (
        <div style={divStyle}>
            <form action={`http://localhost:5173${url}`} onSubmit={handleSubmit} style={  { display: 'flex', minWidth: '55vw', textAlign: 'center', 
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
            <StyledLink to="/">
                <button>Go Back</button>
            </StyledLink>
        </div>
    )
    }
}

export default Create