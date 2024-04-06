import { Link } from 'react-router-dom'
import styled from 'styled-components'

// const theme = {
//   baseBgGrey: '#3B3938',
//   slightlyLighterGrey: '#595756'
// }

export const Page = styled.div`
  margin: 0;
  padding: 0;
  position: absolute;
  top: 0;
  left: 0;
  width: 100VW;
  height: 100VH;

`
  // background: linear-gradient(145deg, ${theme.baseBgGrey}, ${theme.slightlyLighterGrey});
export const NavBar = styled.div`
@media (max-width: 767px) {
}
`

export const ChatsList = styled.div`
  display: flex;
  flex-direction: column;
  overflow-y: auto;
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
  margin: 0;
  padding: 0;
  
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
  box-sizing: border-box;
  width: 80VW;
  height: 100VH;
  padding: 4vh;

  @media (max-width: 767px) {
    width: 100VW;
    height: 100VH;
    padding: 1em;
  }
`

export const MessageListContainer = styled.div`
  height: 80%;
  overflow-y: auto;

`

export const MessageContainer = styled.div`
  box-sizing: border-box;
  padding: 10px;
`

export const NewMessageContainer = styled.div`
  width: 100%;
  height: 10%;
`

export const UserPreviewSelectable = styled.div`
  display: block;
  padding: 1vh;
  margin-top: 1vh;
  border: 1px solid grey;
  cursor: pointer;
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

export const InputDiv = styled.div`
  padding: 5px;
  color: black;
  background-color: white;
  display: inline-block;
  height: 10VH;
  width: 80%;
  overflow-y: auto;
  border: 1px solid grey;
  border-radius: 1px;
`

export const SendButton = styled.button`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 19%;
  height: 10VH;
  margin-left: 10px;
  margin-right: 20px;
  border-radius: 5px;
  border: 1px solid light-grey;
  box-shadow: rgba(50, 50, 93, 0.25) 0px 50px 100px -20px, rgba(0, 0, 0, 0.3) 0px 30px 60px -30px;
`

export const DisabledSendButton = styled(SendButton)`
  background-color: grey;
  disabled;
`

// #265bff
// #8b9cff
// #e3e2ff
// #e7943a
// #ffdab0


// Dark grey: #3B3938