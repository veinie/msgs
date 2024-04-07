import PropTypes from 'prop-types'
import { useState, useMemo } from 'react'
import { MessageContainer } from '../../styles/style'
import { epochToHumanReadable as formatTime } from '../../util/time'
import { useContext } from 'react'
import { UserContext } from '../../contexts/UserContext'
import { useMutation } from '@apollo/client'
import { UPDATE_MESSAGE, DELETE_MESSAGE } from '../../gql/mutations'
import Modal from '../Modal'

const Message = ({ message, deleteMessageFromList, updateMessageOnList }) => {
  const { user } = useContext(UserContext)
  const createdAt = useMemo(() => formatTime(message.createdAt), [message.createdAt])
  const [isModalOpen, setIsModalOpen] = useState(false)
  const [updateMessage] = useMutation(UPDATE_MESSAGE, {
    onCompleted: (data) => {
      const updatedMessage = data.updateMessage
      updateMessageOnList(message.id, updatedMessage)
      closeModal()
    },
    onError: (err) => {
      console.log(err)
    }
  })
  const [deleteMessage] = useMutation(DELETE_MESSAGE, {
    onCompleted: () => {
      deleteMessageFromList(message.id)
    },
    onError: (err) => {
      console.log(err)
    }
  })

  const handleDeleteClick = () => {
    if (window.confirm(`Confirm to delete message:\n${message.content}`)) {
      deleteMessage({ variables: { id: message.id } })
    }
  }

  const handleEditClick = () => {
    openModal()
  }

  const openModal = () => {
    setIsModalOpen(true)
  }

  const closeModal = () => {
    setIsModalOpen(false)
  }

  const EditMessageModal = () => {
    const [text, setText] = useState(message.content)
    const handleChange = (event) => {
      event.preventDefault()
      setText(event.target.value)
    }
    const handleClick = () => {
      if (text.length > 0) {
        updateMessage({
          variables: {
            id: message.id,
            content: text
          }
        })
      }
    }
    return (
      <Modal
        onClose={closeModal}
        isOpen={isModalOpen}
        message={'Edit Message:'}
      >
        <input onChange={handleChange} value={text} />
        <button onClick={handleClick}>Submit</button>
      </Modal>
    )
  }


  return (
    <MessageContainer className={ message.user.id === user.id ? 'user-message' : 'not-user-message' }>
      <EditMessageModal />
      <div className='message-sender'>
        { message.user.username } at <i>{ createdAt }</i> { message.createdAt !== message.updatedAt && '(edited)' }:
        { message.user.id === user.id &&
          <>
            <button onClick={handleEditClick}>Edit message</button>
            <button onClick={handleDeleteClick}>Delete message</button>
          </>
        }
      </div>
      <div className='message-content'>
        { message.content }
      </div>

    </MessageContainer>
  )
}

Message.propTypes = {
  message: PropTypes.object,
  deleteMessageFromList: PropTypes.func.isRequired,
  updateMessageOnList: PropTypes.func.isRequired,
}

export default Message
