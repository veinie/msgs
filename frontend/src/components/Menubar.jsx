import { useState, useContext } from 'react';
import { UserContext } from '../contexts/UserContext';
import Logout from './userauth/Logout';
import NewChatRequest from './chat/NewChatRequest';

const Menubar = () => {
  const [isModalOpen, setIsModalOpen] = useState(false)
  const { user } = useContext(UserContext);

  const openModal = () => {
    setIsModalOpen(true)
  }

  const closeModal = () => {
    setIsModalOpen(false)
  }

  return (
    <>
      Hello, { user.username } #{ user.id }
      <Logout />
      <button onClick={openModal}>New chat request</button>
      <NewChatRequest
        onClose={closeModal}
        isOpen={isModalOpen}
        message={'Type in username or user ID to start a new conversation:'}
      />

    </>
  )
}

export default Menubar
