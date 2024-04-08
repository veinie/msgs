// import PropTypes from 'prop-types'
import { useState } from 'react'
import SuccesfulSignupModal from './SuccesfulSignupModal'
import useField from '../../hooks/useField'
import userService from '../../services/user'
import { Button } from '../../styles/style'

const SignupForm = () => {
  const [isModalOpen, setIsModalOpen] = useState(false)
  const [modalMessage, setModalMessage] = useState('')
  const { reset: resetUsername, ...username } = useField('text')
  const { reset: resetPassword, ...password } = useField('password')
  const { reset: resetPasswordConfirm, ...passwordConfirm } = useField('password')
  const { reset: resetEmail, ...email } = useField('text')

  const verifyPassword = () => {
    if (password.value !== passwordConfirm.value) {
      alert('Passwords do not match')
      return false
    }
    return true
  }

  const handleSignup = async event => {
    event.preventDefault()
    if (!verifyPassword()) return
    console.log('Signup initiated')
    const user = {
      email: email.value,
      username: username.value,
      password: password.value
    }
    const response = await userService.signup(user)
    if (response.error) {
      alert(response.error)
      return
    }
    resetUsername()
    resetEmail()
    resetPassword()
    resetPasswordConfirm()
    setModalMessage(response.message)
    openModal()
  }

  const openModal = () => {
    setIsModalOpen(true)
  }

  const closeModal = () => {
    setIsModalOpen(false)
    setModalMessage('')
  }

  return (
    <div>
      <SuccesfulSignupModal isOpen={isModalOpen} onClose={closeModal} message={modalMessage} />
      <h2>Sign up</h2>
      <form id="signup-form" onSubmit={handleSignup}>
        <div className='form-element'>
          username
          <input required { ...username } placeholder='Your new username' className='full-width landingpage-input'/>
        </div>
        <div className='form-element'>
          password
          <input required { ...password } placeholder='*******' className='full-width landingpage-input'/>
        </div>
        <div className='form-element'>
          confirm password
          <input required { ...passwordConfirm } placeholder='*******' className='full-width landingpage-input'/>
        </div>
        <div className='form-element'>
          email
          <input required { ...email } placeholder='sample@email.net' className='full-width landingpage-input'/>
        </div>
        <Button className='btn btn-success form-element' id="signup-button" type="submit">
          Sign up
        </Button>
      </form>
    </div>
  )
}

export default SignupForm
