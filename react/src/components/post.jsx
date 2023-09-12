import { useState, useEffect } from 'react'
import { useParams } from 'react-router-dom'
import Comment from './comment'
import {decode} from 'html-entities';
import Error from '../../../react2/src/components/error';

const Post = () => {
    const [postDetail, setPostDetail] = useState([])
    const [ comments, setComments] = useState([])
    const [error, setError] = useState(false)
    let params = useParams()
    let ignore = false

    useEffect (() => {
        const fetchPost = async () => {
            try {
                let response = await fetch('http://localhost:3000/posts/'+ `${params.id}`) 
                let data = await response.json()
                if (response.status === 200 ) {
                    setPostDetail([data.post_detail])
                    setComments(data.comment_list)
                }
                if (response.status === 404) {
                    setError(true)
                }
            } catch(err) {
                console.log(err)
            }
        }
        if (!ignore) {
          fetchPost()
        }  
        return () =>  { ignore = true}
    }, [ignore])
    
    if (error) {
        return (
            <Error error={error}/>
        )
    } else {
    return (
        <div style={{display: 'flex', flexDirection: 'column', gap: '2em'}}>
            {postDetail.map(post => {
                return (
                    <div className='blog-post' key={post.url}>
                        <h2>{decode(post.title)}</h2>
                        <p>{decode(post.message)}</p>
                        <p>{post.date_formatted}</p>
                    </div>
                )
            })}
            <Comment comments={comments}/>
        </div>
    )
}
}
export default Post