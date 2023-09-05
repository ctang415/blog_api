import StyledLink from "../../../react/src/components/styled/styledlink"

const Error = ( {setError, error}) => {
    
    if (error) {
        return (
            <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', marginTop: '10vh'}}>
                <h3>Post does not exist.</h3>
                <StyledLink to="/">
                    <button>Go back</button>
                </StyledLink>
            </div>
        )
    }
}

export default Error