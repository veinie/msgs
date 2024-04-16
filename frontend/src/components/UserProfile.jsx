import { PropTypes } from 'prop-types'
import { useState, useEffect, useContext } from 'react'
import { UserContext } from '../contexts/UserContext'
import Logout from './userauth/Logout'
import ThemeToggler from './ThemeToggler'
import { useIdleTimer } from 'react-idle-timer'
import userService from '../services/user'
import PasswordResetForm from './userauth/PasswordResetForm'
import ChangeUsernameForm from './userauth/ChangeUsernameForm'
import DeleteAccountForm from './userauth/DeleteAccountForm'
import { Scrollable } from '../styles/style'

const UserProfile = ({ isVisible, theme, toggleTheme }) => {
  const { user, setLogin, setLogout } = useContext(UserContext)
  const [active, setActive] = useState(false)
  useIdleTimer({
    timeout: 600000, // 10 minutes
    onAction: () => {
      if (!active) {
        setActive(true)
      }
    },
    onIdle: () => {
      if (active) {
        setActive(false)
      }
    }
  })

  useEffect(() => {
    // Auto-refresh user token if user is not idle and
    // token expires in less than 20 minutes
    const interval = setInterval( async () => {
      try {
        if (active) {
          console.log('checking time to token invalidation')
          const expTime = JSON.parse(atob(user.token.split('.')[1])).exp * 1000
          const minutesRemaining = (expTime - Date.now()) / 1000 / 60
          if (minutesRemaining < 25) {
            console.log('refreshing token')
            const response = await userService.refreshToken(user.token)
            setLogin(response)
          }
        }
      } catch (error) {
        console.log(error)
        if (error.response.request.status === 401) {
          setLogout()
        }
      }
    }, 300000) // 5 minutes

    return () => {
      clearInterval(interval)
    }
  }, [active, user])

  return (
    <Scrollable style={{ display: isVisible ? 'block' : 'none', padding: '1em' }} className='profile-div'>
      <div className='full-width'>
        <p>{ `Logged in as ${ user.username } (User-ID: #${ user.id })` }</p>
        {active.toString()}
        <Logout />
        <hr/>
        <ChangeUsernameForm />
        <PasswordResetForm />
        <ThemeToggler theme={theme} toggleTheme={ toggleTheme } />
        <DeleteAccountForm />
      </div>
    </Scrollable>

      
  )
}

UserProfile.propTypes = {
  isVisible: PropTypes.bool,
  theme: PropTypes.string,
  toggleTheme: PropTypes.func
}

export default UserProfile
