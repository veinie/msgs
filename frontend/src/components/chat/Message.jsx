import PropTypes from 'prop-types'
import { useMemo } from 'react'
import { MessageContainer } from '../../styles/style'
import { epochToHumanReadable as formatTime } from '../../util/time'
import { useContext } from 'react'
import { UserContext } from '../../contexts/UserContext'

const Message = ({ message }) => {
  const { user } = useContext(UserContext)
  const createdAt = useMemo(() => formatTime(message.createdAt), [message.createdAt])


  return (
    <MessageContainer className={ message.user.id === user.id ? 'user-message' : 'not-user-message' }>
      <div className='message-sender'>
        { message.user.username } at <i>{ createdAt }</i> { message.createdAt !== message.updatedAt && '(edited)' }:
      </div>
      <div className='message-content'>
        { message.content }
      </div>

    </MessageContainer>
  )
}

Message.propTypes = {
  message: PropTypes.object
}

export default Message
