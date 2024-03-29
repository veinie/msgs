import PropTypes from 'prop-types'
import { useState, useEffect } from 'react'
import { useSubscription } from '@apollo/client'
import { SUBSCRIBE_CHAT_MESSAGES } from '../../gql/subscriptions'
import { ChatViewContainer, MessageListContainer } from '../../styles/style'
import { epochToHumanReadable as formatTime } from '../../util/time'
import Message from './Message'
import NewMessageForm from './NewMessageForm'

const ChatView = ({ chat }) => {
  const [ messages, setMessages ] = useState([])
  const [ users, setUsers ] = useState('')

  useEffect(() => {
    if (chat) {
      try {
        const softMessages = [...chat.messages]
        setMessages(sortByCreatedAt(softMessages))
        setUsers(chat.users.map(user => user.username).join(', '))
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

  const scrollableElement = document.getElementById('message-list')

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
    <ChatViewContainer>
      <p>{ users }</p>
      <i>{ formatTime(chat.updatedAt) }</i>
      <MessageListContainer id='message-list'>
        { messages.map(message => (
          <Message key={ message.id + message.createdAt } message={ message } />
        ))}
      </MessageListContainer>
      <NewMessageForm chatId={ chat.id } updateMessages={ setMessages } />
    </ChatViewContainer>
  )
}

ChatView.propTypes = {
  chat: PropTypes.object
}

export default ChatView
