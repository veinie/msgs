// import PropTypes from 'prop-types'
import { useState, useContext } from 'react'
import { UserContext } from '../../contexts/UserContext'
import useField from '../../hooks/useField'
import userService from '../../services/user'
import { useApolloClient } from '@apollo/client'
import { Button } from '../../styles/style'
import RecoverPasswordRequest from './RecoverPasswordRequest'

const LoginForm = () => {
  const { setLogin } = useContext(UserContext)
  const [extendedSessionLogin, setExtendedSessionLogin] = useState(false)
  const { reset: resetEmail, ...email } = useField('text')
  const { reset: resetPassword, ...password } = useField('password')
  const [ isVisible, setIsVisible ] = useState(true)
  const client = useApolloClient()

  const handleLogin = async event => {
    event.preventDefault()
    try {
      const response = await userService.login({
        email: email.value,
        password: password.value,
        extendedSession: extendedSessionLogin
      })
      setLogin(response)
      resetEmail()
      resetPassword()
      client.refetchQueries({
        include: 'active',
      })
    } catch (error) {
      console.log(error)
      if (error.response.data.error) {
        alert(error.response.data.error)
      }
    }
  }

  const handleClick = (event) => {
    event.preventDefault()
    setIsVisible(!isVisible)
  }

  return (
    <div>
      <div style={{ display: isVisible === true ? 'block' : 'none' }}>
        <h2>Log in</h2>
        <form id="login-form" onSubmit={handleLogin}>
          <div className='form-element'>
            email
            <input
              required
              { ...email }
              placeholder='Your account email'
              className='full-width landingpage-input'
            />
          </div>
          <div className='form-element'>
            password
            <input
              required
              { ...password }
              placeholder='********'
              className='full-width landingpage-input'
            />
          </div>
          <div className='form-element' onClick={() => setExtendedSessionLogin(!extendedSessionLogin)}>
            <input
              type="checkbox"
              checked={extendedSessionLogin}
              onChange={() => setExtendedSessionLogin(!extendedSessionLogin) }
            />
            Keep me logged in for 30 days
          </div>
          <Button className='btn btn-primary' id="login-button" type="submit">
            Log in
          </Button>
          <Button onClick={handleClick} className='btn-light' style={{ marginLeft: '10px' }}>
            Forgot password?
          </Button>
        </form>
      </div>
      <div style={{ display: isVisible === true ? 'none' : 'block' }}>
        <RecoverPasswordRequest />
        <Button onClick={handleClick} className='btn-light'>
          Back to login
        </Button>
      </div>
      <hr />
    </div>
  )
}

export default LoginForm
