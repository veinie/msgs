import PropTypes from 'prop-types'
import { useState } from 'react'
import { useSubscription, useQuery } from '@apollo/client'
import { SUBSCRIBE_CHAT_MESSAGES } from '../../gql/subscriptions'
import { GET_CHAT_MESSAGES, GET_CHAT_USERS } from '../../gql/queries'
import { ChatViewContainer, MessageListContainer } from '../../styles/style'
import Message from './Message'
import NewMessageForm from './NewMessageForm'

const ChatView = ({ chat, isVisible }) => {
  const [ messages, setMessages ] = useState([])
  const [ users, setUsers ] = useState([])
  // const client = useApolloClient()

  const variables = {
    chatId: chat.id
  }

  useQuery(GET_CHAT_USERS, {
    fetchPolicy: 'cache-first',
    variables,
    onCompleted: (data) => {
      setUsers(
        data.getChatUsers
          .map(u => u.username)
      )
    }
  })

  const messageQuery = useQuery(GET_CHAT_MESSAGES, {
    fetchPolicy: 'cache-first',
    variables,
    onCompleted: (data) => {
      setMessages(data.getChatMessages)
    }
  })

  try {
    useSubscription(SUBSCRIBE_CHAT_MESSAGES, {
      variables,
      onSubscriptionData: ({ subscriptionData }) => {
        // writeMessageToCache(subscriptionData)
        const newMessage = subscriptionData.data.newMessageToChat
        setMessages(prevMessages => [...prevMessages, newMessage])
        messageQuery.refetch()
      }
    })
  } catch (error) {
    console.log(error)
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

  // An attempt to make the cache update locally so that no refetch would be
  // needed for the chatPreview to recognize newer messages but
  // unfortunately no solution is currently found for the manual cache modification to
  // be recognized by the client.wathQuery... Will be coming back to this later
  //
  // const writeMessageToCache = (newMessage) => {
  //   client.cache.modify({
  //     id: client.cache.identify({__typename: 'Message', chatId: chat.id }),
  //     fields: {
  //       getChatMessages(existingMessages = []) {
  //         const updatedMessages = [...existingMessages, newMessage]
  //         return updatedMessages
  //       }
  //     }
  //   })
  // }
  //
  // const writeMessageToCache = (newMessage) => {
  //   const queryResult = client.readQuery({
  //     query: GET_CHAT_MESSAGES,
  //       variables
  //   })
  //   client.writeQuery({
  //     query: GET_CHAT_MESSAGES,
  //     variables,
  //     data: { ...queryResult, newMessage }
  //   })
  // }