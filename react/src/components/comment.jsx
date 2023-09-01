import CommentForm from './commentform'
import { useState, useEffect } from 'react'

const Comment = ( {postDetail} ) => {
   const [comments, setComments ] = useState([]);
   let loading = true;

   useEffect (() => {
        const fetchComments = async () => {
            try {
                let response = await fetch(`http://localhost:3000` + postDetail[0].url + '/comments')
                let data = await response.json()
                setComments(data.comment_list)
            } catch (err) {
                console.log(err)
            }
        }
        if (loading) {
          fetchComments()
        } 
        return () =>  { loading = false}
   }, [postDetail]) 

    return (
        <div className="comment">
            <CommentForm/>
            <h4>Comments</h4>
            {comments.map(comment => {
                return (
                    <div key={comment._id} style={{display: 'flex', flexDirection: 'column', justifyContent: 'center',
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