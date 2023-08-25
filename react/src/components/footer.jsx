import TiktokIcon from '../assets/tiktok/tiktok.png'
import FacebookIcon from '../assets/facebook/fb-58.png'
import InstagramIcon from '../assets/instagram/ig-gradient.png'
import TwitterIcon from '../assets/twitter/twitter.png'
import styled from 'styled-components'
import StyledUl from  './styled/styledul'
import StyledNav from './styled/stylednav'

const StyledImage = styled.img`
    max-height: 4vh;
    cursor: pointer;
    
    &:hover {
        transform: scale(1.2)
    }
`
const StyledNavFooter = styled(StyledNav)`
    bottom: 0;
    border-top: 1px solid black;
    width: 100%;

`

const StyledUlFooter = styled(StyledUl)`
    gap: 2em;
`

const Footer = () => {
    const socials = [ { name: 'Instagram', icon: InstagramIcon}, 
    {name: 'TikTok', icon: TiktokIcon} , {name: 'Facebook', icon: FacebookIcon}, {name: 'Twitter', icon: TwitterIcon}]
    
    return (
        <StyledNavFooter>
            <StyledUlFooter>
                {socials.map(social => {
                    return (
                        <li key={social.name}>
                            <StyledImage src={social.icon} alt={social.name} />
                        </li>
                    )
                })}
            </StyledUlFooter>
        </StyledNavFooter>    
    )
}

export default Footer