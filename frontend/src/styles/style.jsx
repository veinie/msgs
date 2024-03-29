import { Link } from 'react-router-dom'
import styled from 'styled-components'

const theme = {
  baseBgLight: "#e3e2ff"
}

export const Page = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  overflow-x: hidden;
  padding: 1vh;
  background-color: ${theme.baseBgLight};
`

export const HorizontalFlexContainer = styled.div`
  display: flex;
  flex-direction: row;
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

export const FormDiv = styled.div`
  background-color: white;
  margin: 1vh;
  padding: 1vh;
`

export const ChatPreviewLink = styled(Link)`
  display: inline-block;
  padding: 2vh;
  text-decoration: none;
  background-color: white;
  border: 1px solid #8b9cff;
  cursor: pointer;
`

export const ChatViewContainer = styled.div`
  max-height: 80%;
  padding: 4vh;
  background-color: white;
  border: 1px solid #8b9cff;
`

export const MessageListContainer = styled.div`
  overflow: auto;
  max-height: 60%;
`

export const MessageContainer = styled.div`
  box-shadow: rgba(50, 50, 93, 0.25) 0px 2px 5px -1px, rgba(0, 0, 0, 0.3) 0px 1px 3px -1px;
`

export const NewMessageContainer = styled.div`
  border: 1px solid #8b9cff;
`

// #265bff
// #8b9cff
// #e3e2ff
// #e7943a
// #ffdab0
