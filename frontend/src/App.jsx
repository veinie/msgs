// import { useState } from 'react'
import { useContext } from 'react'
import LandingPage from './components/LangingPage'
import Logout from './components/userauth/Logout'
import { UserContext } from './contexts/UserContext'

function App() {
  const { authenticated } = useContext(UserContext)

  return (
    <>
      {!authenticated && <LandingPage />}
      {authenticated && <Logout />}
    </>
  )
}

export default App
