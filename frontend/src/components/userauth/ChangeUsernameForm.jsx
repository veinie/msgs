import { useContext } from 'react'
import { UserContext } from '../../contexts/UserContext'
import useField from '../../hooks/useField'
import userService from '../../services/user'
import { Button } from '../../styles/style'

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
    <div className="background-div profile-element">
      <h3>Change username</h3>
      <form onSubmit={handleSubmit}>
        <div className='form-element'>
          New username
          <input required {...newUsername} className='text-input'/>
        </div>
        <Button
          className={
            newUsername.value === ''
              ? 'btn btn-disabled'
              : 'btn btn-secondary'
          }
          type='submit'
        >
          Submit new username
        </Button>
      </form>
    </div>
  )
}

export default ChangeUsernameForm