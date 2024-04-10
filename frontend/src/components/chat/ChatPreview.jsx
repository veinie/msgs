import PropTypes from 'prop-types'
import { ChatPreviewLink } from '../../styles/style'
import { epochToHumanReadable as formatTime } from '../../util/time'
import { useContext } from 'react'
import { UserContext } from '../../contexts/UserContext'

const ChatPreview = ({ chat, visibleElement, setVisibleElement }) => {
  const { user } = useContext(UserContext)

  return (
    <ChatPreviewLink onClick={() => setVisibleElement(chat.id) } className={ visibleElement === chat.id ? 'active-element' : '' } >
      {chat.id}<br/>
      { chat.users && chat.users.filter(u => u.id !== user.id).map(u => u.username) } <br />
      <i>{ formatTime(chat.latestMessageAt) }</i>
    </ChatPreviewLink>
  )
}

ChatPreview.propTypes = {
  chat: PropTypes.object,
  visibleElement: PropTypes.number.isRequired,
  setVisibleElement: PropTypes.func.isRequired,
}

export default ChatPreview
