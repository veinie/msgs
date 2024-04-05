import { useContext } from "react"
import { UserContext } from "../../contexts/UserContext"
import useField from "../../hooks/useField"
import userService from "../../services/user"

const ChangeUsernameForm = () => {
  const { user, updateUserProfile, setLogout } = useContext(UserContext)

  const { reset: resetNewUsername, ...newUsername } = useField('text')

  const handleSubmit = async (event) => {
    event.preventDefault()
    try {
      const response = await userService.changeUsername({
        token: user.token,
        newUsername: newUsername.value
      })
      console.log(response)
      if (response.status === 204) {
        updateUserProfile({
          username: newUsername.value
        })
        resetNewUsername()
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
          New username
          <input required {...newUsername} />
        </div>
        <button type='submit'>Submit new username</button>
      </form>
    </div>
  )
}

export default ChangeUsernameForm