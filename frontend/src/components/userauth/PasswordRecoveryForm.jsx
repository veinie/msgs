import useField from '../../hooks/useField'
import { useParams, useNavigate } from 'react-router-dom'
import {
  VerticallyCentralizedContainer,
  HorizontallyCentralizedContainer,
  DesktopHorizontalMobileVertical,
  Button
} from '../../styles/style'
import userService from '../../services/user'

const PasswordRecoveryForm = () => {
  const { token } = useParams()
  const navigate = useNavigate()
  const { reset: resetNewPassword, ...newPassword } = useField('password')
  const { reset: resetNewPasswordAgain, ...newPasswordAgain } = useField('password')

  const verifyPassword = () => {
    if (newPassword.value !== newPasswordAgain.value) {
      alert('Passwords do not match')
      return false
    }
    return true
  }

  const handleNavigate = () => {
    navigate('/')
  }

  const handleSubmit = async (event) => {
    event.preventDefault()
    if (!verifyPassword()) {
      return
    }

    const response = await userService.recoverPassword({
      newPassword: newPassword.value,
      recoveryToken: token
    })
    if (response.error) {
      window.alert(response.error)
    } else {
      resetNewPassword()
      resetNewPasswordAgain()
      handleNavigate()
    }
  }

  return (
    <VerticallyCentralizedContainer>
      <HorizontallyCentralizedContainer>
        <DesktopHorizontalMobileVertical>
          <div>
            <h1>MSGS</h1>
          </div>
          <div className='background-div landingpage-form'>
            <h2>Set new password</h2>
            <form onSubmit={handleSubmit}>
              <div className='form-element'>
                New password
                <input required {...newPassword} placeholder='******************' className='text-input full-width'/>
              </div>
              <div className='form-element'>
                New password again
                <input required {...newPasswordAgain} placeholder='******************' className='text-input full-width'/>
              </div>
              <Button className={'btn btn-secondary'} type='submit'>Submit new password</Button>
            </form>
          </div>
        </DesktopHorizontalMobileVertical>
      </HorizontallyCentralizedContainer>
    </VerticallyCentralizedContainer>
  )
}

export default PasswordRecoveryForm
