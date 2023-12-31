import StyledUl from './styled/styledul'
import StyledLink from './styled/styledlink'
import StyledNav from './styled/stylednav'
import styled from 'styled-components'

const StyledHeaderNav = styled(StyledNav)`
    top: 0;
    width: 100%;
    text-align: center;
    border-bottom: 1px solid black;
    position: absolute;
`
const StyledHeader = styled.h1`
    font-size: 2.5em;
    margin: 0;
    padding: 0.1em;
`

const StyledHeaderLink = styled(StyledLink)`
    font-weight: bold;
    &:hover {
        color: brown;
        transition: all .2s ease-in-out;
    }
`

const Nav = () => {
    const links = [ {name: 'HOME', route: '/'}, {name: 'BLOG', route: "/blog"}, {name: 'CONTACT', route: "/contact"} ]
    return (
        <StyledHeaderNav>
            <StyledHeader>POCKETS OF NYC</StyledHeader>
                <StyledUl>
                    {links.map(link => {
                        return (
                            <li key={link.name}>
                                <StyledHeaderLink to={link.route}>{link.name}</StyledHeaderLink>
                            </li>
                        )
                    })}
            </StyledUl>
        </StyledHeaderNav>
    )
}

export default Nav