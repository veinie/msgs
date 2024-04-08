import PropTypes from 'prop-types'
import { useState, useEffect, useRef, useLayoutEffect } from 'react'
import { useSubscription, useQuery } from '@apollo/client'
import { SUBSCRIBE_CHAT_MESSAGES } from '../../gql/subscriptions'
import { GET_CHAT_MESSAGES, GET_CHAT_USERS } from '../../gql/queries'
import { ChatViewContainer, MessageListContainer } from '../../styles/style'
import Message from './Message'
import NewMessageForm from './NewMessageForm'

const ChatView = ({ chat, isVisible }) => {
  const [ messages, setMessages ] = useState([])
  const [ users, setUsers ] = useState([])
  const lastMessageRef = useRef(null)

  const variables = {
    chatId: chat.id
  }

  const sortMessages = (data) => {
    return [...data].sort((a, b) => a.createdAt - b.createdAt)
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
      const sortedMessages = sortMessages(data.getChatMessages)
      setMessages(sortedMessages)
    }
  })

  try {
    useSubscription(SUBSCRIBE_CHAT_MESSAGES, {
      variables,
      onSubscriptionData: ({ subscriptionData }) => {
        const newMessage = subscriptionData.data.newMessageToChat
        setMessages(prevMessages => sortMessages([...prevMessages, newMessage]))
        messageQuery.refetch()
      }
    })
  } catch (error) {
    console.log(error)
  }

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

  if (!chat) return <div>Loading data...</div>

  const displayMessages = () => {
    if (messages.length === 0) return <p>Nothing yet...</p>
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
    <ChatViewContainer style={{ display: isVisible ? 'block' : 'none' }}>
      <p>{ users && users.join(', ') }</p>
      <MessageListContainer id={ `${chat.id}_message-list` }>
        { displayMessages() }
        <div ref={lastMessageRef} />
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
