// import PropTypes from 'prop-types'
import { useContext } from 'react';
import { UserContext } from '../../contexts/UserContext';
import userService from '../../services/user'

const Logout = () => {
  const { user, setLogout } = useContext(UserContext);

  const handleLogout = async event => {
    event.preventDefault()
    console.log('logout initiated')
    const response = await userService.logout(user.token)
    if (response) {
      setLogout()
    }
  }

  return (
    <div>
      <button onClick={handleLogout}>logout {user.username}</button>
    </div>
  )
}

export default Logout
