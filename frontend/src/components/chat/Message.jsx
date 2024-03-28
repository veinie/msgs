import PropTypes from 'prop-types'
import { MessageContainer } from '../../styles/style'
import { epochToHumanReadable as formatTime } from '../../util/time'

const Message = ({ message }) => {

  return (
    <MessageContainer>
      { message.user.username } at <i>{ formatTime(message.createdAt) }</i> { message.createdAt !== message.updatedAt && '(edited)' }:
      <p>{ message.content }</p>
    </MessageContainer>
  )
}

Message.propTypes = {
  message: PropTypes.object
}

export default Message
