import { decode } from "html-entities";
import { useContext } from "react";
import { useState, useEffect } from "react"
import { Link } from "react-router-dom";
import StyledLink from "../../../react/src/components/styled/styledlink";
import { LoginContext } from "./logincontext";

const Home = ( ) => {
    const [posts, setPosts] = useState([])
    let ignore = false;
    const { login, token } = useContext(LoginContext)
    
    useEffect(() => {
        const fetchPosts = async () => {
            try {
                let response = await fetch ('http://localhost:3000/posts', {headers: 
                {'Content-Type': 'application/json', 'Authorization': 'Bearer ' + `${token}`}},
                {credentials: 'include'})
                if (!response.ok) {
                    throw new Error(`${response.status}`)
                }
                let data = await response.json()
                if(response.status === 200) {
                    setPosts(data.post_list)
                }
            } catch (err) {
                console.log(err)
            }
        }
        if (!ignore) {
            fetchPosts()
        }
        return () => { ignore = true}
    }, [])

    return (
        <div style={{ display: 'flex', gap: '1.5em', flexDirection: 'column', alignItems: 'center'}}>
            <h1>Manage your Posts</h1>
            <Link to={ login ? "/logout" : "/login"}>{login ? 'Log Out' : 'Log In'}</Link>
            <StyledLink to="/create">
                <button>ADD NEW POST</button>
            </StyledLink>
            <div style={{ display: 'flex', flexDirection: 'row', gap: '2em',
            flexWrap: 'wrap', maxWidth: '60vw'}}>
                {posts.map(post => {
                    return (
                        <StyledLink to={`/posts/${post._id}`} 
                        style={{display: 'flex', flexDirection: 'column', backgroundColor: 'white',
                        border: '1px solid black', borderRadius: '1em', minWidth: '15vw', overflow: 'hidden',
                        maxWidth: '15vw',
                        padding: '1em', alignItems: 'center'}} 
                        key={post._id}>
                            <p>{post.date_formatted}</p>
                            <h4>{decode(post.title)}</h4>
                        </StyledLink>
                    )
                })}
            </div>
        </div>
    )
}

export default Home