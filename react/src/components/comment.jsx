import CommentForm from './commentform'
import { useState, useEffect } from 'react'

const Comment = ( {postDetail} ) => {
   const [comments, setComments ] = useState([]);
   let ignore = false

   useEffect (() => {
        const fetchComments = async () => {
            console.log(postDetail[0].url)  
            try {
                let response = await fetch(`http://localhost:3000` + postDetail[0].url + '/comments')
                let data = await response.json()
                setComments(data.comment_list)
            } catch (err) {
                console.log(err)
            }
        }
        if (!ignore) {
          fetchComments()
        } 
        return () =>  { ignore = true}
   }, []) 

    return (
        <div className="comment">
            <CommentForm/>
            <h4>Comments</h4>
            {comments.map(comment => {
                return (
                    <div style={{display: 'flex', flexDirection: 'column', justifyContent: 'center',
                    minWidth: '55vw', maxWidth: '55vw', borderTop: '1px solid grey', borderBottom: '1px solid grey'}}>
                        <p>{comment.author} posted on {comment.date_formatted}</p>
                        <p>{comment.message}</p>
                    </div>
                )
            })}
        </div>
    )
}

export default Comment