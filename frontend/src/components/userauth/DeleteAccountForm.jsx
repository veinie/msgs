import { useState, useEffect, useContext } from 'react'
import { UserContext } from '../../contexts/UserContext'
import useField from '../../hooks/useField'
import userService from '../../services/user'
import { Button } from '../../styles/style'

const DeleteAccountForm = () => {
  const { user, setLogout } = useContext(UserContext)
  const { reset: resetUsernameInput, ...usernameInput } = useField('text')
  const [readyToSubmit, setReadyToSubmit] = useState(false)

  useEffect(() => {
    if (usernameInput.value === user.username) {
      setReadyToSubmit(true)
    } else if (readyToSubmit === true && usernameInput.value !== user.username) {
      setReadyToSubmit(false)
    }
  }, [usernameInput.value])

  const handleSubmit = async (event) => {
    event.preventDefault()
    if (window.confirm('Proceed to permanently delete account and all related information?')) {
      const response = await userService.deleteAccount({
        userId: user.id,
        token: user.token
      })
      console.log(response)
      if (response.status === 204) {
        window.alert('Account deleted succesfully.')
        setLogout()
      } else {
        window.alert('Something went wrong')
      }
    }
    resetUsernameInput()
  }

  return (
    <div className="background-div profile-element">
      <h3>Delete Account</h3>
      <form onSubmit={handleSubmit}>
        <div className='form-element'>
          <p>All information related to your userprofile will be deleted.</p>
          To confirm, type in your username:
          <input required {...usernameInput} className='text-input'/>
        </div>
        <Button className={ readyToSubmit === false ? 'btn btn-disabled' : 'btn btn-danger' } type='submit'>Permanently delete Account</Button>
      </form>
    </div>
  )
}

export default DeleteAccountForm
