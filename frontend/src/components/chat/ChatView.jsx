import PropTypes from 'prop-types'
import { ChatViewContainer } from '../../styles/style'
import { epochToHumanReadable as formatTime } from '../../util/time'
import Message from './Message'
import NewMessageForm from './NewMessageForm'

const ChatView = ({ chat }) => {

  const sortByCreatedAt = (objects) => {
    return objects.sort((a, b) => a.createdAt - b.createdAt);
  }

  const messages = sortByCreatedAt([...chat.messages])
  const users = chat.users.map(user => user.username).join(', ')

  return (
    <ChatViewContainer>
      <p>{ users }</p>
      <i>{ formatTime(chat.updatedAt) }</i>
      { messages.map(message => (
        <Message key={ message.id } message={ message } />
      ))}
      <NewMessageForm chatId={ chat.id }/>
    </ChatViewContainer>
  )
}

ChatView.propTypes = {
  chat: PropTypes.object
}

export default ChatView
