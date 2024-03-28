import PropTypes from 'prop-types'
import { useMutation } from "@apollo/client"
import useField from "../../hooks/useField"
import { NewMessageContainer } from "../../styles/style"
import { ADD_MESSAGE } from "../../gql/mutations"

const NewMessageForm = ({ chatId }) => {
  const { reset: resetContent, ...content } = useField('text')
  const [ send ] = useMutation(ADD_MESSAGE)

  const handleSubmit = async (event) => {
    event.preventDefault()
    send({ variables: { chatId, content: content.value } })
    resetContent()
  }
  return (
    <NewMessageContainer>
      <form id='new-message-form' onSubmit={handleSubmit} style={{ width: '100%' }}>
        <textarea required rows='5' { ...content }  style={{ width: 'calc(100% - 15%)' }}/>
        <button id='send-message-btn' type='submit' style={{ width: '14%' }}>Send</button>
      </form>
    </NewMessageContainer>
  )
}

NewMessageForm.propTypes = {
  chatId: PropTypes.number.isRequired
}

export default NewMessageForm