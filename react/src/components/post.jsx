import { useState, useEffect } from 'react'
import { useParams } from 'react-router-dom'
import Comment from './comment'
import {decode} from 'html-entities';

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
                console.log(postDetail[0])
            } catch(err) {
                console.log(err)
            }
        }
        if (!ignore) {
          fetchPost()
        }  
        return () =>  { ignore = true}
    }, [])
    
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
            <Comment postDetail={postDetail}/>
        </div>
    )
}

export default Post