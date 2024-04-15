import { useEffect, useState } from 'react'
import { Link, useParams } from 'react-router-dom'
import userService from '../../services/user'
import {
  VerticallyCentralizedContainer,
  HorizontallyCentralizedContainer,
  DesktopHorizontalMobileVertical
} from '../../styles/style'

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
    <VerticallyCentralizedContainer>
      <HorizontallyCentralizedContainer>
        <DesktopHorizontalMobileVertical>
          <div className='background-div landingpage-form'>
            <p>{ message }</p>
            { confirmed && <>go to <Link to='/'>login</Link></> }
          </div>
        </DesktopHorizontalMobileVertical>
      </HorizontallyCentralizedContainer>
    </VerticallyCentralizedContainer>
  )
}

export default AccountConfirmed
