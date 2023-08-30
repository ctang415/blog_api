import { useState } from 'react'
const Create = () => {
    const [title, setTitle] = useState('');
    const [message, setMessage] = useState("");
    const [publish, setPublish] = useState(true)
    const [url, setUrl] = useState('')
    const divStyle = 
        {
            display: 'flex', flexDirection: 'column',
            alignItems: 'center', padding: '3em',
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
        </div>
    )
}

export default Create