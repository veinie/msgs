import { useContext } from 'react';
import { UserContext } from '../../contexts/UserContext';
import userService from '../../services/user'

const Logout = () => {
  const { user, setLogout } = useContext(UserContext);

  const handleLogout = async event => {
    event.preventDefault()
    console.log('logout initiated')
    const response = await userService.logout(user.token)
    console.log(response)
    if (response.error) {
      alert('Session expired')
    }
    setLogout()
  }

  return (
    <div>
      <button onClick={handleLogout}>log out</button>
    </div>
  )
}

export default Logout
