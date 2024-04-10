import PropTypes from 'prop-types'
import { useState, useEffect, useRef, useLayoutEffect, useContext } from 'react'
import { useSubscription, useQuery, useApolloClient } from '@apollo/client'
import { SUBSCRIBE_CHAT_MESSAGES } from '../../gql/subscriptions'
import { GET_CHAT_MESSAGES } from '../../gql/queries'
import { ChatViewContainer, MessageListContainer } from '../../styles/style'
import Message from './Message'
import NewMessageForm from './NewMessageForm'
import { ChatsContext } from '../../contexts/ChatsContext'

const ChatView = ({ chat, visibleElement }) => {
  const { chats, setChats } = useContext(ChatsContext)
  const [messages, setMessages] = useState([])
  const lastMessageRef = useRef(null)
  const client = useApolloClient()

  const variables = {
    chatId: chat.id
  }

  const sortMessages = (data) => {
    if (data.length === 1) return data
    return [...data].sort((a, b) => a.createdAt - b.createdAt)
  }

  useQuery(GET_CHAT_MESSAGES, {
    fetchPolicy: 'cache-first',
    variables,
    onCompleted: (data) => {
      if (data.getChatMessages && data.getChatMessages.length > 0) {
        const sortedMessages = sortMessages(data.getChatMessages)
        setMessages(sortedMessages)
        setChats(
          [...chats].map(
            c => c.id !== chat.id
              ? c
              : { ...c, latestMessageAt: sortedMessages[sortedMessages.length -1].createdAt }
          )
        )
      }
    }
  }, [])

  useSubscription(SUBSCRIBE_CHAT_MESSAGES, {
    variables,
    onData: ({ data }) => {
      const newMessage = data.data.newMessageToChat
      const sortedMessages = sortMessages([...messages, newMessage])
      setMessages(sortedMessages)
      setChats(
        chats.map(
          c => c.id !== chat.id
            ? c
            : { ...c, latestMessageAt: newMessage.createdAt }
        )
      )
      client.writeQuery({
        query: GET_CHAT_MESSAGES,
        variables,
        data: {
          getChatMessages: [...messages, newMessage]
        }
      })
    },
    onError: (error) => {
      console.log(error)
    }
  })

  useEffect(() => {
    setTimeout(() => {
      lastMessageRef.current.scrollIntoView({
        block: 'end',
      })
    }, 500)
  }, [messages.length, messages])

  useLayoutEffect(() => {
    lastMessageRef.current.scrollIntoView({
      block: 'end',
    })
  })

  const deleteMessageFromList = (messageId) => {
    setMessages(messages.filter(m => m.id !== messageId))
  }

  const updateMessageOnList = (messageId, updatedMessage) => {
    setMessages(messages.map(m => m.id !== messageId ? m : updatedMessage))
  }

  console.log('Message rendered')

  if (!chat) return <div>Loading data...</div>

  const displayMessages = () => {
    if (messages && messages !== undefined && messages[0] !== undefined && messages.length === 0) return <p>Nothing yet...</p>
    return (
      messages.map(message => (
        <Message
          key={ message.id + message.createdAt }
          message={ message }
          deleteMessageFromList={deleteMessageFromList}
          updateMessageOnList={updateMessageOnList}
        />
      ))
    )
  }

  return (
    <ChatViewContainer style={{ display: visibleElement === chat.id ? 'block' : 'none' }}>
      <p>{ chat.users && chat.users.map(u => u.username).join(', ') }</p>
      <MessageListContainer id={ `${chat.id}_message-list` }>
        { displayMessages() }
        <div ref={lastMessageRef} />
      </MessageListContainer>
      <NewMessageForm chatId={ chat.id } updateMessages={ setMessages } />
    </ChatViewContainer>
  )
}

ChatView.propTypes = {
  chat: PropTypes.object.isRequired,
  visibleElement: PropTypes.number.isRequired
}

export default ChatView
