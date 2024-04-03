import { useState, useEffect, createContext } from 'react'

const UserContext = createContext({ user: {} })

// eslint-disable-next-line react/prop-types
const UserProvider = ({ children }) => {
  const [user, setUser] = useState(null)
  const [authenticated, setAuthenticated] = useState(false)
  // const [isActive, setIsActive] = useState(true)
  // const resetInactivityTimeoutRef = useRef(null)

  useEffect(() => {
    const storedUser = window.localStorage.getItem('MsgsUser')
    const storedAuthenticated = window.localStorage.getItem('MsgsAuthenticated')

    if (storedUser) {
      setUser(JSON.parse(storedUser))
    }

    if (storedAuthenticated) {
      setAuthenticated(JSON.parse(storedAuthenticated))
    }
  }, [])

  // useEffect(() => {
  //   function handleUserActivity() {
  //     setIsActive(true)

  //     const inactivityTimeout = setTimeout(() => {
  //       setIsActive(false)
  //     }, 10000) // 10 seconds
  //     // }, 60000) // 60 seconds
  
  //     resetInactivityTimeoutRef.current = () => {
  //       clearTimeout(inactivityTimeout)
  //       setIsActive(true)
  //     }
  
  //     document.addEventListener('mousemove', resetInactivityTimeoutRef.current)
  //     document.addEventListener('keydown', resetInactivityTimeoutRef.current)
  //   }

  //   handleUserActivity()

  //   return () => {
  //     document.removeEventListener('mousemove', resetInactivityTimeoutRef.current)
  //     document.removeEventListener('keydown', resetInactivityTimeoutRef.current)
  //   }

  // }, [])

  // useEffect(() => {
  //   window.localStorage.setItem('MsgsUser', JSON.stringify(user))
  //   window.localStorage.setItem('MsgsAuthenticated', JSON.stringify(authenticated))
  // }, [user, authenticated])

  const setLogin = (userData) => {
    setUser(userData)
    setAuthenticated(true)
    localStorage.setItem('MsgsUser', JSON.stringify(userData))
    localStorage.setItem('MsgsAuthenticated', JSON.stringify(true))
  }

  const setLogout = () => {
    setUser(null)
    setAuthenticated(false)
    localStorage.removeItem('MsgsUser')
    localStorage.removeItem('MsgsAuthenticated')
  }

  const updateUserProfile = (newProfileData) => {
    setUser((prevUser) => ({
      ...prevUser,
      ...newProfileData
    }))
  }

  return(
    <UserContext.Provider
      value={{
        user,
        authenticated,
        setLogin,
        setLogout,
        updateUserProfile
      }}
    >
      {children}
    </UserContext.Provider>
  )
}

export { UserContext, UserProvider }
