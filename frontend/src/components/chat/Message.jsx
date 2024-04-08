import PropTypes from 'prop-types'
import { useState, useMemo, useRef, useEffect } from 'react'
import { MessageContainer } from '../../styles/style'
import { epochToHumanReadable as formatTime } from '../../util/time'
import { useContext } from 'react'
import { UserContext } from '../../contexts/UserContext'
import { useMutation } from '@apollo/client'
import { UPDATE_MESSAGE, DELETE_MESSAGE } from '../../gql/mutations'
import Modal from '../Modal'
import { MdMoreVert, MdEdit, MdDeleteForever } from "react-icons/md";
import { InputDiv, Button } from '../../styles/style'

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
    const contentEditableRef = useRef(null);

    useEffect(() => {
      const contentEditableElement = contentEditableRef.current
      if (contentEditableElement) {
        contentEditableElement.innerHTML = text
      }
    }, [text])

    useEffect(() => {
      const contentEditableElement = contentEditableRef.current
      if (contentEditableElement) {
        contentEditableElement.focus()
      }
    }, [])

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
        <InputDiv
          contentEditable
          autoFocus
          ref={contentEditableRef}
          onBlur={e => setText(e.currentTarget.textContent)}
          id={`${message.id}-edit-input`}
          dangerouslySetInnerHTML={{ __html: text }}
        />
        <br />
        <Button className='btn btn-secondary' onClick={handleClick}>Submit</Button>
      </Modal>
    )
  }

  const MessageActions = () => {
    const [visible, setVisible] = useState(false)
    const showWhenVisible = { display: visible ? '' : 'none' }
    return (
      <div className='message-tools'>
        <MdEdit style={{ ...showWhenVisible }} className='message-edit-icon' onClick={handleEditClick}>Edit message</MdEdit>
        <MdDeleteForever style={{ ...showWhenVisible }} className='message-edit-icon' onClick={handleDeleteClick}>Delete message</MdDeleteForever>
        <MdMoreVert onClick={ () => setVisible(!visible) } className='message-edit-icon' />
      </div>
    )
  }

  const messageInfo = () => {
    return(
      <div>
        <div className='message-info'>
          { message.user.username === user.username ? 'You ' : `${message.user.username} ` }
          at
          <i> { createdAt }</i> { message.createdAt !== message.updatedAt && '(edited)' }:
        </div>
        { message.user.id === user.id ? <MessageActions /> : <p/> }
      </div>
    )
  }


  return (
    <MessageContainer className={ message.user.id === user.id ? 'user-message' : 'not-user-message' }>
      <EditMessageModal />
      { messageInfo() }
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
