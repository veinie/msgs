import { useContext } from "react"
import { UserContext } from "../../contexts/UserContext"
import useField from "../../hooks/useField"
import userService from "../../services/user"

const PasswordResetForm = () => {
  const { user, setLogout } = useContext(UserContext)

  const { reset: resetOldPassword, ...oldPassword } = useField('password')
  const { reset: resetNewPassword, ...newPassword } = useField('password')
  const { reset: resetNewPasswordAgain, ...newPasswordAgain } = useField('password')

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
    <div>
      <form onSubmit={handleSubmit}>
        <div>
          Old password
          <input required {...oldPassword } />
        </div>
        <div>
          New password
          <input required {...newPassword} />
        </div>
        <div>
          New password again
          <input required {...newPasswordAgain}/>
        </div>
        <button type="submit">Change password</button>
      </form>
    </div>
  )
}

export default PasswordResetForm
