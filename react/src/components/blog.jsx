import { decode } from 'html-entities'
import { useState,  useEffect } from 'react'
import StyledLink from './styled/styledlink'

const Blog = () => {
    const [ post, setPost] = useState([])
    let ignore = false;

    useEffect(() => {
        const callApi = async () => {
            try {
                const response = await fetch('http://localhost:3000/posts')
                let data = await response.json()
                setPost(data.post_list)
                console.log(data.post_list)
            } catch (err) {
                console.log(err.message)
            }
        } 
    if (!ignore) {
      callApi()
    }
    return () =>  { ignore = true}
    }, [] )


    return (
        <div style={{ display: 'flex', flexDirection: 'column', gap: '2em'}}>
            {post.filter(item => item.visible === true).map(item => { 
                return (
                    <StyledLink key={item._id} to={`${item.url}`}>
                    <div className="blog-post">
                        <p>{item.date_formatted}</p>
                        <h2>{decode(item.title)}</h2>
                        <p>{decode(item.message)}</p>
                    </div>
                    </StyledLink>
                )
            })}
        </div>
    )
}

export default Blog