import styled from 'styled-components'
import StyledButton from './styled/styledbutton'
import StyledLink from './styled/styledlink'
import StyledDiv from './styled/styleddiv'

const StyledTextDiv = styled.div`
    font-size: 1.25em;
    max-width: 35vw;
    text-align: center;
`

const Home = () => {

    return (
        <StyledDiv>
            <h2>Pockets of NYC</h2>
            <StyledTextDiv>
                Content creator based out of New York who loves to eat and explore different neighborhoods.
                Come see the city through my lens.
            </StyledTextDiv>
            <div>
                <StyledLink to='/blog'>
                    <StyledButton>Enter</StyledButton>
                </StyledLink>
            </div>
        </StyledDiv>
    )
}

export default Home