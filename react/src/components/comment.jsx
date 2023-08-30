import CommentForm from './commentform'
const Comment = ( {postDetail} ) => {
   
    return (
        <div className="blog-post">
            <CommentForm/>
            <h4>Comments</h4>
            <p>{postDetail.comments}</p>
        </div>
    )
}

export default Comment