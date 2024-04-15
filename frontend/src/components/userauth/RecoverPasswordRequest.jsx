import { useState } from 'react'
import useField from '../../hooks/useField'
import { Button } from '../../styles/style'
import Modal from '../Modal'
import userService from '../../services/user'

export const RecoverPasswordRequest = () => {
  const { reset: resetEmail, ...email } = useField('text')
  const [isModalOpen, setIsModalOpen] = useState(false)
  const modalMessage =
    'Password recovery instructions have been sent to the email if it was found registered to the application'

  const handleSubmit = async (event) => {
    event.preventDefault()
    await userService.requestPasswordRecovery({
      email: email.value
    })
    openModal()
  }

  const openModal = () => {
    setIsModalOpen(true)
  }

  const closeModal = () => {
    setIsModalOpen(false)
    resetEmail()
  }

  const SuccessModal = () => {
    return (
      <Modal
        message={modalMessage}
        isOpen={isModalOpen}
        onClose={closeModal}
      />
    )
  }

  return (
    <div className='form-element'>
      <h2>Password recovery</h2>
      <p>
        To recover forgotten password, please enter the email
        address registered with the account to the field below and then select Recover password.
      </p>
      <form onSubmit={handleSubmit}>
        <div className='form-element'>
          email
          <input
            required
            { ...email }
            placeholder='your-account@email.net'
            className='full-width'
          />
        </div>
        <Button className='btn btn-secondary' type='submit'>Recover password</Button>
        <SuccessModal />
      </form>
    </div>
  )
}

export default RecoverPasswordRequest
