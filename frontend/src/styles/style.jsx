import { Link } from 'react-router-dom'
import styled from 'styled-components'

export const Page = styled.div`
  margin: 0;
  padding: 0;
  position: absolute;
  top: 0;
  left: 0;
  width: 100VW;
  height: 100VH;
`

export const NavBar = styled.div`
  @media (max-width: 767px) {
    overflow-y: auto;
  }
`

export const Scrollable = styled.div`
  overflow-y: auto;
`

export const ChatsList = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;

  @media (min-width: 767px) {
  overflow-y: auto;
  }
`

export const MenuContainer = styled.div`
  box-sizing: border-box;

  @media (min-width: 767px) {
    width: 20%;
  }
`

export const MenuBtn = styled.div`
  display: block;
  padding: 10px;
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
  box-sizing: border-box;
  padding: 2vh;
  text-decoration: none;
  cursor: pointer;
  width: 100%;

  i {
    color: grey;
  }
`

export const ChatViewContainer = styled.div`
  display: flex;
  flex-direction: column;
  box-sizing: border-box;
  width: 100%;
  height: 100VH;
  padding: 4vh;

  @media (max-width: 767px) {
    padding: 1em;
  }
  @media (min-width: 767px) {
    width: 80VW;
  }
`

export const MessageListContainer = styled.div`
  overflow-y: auto;
  padding: 10px;
  margin-bottom: 10px;

  @media (max-width: 767px) {
    padding: 0;
    margin: 0;
  }
`

export const MessageContainer = styled.div`
  border-radius: 20px;
  box-sizing: border-box;
  padding: 10px;
  margin-bottom: 10px;

  @media (max-width: 767px) {
    margin-bottom: 5px;
  }
`

export const NewMessageContainer = styled.div`
  margin-top: auto;
  width: 100%;
  padding-left: 10px;

  @media (max-width: 767px) {
    padding: 0;
  }
`

export const UserPreviewSelectable = styled.div`
  display: block;
  padding: 1vh;
  margin-top: 1vh;
  border: 1px solid grey;
  cursor: pointer;
`

export const NavTogglerPlaceholder = styled.div`
  widht: 100%;
  height: 60px;

  @media (min-width: 768px) {
    display: none;
  }
`

export const NavToggler = styled.button`
  position: -webkit-fixed; 
  position: fixed;
  top: 0;
  width: 100%;
  display: block;
  padding: 10px;
  background-color: transparent;
  border: none;
  color: #fff;
  font-size: 1.5rem;
  cursor: pointer;
  transition: all 0.3s ease;
  z-index: 999;

  &:hover {
    color: #bada55;
  }

  @media (min-width: 768px) {
    display: none;
  }
`

export const InputDiv = styled.div`
  padding: 10px;
  color: black;
  background-color: white;
  display: inline-block;
  height: 80px;
  width: 80%;
  overflow-y: auto;
  border: 1px solid grey;
  border-radius: 10px;
  box-sizing: border-box;

  @media (max-width: 768px) {
    padding: 5px;
  }
`

export const Button = styled.button`
  padding: 20px;
  text-align: center;
  border-radius: 10px;
  font-size: 15px;
  cursor: pointer;
  border: 1px solid #cccccc;
  box-shadow: rgba(0, 0, 0, 0.1) -4px 9px 25px -6px;
`

export const SendButton = styled(Button)`
  width: 20%;
  height: 80px;
  margin: 0 5px 0 5px;
  border: none;

  @media (max-width: 767px) {
    width: 100px;
  }
`

export const DisabledSendButton = styled(SendButton)`
  cursor: not-allowed;
`
