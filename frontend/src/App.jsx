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
import AccountConfirmed from './components/userauth/AccountConfirmed'
import { Page, DesktopHorizontalMobileVertical } from './styles/style'
import { UserContext } from './contexts/UserContext'
import { USER_CHATS } from './gql/queries'
import { ThemeProvider } from 'styled-components'
import { GlobalStyles } from './styles/globalStyles'
import { lightTheme, darkTheme } from './styles/theme'
import { useDarkMode } from './hooks/useDarkMode'
import UserProfile from './components/UserProfile'
import ChatRequests from './components/chat/ChatRequests'


function App() {
  const { authenticated, setLogout } = useContext(UserContext)
  const [ chats, setChats ] = useState([])
  const [ visibleElement, setVisibleElement ] = useState(
    isNaN(localStorage.getItem('current-page'))
      ? -1
      : Number(localStorage.getItem('current-page'))
  )
  const [theme, themeToggler, mountedComponent] = useDarkMode()
  const themeMode = theme === 'light' ? lightTheme : darkTheme

  const handleQueryError = (error) => {
    console.log(error)
    if (error.message === 'invalid token') {
      setLogout()
    }
  }

  useQuery( USER_CHATS, {
    fetchPolicy: 'network-only',
    onCompleted: (data) => {
      setChats(data.getUserChats)
    },
    onError: (error) => handleQueryError(error)
  })

  useEffect(() => {
    const currentPage = localStorage.getItem('current-page')
    if (currentPage && !isNaN) setVisibleElement(Number(currentPage))
  }, [])

  useEffect(() => {
    localStorage.setItem('current-page', visibleElement.toString())
    console.log(localStorage.getItem('current-page'))
  }, [visibleElement])

  console.log('App rendered')

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
            <Menubar visibleElement={ visibleElement } setVisibleElement={ setVisibleElement } chats={ chats } style={{ height: '100VH' }} />
            <UserProfile isVisible={ visibleElement === -1 } visibleElement={ visibleElement } theme={theme} toggleTheme={ themeToggler } />
            <ChatRequests isVisible={ visibleElement === -2 } visibleElement={ visibleElement } />
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
