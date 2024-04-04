import PropTypes from 'prop-types'
import { useState, useEffect } from 'react'
import { useApolloClient, useSubscription } from '@apollo/client'
import { SUBSCRIBE_CHAT_MESSAGES } from '../../gql/subscriptions'
import { GET_CHAT_USERS } from '../../gql/queries'
import { ChatViewContainer, MessageListContainer } from '../../styles/style'
import { epochToHumanReadable as formatTime } from '../../util/time'
import Message from './Message'
import NewMessageForm from './NewMessageForm'

const ChatView = ({ chat, isVisible }) => {
  const [ messages, setMessages ] = useState([])
  const [ users, setUsers ] = useState([])
  const client = useApolloClient()
  const cachedUsers = client.readQuery({
    query: GET_CHAT_USERS,
    variables: {
      chatId: chat.id
    }
  })

  useEffect(() => {
    console.log(cachedUsers)
    try {
      setUsers(cachedUsers.getChatUsers.map(u => u.username))
    } catch (error) {
      console.log(error)
    }
  }, [cachedUsers])

  useEffect(() => {
    if (chat) {
      try {
        const softMessages = [...chat.messages]
        setMessages(sortByCreatedAt(softMessages))
        setUsers(chat.users.map(user => user.username))
      } catch (error) {
        console.log(error)
      }
    }
  }, [chat])

  try {
    useSubscription(SUBSCRIBE_CHAT_MESSAGES, {
      variables: {
        chatId: chat.id
      },
      onSubscriptionData: ({ subscriptionData }) => {
        const newMessage = subscriptionData.data.newMessageToChat
        setMessages(messages.concat(newMessage))
      }
    })
  } catch (error) {
    console.log(error)
  }

  const sortByCreatedAt = (objects) => {
    return objects.sort((a, b) => a.createdAt - b.createdAt);
  }

  if (!chat) return <div>Loading data...</div>

  const scrollableElement = document.getElementById(`${chat.id}_message-list`)

  if (scrollableElement !== null) {
    scrollableElement.addEventListener('scroll', function(event) {
      const { scrollTop, scrollHeight, clientHeight } = event.target
  
      const isAtBottom = scrollTop + clientHeight >= scrollHeight
  
      if (!isAtBottom) {
        disableAutoScroll()
      }
    })

    scrollableElement.addEventListener('DOMSubtreeModified', checkAutoScroll)

    enableAutoScroll()

  }

  function scrollToBottom() {
    scrollableElement.scrollTop = scrollableElement.scrollHeight
  }

  function enableAutoScroll() {
    scrollableElement.setAttribute('data-auto-scroll', 'true')
    scrollToBottom()
  }

  function disableAutoScroll() {
    scrollableElement.setAttribute('data-auto-scroll', 'false')
  }

  function checkAutoScroll() {
    const autoScroll = scrollableElement.getAttribute('data-auto-scroll')
    if (autoScroll === 'true') {
      scrollToBottom()
    }
  }

  return (
    <ChatViewContainer style={{ display: isVisible ? 'block' : 'none' }}>
      <p>{ users && users.join(', ') }</p>
      <i>{ formatTime(chat.updatedAt) }</i>
      <MessageListContainer id={ `${chat.id}_message-list` }>
        { messages.map(message => (
          <Message key={ message.id + message.createdAt } message={ message } />
        ))}
      </MessageListContainer>
      <NewMessageForm chatId={ chat.id } updateMessages={ setMessages } />
    </ChatViewContainer>
  )
}

ChatView.propTypes = {
  chat: PropTypes.object,
  isVisible: PropTypes.bool.isRequired
}

export default ChatView
