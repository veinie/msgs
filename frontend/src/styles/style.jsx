import { Link } from 'react-router-dom'
import styled from 'styled-components'

// const theme = {
//   baseBgGrey: '#3B3938',
//   slightlyLighterGrey: '#595756'
// }

export const Page = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  overflow-x: hidden;
  padding: 1vh;

`
  // background: linear-gradient(145deg, ${theme.baseBgGrey}, ${theme.slightlyLighterGrey});
export const NavBar = styled.div`
@media (max-width: 767px) {
}
`

export const MenuBtn = styled.div`
  display: block;
  padding: 2vh;
  margin-top: 2vh;
  text-decoration: none;
  cursor: pointer;
`

export const HorizontalFlexContainer = styled.div`
  display: flex;
  flex-direction: row;
`

export const VerticalFlexContainer = styled.div`
  display: flex;
  flex-direction: column;
`

export const VerticallyCentralizedContainer = styled.div`
  height: 100%;
  display: flex;
  align-items: center
`

export const HorizontallyCentralizedContainer = styled.div`
  width: 100%;
  display: flex;
  justify-content: center;
`

export const DesktopHorizontalMobileVertical = styled.div`
  height: 100%;
  display: flex;
  
  @media (max-width: 767px) {
    flex-direction: column;
  }
`

export const FormDiv = styled.div`
  margin: 1vh;
  padding: 1vh;
`

export const ChatPreviewLink = styled(Link)`
  display: inline-block;
  padding: 2vh;
  text-decoration: none;
  cursor: pointer;
`

export const ChatViewContainer = styled.div`
  width: 100%;
  padding: 4vh;
`

export const MessageListContainer = styled.div`
  overflow-y: auto;
  max-height: 60vh;
`

export const MessageContainer = styled.div`
  box-shadow: rgba(50, 50, 93, 0.25) 0px 2px 5px -1px, rgba(0, 0, 0, 0.3) 0px 1px 3px -1px;
`

export const NewMessageContainer = styled.div`

`

export const UserPreviewSelectable = styled.div`
  display: block;
  padding: 1vh;
  margin-top: 1vh;
  border: 1px solid grey;
  cursor: pointer;
`

export const DesktopNav = styled.div`
  @media (max-width: 767px) {
    display: none;
  }
`

export const MobileNav = styled.div`
  @media (max-width: 767px) {
    display: flex;
  }
`

export const NavToggler = styled.button`
  width: 100%;
  display: block;
  background-color: transparent;
  border: none;
  color: #fff;
  font-size: 1.5rem;
  cursor: pointer;
  transition: all 0.3s ease;

  &:hover {
    color: #bada55;
  }

  @media (min-width: 768px) {
    display: none;
  }
`

// #265bff
// #8b9cff
// #e3e2ff
// #e7943a
// #ffdab0


// Dark grey: #3B3938