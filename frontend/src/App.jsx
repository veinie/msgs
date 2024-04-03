import { useState, useContext, useEffect } from 'react'
import {
  Routes,
  Route,
  // Navigate,
  // useMatch
} from 'react-router-dom'
import { useQuery } from '@apollo/client'
import LandingPage from './components/LangingPage'
import Menubar from './components/Menubar'
import ChatView from './components/chat/ChatView'
import ChatPreview from './components/chat/ChatPreview'
import AccountConfirmed from './components/userauth/AccountConfirmed'
import { Page, DesktopHorizontalMobileVertical } from './styles/style'
import { UserContext } from './contexts/UserContext'
import { USER_CHATS, CHAT_REQUESTS } from './gql/queries'
import { ThemeProvider } from 'styled-components'
import { GlobalStyles } from './styles/globalStyles'
import { lightTheme, darkTheme } from './styles/theme'
import { useDarkMode } from './hooks/useDarkMode'
import UserProfile from './components/UserProfile'
import ChatRequests from './components/chat/ChatRequests'


function App() {
  const { authenticated, setLogout } = useContext(UserContext)
  const [ chats, setChats ] = useState([])
  const [ chatRequests, setChatRequests ] = useState([])
  const [ visibleElement, setVisibleElement ] = useState(-1)
  const chatsQuery = useQuery( USER_CHATS, {
    fetchPolicy: 'network-only'
  })
  const chatRequestsQuery = useQuery(CHAT_REQUESTS)
  const [theme, themeToggler, mountedComponent] = useDarkMode()
  const themeMode = theme === 'light' ? lightTheme : darkTheme


  // useEffect(() => {
  //   if (
  //     chatsQuery.error && chatsQuery.error.message && chatsQuery.error.message === 'invalid token' 
  //     || 
  //     chatRequestsQuery.error && chatRequestsQuery.error.message && chatRequestsQuery.error.message === 'invalid token') {
  //     console.log('Invalid token detected, logging out')
  //     setLogout()
  //   }
  // }, [chatsQuery.error, chatRequestsQuery.error, setLogout])

  useEffect(() => {
    if (chatsQuery.error) {
      if (chatsQuery.error.message === 'invalid token') {
        setLogout()
      }
      console.log(chatsQuery.error.message)
    }
    if (!(chatsQuery.loading || chatsQuery.error) && chatsQuery.data) {
      setChats(chatsQuery.data.getUserChats)
    }
  }, [chatsQuery.loading, chatsQuery.error, chatsQuery.data])

  useEffect(() => {
    if (!(chatRequestsQuery.loading || chatRequestsQuery.error) && chatRequestsQuery.data) {
      setChatRequests(chatRequestsQuery.data.getChatRequests)
      console.log(chatRequests)
    }
  }, [chatRequestsQuery.loading, chatRequestsQuery.error, chatRequestsQuery.data, chatRequestsQuery, chatRequests])

  const updateChatsAndRequests = () => {
    chatsQuery.refetch()
    chatRequestsQuery.refetch()
  }

  // const chatMatch = useMatch('/chats/:id')
  // const chatById = chatsQuery.data && chats && chatMatch
  //   ? chats.find(c => c.id === Number(chatMatch.params.id))
  //   : null

  if (!mountedComponent) return <div/>

  const home = () => {
    if (!authenticated) {
      return (
        <LandingPage />
      )
    }
    return (
      <>
        <DesktopHorizontalMobileVertical>
            <Menubar visibleElement={ visibleElement } setVisibleElement={ setVisibleElement } chatRequests={ chatRequests } style={{ height: '100VH' }}>
              { chats && <p>Chats:</p> }
              { chats && chats.map(chat => <ChatPreview chat={ chat } key={ chat.id } setVisibleElement={ setVisibleElement } visibleElement={visibleElement} />) }
            </Menubar>
            <UserProfile isVisible={ visibleElement === -1 } visibleElement={ visibleElement } theme={theme} toggleTheme={ themeToggler } />
            <ChatRequests isVisible={ visibleElement === -2 } visibleElement={ visibleElement } chatRequests={ chatRequests } updateChatsAndRequests={updateChatsAndRequests} />
            { chats && chats.map(chat => <ChatView chat={ chat } key={ chat.id } id={ chat.id } isVisible={ visibleElement === chat.id } />) }
        </DesktopHorizontalMobileVertical>
      </>
    )
  }

  return (
    <ThemeProvider theme={ themeMode }>
      <GlobalStyles />
      <Page>
        <Routes>
          <Route path='/' element={ home() } />
          {/* <Route path='/chats/:id' element={<ChatView chat={ chatById } />} /> */}
          <Route path='/accountconfirmation/:code' element={<AccountConfirmed />} />
        </Routes>
      </Page>
    </ThemeProvider>
  )
}

export default App
