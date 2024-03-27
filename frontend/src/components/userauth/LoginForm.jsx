// import PropTypes from 'prop-types'
import { useContext } from 'react';
import { UserContext } from '../../contexts/UserContext';
import useField from '../../hooks/useField'
import userService from '../../services/user'

const LoginForm = () => {
  const { user, setLogin } = useContext(UserContext);
  const { reset: resetEmail, ...email } = useField('text')
  const { reset: resetPassword, ...password } = useField('password')

  const handleLogin = async event => {
    event.preventDefault()
    const response = await userService.login({
      email: email.value,
      password: password.value,
    })
    console.log(response)
    setLogin(response)
    console.log(user)
    resetEmail()
    resetPassword()
  }

  return (
    <div>
      <h2>Log in</h2>
      <form id="login-form" onSubmit={handleLogin}>
        <div>
          username
          <input { ...email }/>
        </div>
        <div>
          password
          <input { ...password }/>
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
