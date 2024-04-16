import PropTypes from 'prop-types'
import { useMutation } from '@apollo/client'
import { useEffect, useState, useRef } from 'react'
import {
  NewMessageContainer,
  InputDiv,
  SendButton,
  VerticallyCentralizedContainer,
  DisabledSendButton
} from '../../styles/style'
import { ADD_MESSAGE } from '../../gql/mutations'
import { MdSend } from 'react-icons/md'

const NewMessageForm = ({ chatId }) => {
  const [content, setContent] = useState('')
  const [readyToSubmit, setReadyToSubmit] = useState(false)
  const [message, setMessage] = useState('0 / 255')
  const [send] = useMutation(ADD_MESSAGE)
  const inputRef = useRef(null)

  const handleSubmit = async (event) => {
    event.preventDefault()
    if (!readyToSubmit) return
    await send({ variables: { chatId, content } })
    setContent('')
    document.getElementById(`${chatId}-input`).textContent = ''
  }

  const handleKeyDown = (event) => {
    if (event.key === 'Enter') {
      if (event.shiftKey || event.ctrlKey ||event.metaKey) {
        event.preventDefault()
        handleSubmit(event)
      } else {
        setContent(`${content}\n`)
      }
    }
  }

  useEffect(() => {
    const inputElement = inputRef.current
    inputElement.addEventListener('keydown', handleKeyDown)
    return () => {
      inputElement.removeEventListener('keydown', handleKeyDown)
    }
  }, [])

  useEffect(() => {
    if (content.length > 0 && content.length <= 255) {
      setReadyToSubmit(true)
      setMessage(`${content.length} / 255`)
    } else if (content.length < 1) {
      setReadyToSubmit(false)
      setMessage('0 / 255')
    } else if (content.length > 255) {
      setReadyToSubmit(false)
      setMessage(`Messages longer than 255 characters cannot be submitted. (${content.length} / 255)`)
    }
  }, [content])

  return (
    <NewMessageContainer>
      <form id={`${chatId}-new-message-form`} onSubmit={handleSubmit} style={{ width: '100%' }}>
        { message }
        <VerticallyCentralizedContainer>
          <InputDiv
            contentEditable
            onInput={e => setContent(e.currentTarget.textContent)}
            ref={inputRef}
            onKeyDown={handleKeyDown}
            id={`${chatId}-input`}
          />
          {readyToSubmit
            ? 
            <SendButton className='btn-send'>
              <MdSend/>
            </SendButton>
            :
            <DisabledSendButton className='btn-send-disabled'>
              <MdSend/>
            </DisabledSendButton> }
        </VerticallyCentralizedContainer>
      </form>
    </NewMessageContainer>
  )
}

NewMessageForm.propTypes = {
  chatId: PropTypes.number.isRequired,
}

export default NewMessageForm
