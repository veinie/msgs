/* eslint-disable react/prop-types */
import { useState, useEffect, useContext } from 'react'
import { UserContext } from '../contexts/UserContext'
import { ChatsContext } from '../contexts/ChatsContext'
import LandingPage from './LangingPage'
import Menubar from './Menubar'
import UserProfile from './UserProfile'
import ChatRequests from './chat/ChatRequests'
import ChatView from './chat/ChatView'
import { DesktopHorizontalMobileVertical } from '../styles/style'

const Msgs = ({ theme, themeToggler }) => {
  const { authenticated } = useContext(UserContext)
  const { chats } = useContext(ChatsContext)
  const [ visibleElement, setVisibleElement ] = useState(
    isNaN(localStorage.getItem('current-page'))
      ? -1
      : Number(localStorage.getItem('current-page'))
  )

  useEffect(() => {
    const currentPage = localStorage.getItem('current-page')
    if (currentPage && !isNaN) setVisibleElement(Number(currentPage))
  }, [])

  useEffect(() => {
    if (visibleElement !== 0) {
      localStorage.setItem('current-page', visibleElement.toString())
    }
  }, [visibleElement])

  if (!authenticated) {
    return (
      <LandingPage />
    )
  }

  if (!chats) return <div>loading</div>

  return (
    <>
      <DesktopHorizontalMobileVertical>
        <Menubar visibleElement={ visibleElement } setVisibleElement={ setVisibleElement } style={{ height: '100VH' }} />
        <UserProfile isVisible={ visibleElement === -1 } visibleElement={ visibleElement } theme={theme} toggleTheme={ themeToggler } />
        <ChatRequests isVisible={ visibleElement === -2 } visibleElement={ visibleElement } setVisibleElement={setVisibleElement}/>
        { chats && chats.map(chat => <ChatView chat={ chat } key={ chat.id } id={ chat.id } visibleElement={ visibleElement } />) }
      </DesktopHorizontalMobileVertical>
    </>
  )
}

export default Msgs
