import PropTypes from 'prop-types'
import { useMemo } from 'react'
import { MessageContainer } from '../../styles/style'
import { epochToHumanReadable as formatTime } from '../../util/time'

const Message = ({ message }) => {
  const createdAt = useMemo(() => formatTime(message.createdAt), [message.createdAt])

  return (
    <MessageContainer>
      { message.user.username } at <i>{ createdAt }</i> { message.createdAt !== message.updatedAt && '(edited)' }:
      <p>{ message.content }</p>
    </MessageContainer>
  )
}

Message.propTypes = {
  message: PropTypes.object
}

export default Message
