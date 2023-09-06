import CommentForm from './commentform'

const Comment = ( {postDetail, comments} ) => {
     let loading = true;

    return (
        <div className="comment">
            <CommentForm/>
            <h4>Comments ({comments.length})</h4> 
            {comments.map(comment => {
                return (
                    <div key={comment._id} style={{display: 'flex', flexDirection: 'column', justifyContent: 'center',
                    minWidth: '55vw', maxWidth: '55vw', borderTop: '1px solid grey', borderBottom: '1px solid grey',
                    backgroundColor: 'white', padding: '1em'}}>
                        <p>{comment.author} posted on {comment.date_formatted}</p>
                        <p>{comment.message}</p>
                    </div>
                )
            })}
        </div>
    )
}

export default Comment