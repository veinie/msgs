import PropTypes from 'prop-types'
import { useMemo } from 'react'
import { MessageContainer } from '../../styles/style'
import { epochToHumanReadable as formatTime } from '../../util/time'
import { useContext } from 'react'
import { UserContext } from '../../contexts/UserContext'
import { useMutation } from '@apollo/client'
import { DELETE_MESSAGE } from '../../gql/mutations'

const Message = ({ message, deleteMessageFromList }) => {
  const { user } = useContext(UserContext)
  const createdAt = useMemo(() => formatTime(message.createdAt), [message.createdAt])
  const [deleteMessage] = useMutation(DELETE_MESSAGE, {
    onCompleted: () => {
      deleteMessageFromList(message.id)
    },
    onError: (err) => {
      console.log(err)
    }
  })

  const handleClick = () => {
    deleteMessage({ variables: { id: message.id } })

  }

  return (
    <MessageContainer className={ message.user.id === user.id ? 'user-message' : 'not-user-message' }>
      <div className='message-sender'>
        { message.user.username } at <i>{ createdAt }</i> { message.createdAt !== message.updatedAt && '(edited)' }:
        { message.user.id === user.id && <button onClick={handleClick}>Delete message</button> }
      </div>
      <div className='message-content'>
        { message.content }
      </div>

    </MessageContainer>
  )
}

Message.propTypes = {
  message: PropTypes.object,
  deleteMessageFromList: PropTypes.func.isRequired
}

export default Message
