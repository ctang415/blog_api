import {useState, useEffect} from 'react'

const CommentEdit = ( { params, postDetail}) => {
    const [comments, setComments ] = useState([])
    const [id, setId] = useState('')
    let loading = true;

    const handleDelete = async () => {
        try {
            let response = await fetch(`http://localhost:3000/posts/${params.id}/${id}/delete`)
            await response.json()
        } catch (err) {
            console.log(err)
        }
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
        comments.map(comment => {
            return (
                <div key={comment._id} style={{display: 'flex', flexDirection: 'column', minWidth:'55vw', maxWidth: '55vw',
                alignItems: 'center', justifyContent: 'center', border: '1px solid grey', padding: '1em', backgroundColor:'white'}}>
                    <p>{comment.author} posted on {comment.date_formatted}</p>
                    <p>{comment.message}</p>
                    <button onClick={() => console.log(params.id)}>Delete this comment</button>
                </div>
            )
        })
    )
}

export default CommentEdit