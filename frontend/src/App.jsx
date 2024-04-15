import {
  Routes,
  Route,
} from 'react-router-dom'
import { Page } from './styles/style'
import { ThemeProvider } from 'styled-components'
import { GlobalStyles } from './styles/globalStyles'
import { lightTheme, darkTheme } from './styles/theme'
import { useDarkMode } from './hooks/useDarkMode'
import { ChatsProvider } from './contexts/ChatsContext'
import AccountConfirmed from './components/userauth/AccountConfirmed'
import PasswordRecoveryForm from './components/userauth/PasswordRecoveryForm'
import Msgs from './components/Msgs'

function App() {
  const [theme, themeToggler, mountedComponent] = useDarkMode()
  const themeMode = theme === 'light' ? lightTheme : darkTheme

  if (!mountedComponent) return <div/>

  return (
    <ThemeProvider theme={ themeMode }>
      <GlobalStyles />
      <Page>
        <Routes>
          <Route path='*' element={
            <ChatsProvider>
              <Msgs 
                theme={theme}
                themeToggler={themeToggler}
              />
            </ChatsProvider>
          } />
          <Route path='/accountconfirmation/:code' element={<AccountConfirmed />} />
          <Route path='/resetpassword/:token' element={<PasswordRecoveryForm />} />
        </Routes>
      </Page>
    </ThemeProvider>
  )
}

export default App
