import PropTypes from 'prop-types'
import { ChatPreviewLink } from '../../styles/style'
import { epochToHumanReadable as formatTime } from '../../util/time'

const ChatPreview = ({ chat }) => {

  const formatNames = (names) => {
    const maxDisplayCount = 3
    if (names.length <= maxDisplayCount) {
      return names.join(', ')
    } else {
      const displayedNames = names.slice(0, maxDisplayCount).join(', ')
      const remainingCount = names.length - maxDisplayCount
      return `${displayedNames}, and ${names.slice(-1)}${remainingCount > 1 ? ` ${remainingCount} more` : ''}`
    }
  }

  return (
    <ChatPreviewLink to={ `/chats/${chat.id}` }>
      { formatNames(chat.users.map(user => user.username)) } <br />
      <i>{ formatTime(chat.updatedAt) }</i>
      {/* <p>{ chat.messages.map(message => <p key={message.id}>{message.user.username} ({message.createdAt}): {message.content}</p>) }</p> */}
    </ChatPreviewLink>
  )
}

ChatPreview.propTypes = {
  chat: PropTypes.object
}

export default ChatPreview
