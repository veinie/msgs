import PropTypes from 'prop-types'
import { useState, useEffect } from 'react'
import { ChatPreviewLink } from '../../styles/style'
import { epochToHumanReadable as formatTime } from '../../util/time'
import { useApolloClient } from '@apollo/client'
import { GET_CHAT_USERS, GET_CHAT_MESSAGES } from '../../gql/queries'
import { useContext } from 'react'
import { UserContext } from '../../contexts/UserContext'


const ChatPreview = ({ chat, visibleElement, setVisibleElement }) => {
  const { user } = useContext(UserContext)
  const [ participants, setParticipants ] = useState([])
  const [latestMessage, setLatestMessage] = useState(null)
  const client = useApolloClient()
  const variables = {
    chatId: chat.id
  }

  useEffect(() => {
    const participantSubscription = client.watchQuery({
        query: GET_CHAT_USERS,
        variables
      }).subscribe({
        next: (subdata) => {
          setParticipants(
            subdata.data.getChatUsers
              .filter(u => u.username !== user.username)
              .map(u => u.username)
          )
        }
      })

    const messageSubscription = client.watchQuery({
      query: GET_CHAT_MESSAGES,
      variables,
    }).subscribe({
      next: (subscriptiondata) => {
        const messages = subscriptiondata.data.getChatMessages
        const subLatestMessage = messages.reduce((latest, current) => {
          if (!latest || current.createdAt > latest.createdAt) {
            return current
          }
          return latest
        }, null)
        setLatestMessage(subLatestMessage)
      }
    })

    return () => {
      participantSubscription.unsubscribe()
      messageSubscription.unsubscribe()
    }

  }, [client])

  return (
    // <ChatPreviewLink to={ `/chats/${chat.id}` }>
    <ChatPreviewLink onClick={() => setVisibleElement(chat.id) } className={ visibleElement === chat.id ? 'active-element' : '' } >
      { participants } <br />
      <i>{ latestMessage && formatTime(latestMessage.createdAt) }</i>
    </ChatPreviewLink>
  )
}

ChatPreview.propTypes = {
  chat: PropTypes.object,
  visibleElement: PropTypes.number.isRequired,
  setVisibleElement: PropTypes.func.isRequired
}

export default ChatPreview
