import { useState, useContext, useEffect } from 'react'
import {
  Routes,
  Route,
} from 'react-router-dom'
import LandingPage from './components/LangingPage'
import Menubar from './components/Menubar'
import ChatView from './components/chat/ChatView'
import AccountConfirmed from './components/userauth/AccountConfirmed'
import { Page, DesktopHorizontalMobileVertical } from './styles/style'
import { UserContext } from './contexts/UserContext'
import { ThemeProvider } from 'styled-components'
import { GlobalStyles } from './styles/globalStyles'
import { lightTheme, darkTheme } from './styles/theme'
import { useDarkMode } from './hooks/useDarkMode'
import UserProfile from './components/UserProfile'
import ChatRequests from './components/chat/ChatRequests'
import { ChatsContext, ChatsProvider } from './contexts/ChatsContext'
import PasswordRecoveryForm from './components/userauth/PasswordRecoveryForm'

function App() {
  const [theme, themeToggler, mountedComponent] = useDarkMode()
  const themeMode = theme === 'light' ? lightTheme : darkTheme

  console.log('App rendered')

  if (!mountedComponent) return <div/>

  const Msgs = () => {
    const { authenticated } = useContext(UserContext)
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
    const { chats } = useContext(ChatsContext)
    if (!authenticated) {
      return (
        <LandingPage />
      )
    }
    if (!chats) return <div>loading</div>
    console.log('Msgs rendered')
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

  return (
    <ThemeProvider theme={ themeMode }>
      <GlobalStyles />
      <Page>
        <Routes>
          <Route path='*' element={ <ChatsProvider><Msgs /></ChatsProvider> } />
          <Route path='/accountconfirmation/:code' element={<AccountConfirmed />} />
          <Route path='/resetpassword/:token' element={<PasswordRecoveryForm />} />
        </Routes>
      </Page>
    </ThemeProvider>
  )
}

export default App
