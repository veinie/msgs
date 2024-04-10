import { useState, useEffect, useContext } from 'react'
import { UserContext } from '../../contexts/UserContext'
import useField from '../../hooks/useField'
import userService from '../../services/user'
import { Button } from '../../styles/style'

const PasswordResetForm = () => {
  const { user, setLogout } = useContext(UserContext)

  const { reset: resetOldPassword, ...oldPassword } = useField('password')
  const { reset: resetNewPassword, ...newPassword } = useField('password')
  const { reset: resetNewPasswordAgain, ...newPasswordAgain } = useField('password')

  const [readyToSubmit, setReadyToSubmit] = useState(false)

  useEffect(() => {
    if (
      oldPassword.value.length > 0
      &&
      newPassword.value.length > 0
      &&
      newPasswordAgain.value.length > 0
    ) {
      setReadyToSubmit(true)
    } else {
      setReadyToSubmit(false)
    }
  }, [oldPassword.value, newPassword.value, newPasswordAgain.value])

  const verifyPassword = () => {
    if (newPassword.value !== newPasswordAgain.value) {
      alert('Passwords do not match')
      return false
    }
    return true
  }

  const handleSubmit = async (event) => {
    event.preventDefault()
    if (!verifyPassword()) {
      return
    }
    try {
      const response = await userService.changePassword({
        token: user.token,
        oldPassword: oldPassword.value,
        newPassword: newPassword.value
      })
      if (response.status === 200) {
        console.log('Password changed succesfully')
        resetOldPassword()
        resetNewPassword()
        resetNewPasswordAgain()
        setLogout()
      }
    } catch (error) {
      console.log(error)
    }
  }

  return (
    <div className="background-div profile-element">
      <h3>Change password</h3>
      <form onSubmit={handleSubmit}>
        <div className='form-element'>
          Old password
          <input required {...oldPassword } className='text-input'/>
        </div>
        <div className='form-element'>
          New password
          <input required {...newPassword} className='text-input'/>
        </div>
        <div className='form-element'>
          New password again
          <input required {...newPasswordAgain} className='text-input'/>
        </div>
        <Button className={ !readyToSubmit ? 'btn btn-disabled' : 'btn btn-secondary' } type='submit'>Submit new password</Button>
      </form>
    </div>
  )
}

export default PasswordResetForm
