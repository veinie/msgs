import { PropTypes } from 'prop-types'
import { useState, useEffect, useContext } from 'react'
import { UserContext } from '../contexts/UserContext'
import Logout from './userauth/Logout'
import ThemeToggler from './ThemeToggler'
import { useIdleTimer } from 'react-idle-timer'
import userService from '../services/user'

const UserProfile = ({ isVisible, theme, toggleTheme }) => {
  const { user, setLogin } = useContext(UserContext)
  const [active, setActive] = useState(true)
  useIdleTimer({
    timeout: 60000, // 60 seconds
    onAction: () => setActive(true),
    onIdle: () => setActive(false)
  })

  const refreshToken = async () => {
    // Auto-refresh user token if user is not idle and
    // token expires in less than 20 minutes
    try {
      if (active) {
        const expTime = JSON.parse(atob(user.token.split('.')[1])).exp * 1000
        const minutesRemaining = (expTime - Date.now()) / 1000 / 60
        console.log(`Token valid for ${minutesRemaining} more minutes.`)
        if (minutesRemaining < 20) {
          // refresh token
          console.log('refreshing token')
          const response = await userService.refreshToken(user.token)
          if (response.error) {
            console.log(response.error)
            return
          } else {
            setLogin(response)
          }
        }
      }
    } catch (error) {
      console.log(error)
    }
  }

  useEffect(() => {
    refreshToken()
  }, [])

  setTimeout(() => {
    refreshToken()
  }, 60000)

  return (
    <div style={{ display: isVisible ? 'block' : 'none', padding: '1em' }} className='full-width'>
      <p>{ `Logged in as ${ user.username } (User-ID: #${ user.id })` }</p>
      <Logout />
      <hr/>
      <h3>Update profile picture</h3>
      <button>update profilepic</button><br/>
      <h3>Change username</h3>
      <button>change username</button><br/>
      <h3>Change password</h3>
      <button>change password</button><br/>
      <h3>Toggle light or dark theme</h3>
      <ThemeToggler theme={theme} toggleTheme={ toggleTheme } />
    </div>
  )
}

UserProfile.propTypes = {
  isVisible: PropTypes.bool,
  theme: PropTypes.string,
  toggleTheme: PropTypes.func
}

export default UserProfile
