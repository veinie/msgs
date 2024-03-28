import { useState, useEffect, createContext } from 'react'

const UserContext = createContext({ user: {} })

// eslint-disable-next-line react/prop-types
const UserProvider = ({ children }) => {
  const [user, setUser] = useState(null)
  const [authenticated, setAuthenticated] = useState(false)

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
