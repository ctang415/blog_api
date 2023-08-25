import styled from 'styled-components'
import StyledButton from './styled/styledbutton'
import StyledLink from './styled/styledlink'

const StyledDiv = styled.div`
    background-color: #faf0e6;
    padding: 4em 10em;
    min-height: 25vh;
    min-width: 55vw;
    align-items: center;
    border-radius: 1em;
    display: flex;
    flex-direction: column;
    gap: 2em;
    box-shadow: 6px 6px 5px 3px rgba(202,182,157, 0.4);
`
const StyledTextDiv = styled.div`
    font-size: 1.25em;
    max-width: 35vw;
`
const Home = () => {

    return (
        <StyledDiv>
            <h1>Pockets of NYC</h1>
            <StyledTextDiv>
                Content creator based out of New York.
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