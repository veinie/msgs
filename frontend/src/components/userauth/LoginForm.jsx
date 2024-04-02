// import PropTypes from 'prop-types'
import { useState, useContext } from 'react';
import { UserContext } from '../../contexts/UserContext';
import useField from '../../hooks/useField'
import userService from '../../services/user'

const LoginForm = () => {
  const { setLogin } = useContext(UserContext);
  const [extendedSessionLogin, setExtendedSessionLogin] = useState(false)
  const { reset: resetEmail, ...email } = useField('text')
  const { reset: resetPassword, ...password } = useField('password')

  const handleLogin = async event => {
    event.preventDefault()
    const response = await userService.login({
      email: email.value,
      password: password.value,
      extendedSession: extendedSessionLogin
    })
    if (response.error) {
      alert(response.error.message)
      return
    }
    setLogin(response)
    resetEmail()
    resetPassword()
  }

  return (
    <div>
      <h2>Log in</h2>
      <form id="login-form" onSubmit={handleLogin}>
        <div>
          email
          <input required { ...email }/>
        </div>
        <div>
          password
          <input required { ...password }/>
        </div>
        <div>
          <input
            type="checkbox"
            checked={extendedSessionLogin}
            onChange={() => setExtendedSessionLogin(!extendedSessionLogin) }
          />
          Keep me logged in for 30 days
        </div>
        <button id="login-button" type="submit">
          login
        </button>
      </form>
    </div>
  )
}

// LoginForm.propTypes = {
//   login: PropTypes.func.isRequired
// }

export default LoginForm