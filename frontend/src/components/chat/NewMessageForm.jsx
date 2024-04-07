import PropTypes from 'prop-types'
import { useMutation } from "@apollo/client"
import { useState } from 'react'
import { NewMessageContainer, InputDiv, SendButton, VerticallyCentralizedContainer, DisabledSendButton } from "../../styles/style"
import { ADD_MESSAGE } from "../../gql/mutations"

const NewMessageForm = ({ chatId }) => {
  const [content, setContent] = useState('')
  const [send] = useMutation(ADD_MESSAGE)

  const handleSubmit = async (event) => {
    event.preventDefault()
    if (!content) return
    const response = await send({ variables: { chatId, content } })
    console.log(response)
    setContent('')
    document.getElementById(`${chatId}-input`).textContent = ''
  }

  return (
    <NewMessageContainer>
      <form id={`${chatId}-new-message-form`} onSubmit={handleSubmit} style={{ width: '100%' }}>
        <VerticallyCentralizedContainer>
          <InputDiv contentEditable onInput={e => setContent(e.currentTarget.textContent)} id={`${chatId}-input`}></InputDiv>
          {content !== '' ? <SendButton className='accent'>Send</SendButton> : <DisabledSendButton>Send</DisabledSendButton> }
        </VerticallyCentralizedContainer>
      </form>
    </NewMessageContainer>
  )
}

NewMessageForm.propTypes = {
  chatId: PropTypes.number.isRequired,
}

export default NewMessageForm
