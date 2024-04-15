import PropTypes from 'prop-types'
import { useMutation } from '@apollo/client'
import { useEffect, useState, useRef } from 'react'
import { NewMessageContainer, InputDiv, SendButton, VerticallyCentralizedContainer, DisabledSendButton } from '../../styles/style'
import { ADD_MESSAGE } from '../../gql/mutations'
import { MdSend } from 'react-icons/md'

const NewMessageForm = ({ chatId }) => {
  const [content, setContent] = useState('')
  const [send] = useMutation(ADD_MESSAGE)
  const inputRef = useRef(null)

  const handleSubmit = async (event) => {
    event.preventDefault()
    if (!content) return
    const response = await send({ variables: { chatId, content } })
    console.log(response)
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

  return (
    <NewMessageContainer>
      <form id={`${chatId}-new-message-form`} onSubmit={handleSubmit} style={{ width: '100%' }}>
        <VerticallyCentralizedContainer>
          <InputDiv
            contentEditable
            onInput={e => setContent(e.currentTarget.textContent)}
            ref={inputRef}
            onKeyDown={handleKeyDown}
            id={`${chatId}-input`}
          />
          {content !== '' ? <SendButton className='btn-send'><MdSend/></SendButton> : <DisabledSendButton className='btn-send-disabled'><MdSend/></DisabledSendButton> }
        </VerticallyCentralizedContainer>
      </form>
    </NewMessageContainer>
  )
}

NewMessageForm.propTypes = {
  chatId: PropTypes.number.isRequired,
}

export default NewMessageForm
