import { useContext } from 'react'
import { useApolloClient } from '@apollo/client'
import { UserContext } from '../../contexts/UserContext'
import userService from '../../services/user'
import { Button } from '../../styles/style'

const Logout = () => {
  const { user, setLogout } = useContext(UserContext)
  const client = useApolloClient()

  const handleLogout = async event => {
    event.preventDefault()
    console.log('logout initiated')
    const response = await userService.logout(user.token)
    if (response.error) {
      alert('Session expired')
    }
    setLogout()
    client.cache.evict({ fieldName: '__typename' })
    client.cache.gc()
  }

  return (
    <div>
      <Button className='btn btn-success' onClick={handleLogout}>log out</Button>
    </div>
  )
}

export default Logout
