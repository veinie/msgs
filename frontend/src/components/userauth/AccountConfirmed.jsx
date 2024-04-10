import { useEffect, useState } from 'react'
import { Link, useParams } from 'react-router-dom'
import userService from '../../services/user'

const AccountConfirmed = () => {
  const [confirmed, setConfirmed] = useState(false)
  const [message, setMessage] = useState('Confirming account...')
  const { code } = useParams()

  useEffect(() => {
    async function confirmAccount() {
      try {
        const response = await userService.confirmAccount(code)
        setConfirmed(true)
        setMessage(response.message)
      } catch (error) {
        console.log(error)
        setMessage(error.response.data.message)
      }
    }
    confirmAccount()
  })


  return (
    <>
      <p>{ message }</p>
      { confirmed && <>go to <Link to='/'>login</Link></> }
    </>
  )
}

export default AccountConfirmed
