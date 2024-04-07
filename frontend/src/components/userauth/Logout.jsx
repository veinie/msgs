import { useContext } from 'react'
import { useApolloClient } from '@apollo/client'
import { UserContext } from '../../contexts/UserContext'
import userService from '../../services/user'

const Logout = () => {
  const { user, setLogout } = useContext(UserContext)
  const client = useApolloClient()

  const handleLogout = async event => {
    event.preventDefault()
    console.log('logout initiated')
    const response = await userService.logout(user.token)
    console.log(response)
    if (response.error) {
      alert('Session expired')
    }
    setLogout()
    client.cache.evict({ fieldName: '__typename' })
    client.cache.gc()
  }

  return (
    <div>
      <button onClick={handleLogout}>log out</button>
    </div>
  )
}

export default Logout
