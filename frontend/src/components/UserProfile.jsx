import { PropTypes } from 'prop-types'
import { useContext } from 'react'
import { UserContext } from '../contexts/UserContext'
import Logout from './userauth/Logout'
import ThemeToggler from './ThemeToggler'

const UserProfile = ({ isVisible, theme, toggleTheme }) => {
  const { user } = useContext(UserContext)
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
