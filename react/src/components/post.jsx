import { useState, useEffect } from 'react'
import { useParams } from 'react-router-dom'

const Post = () => {
    const [postDetail, setPostDetail] = useState([])
    let params = useParams()
    let ignore = false
    useEffect (() => {
        console.log(postDetail)
        const fetchPost = async () => {
            try {
                let response = await fetch('http://localhost:3000/posts/'+ `${params.id}`);
                let data = await response.json()
                setPostDetail([data.post_detail])
            } catch(err) {
                console.log(err.message)
            }
        }
        if (!ignore) {
          fetchPost()
        }  
        return () =>  { ignore = true}
    }, [])
    
    return (
        <div>
            {postDetail.map(post => {
                return (
                    <div>
                        {post.title}
                        {post.message}
                        {post.date_formatted}
                        {post.comments.length}
                    </div>
                )
            })}
        </div>
    )
}

export default Post