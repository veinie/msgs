import PropTypes from 'prop-types'
import { useState, useEffect } from 'react'
import { ChatPreviewLink } from '../../styles/style'
import { epochToHumanReadable as formatTime } from '../../util/time'
import { useQuery } from '@apollo/client'
import { GET_CHAT_USERS } from '../../gql/queries'
import { useContext } from 'react'
import { UserContext } from '../../contexts/UserContext'


const ChatPreview = ({ chat, visibleElement, setVisibleElement }) => {
  const { user } = useContext(UserContext)
  const [ participants, setParticipants ] = useState([])
  const usersQuery = useQuery(GET_CHAT_USERS, {
    variables: {
      chatId: chat.id
    }
  })

  useEffect(() => {
    if ((!usersQuery.loading || !usersQuery.error) && usersQuery.data) {
      setParticipants(
        usersQuery.data.getChatUsers
          .filter(u => u.username !== user.username)
          .map(u => u.username).join(', ')
      )
    }
  }, [usersQuery, user.username])


  return (
    // <ChatPreviewLink to={ `/chats/${chat.id}` }>
    <ChatPreviewLink onClick={() => setVisibleElement(chat.id) } className={ visibleElement === chat.id ? 'active-element' : '' } >
      { participants } <br />
      <i>{ formatTime(chat.updatedAt) }</i>
    </ChatPreviewLink>
  )
}

ChatPreview.propTypes = {
  chat: PropTypes.object,
  visibleElement: PropTypes.number.isRequired,
  setVisibleElement: PropTypes.func.isRequired
}

export default ChatPreview
