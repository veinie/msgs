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

  return (
    <ChatViewContainer>
      <p>{ users }</p>
      <i>{ formatTime(chat.updatedAt) }</i>
      <MessageListContainer>
        { messages.map(message => (
          <Message key={ message.id + message.createdAt } message={ message } />
        ))}
      </MessageListContainer>
      <NewMessageForm chatId={ chat.id }/>
    </ChatViewContainer>
  )
}

ChatView.propTypes = {
  chat: PropTypes.object
}

export default ChatView


// import PropTypes from 'prop-types'
// import { useState, useEffect } from 'react'
// import { useSubscription } from '@apollo/client'
// import { SUBSCRIBE_CHAT_MESSAGES } from '../../gql/subscriptions'
// import { ChatViewContainer } from '../../styles/style'
// import { epochToHumanReadable as formatTime } from '../../util/time'
// import Message from './Message'
// import NewMessageForm from './NewMessageForm'

// const ChatView = ({ chat }) => {
//   // const [ messages, setMessages ] = useState([])
//   let messages = []
//   let users = []


//   useSubscription(SUBSCRIBE_CHAT_MESSAGES, {
//     variables: {
//       chatId: chat.id
//     },
//     onSubscriptionData: ({ subscriptionData }) => {
//       // console.log(subscriptionData)
//       const newMessage = subscriptionData.data.newMessageToChat
//       messages = messages.concat(newMessage)
//       alert(JSON.stringify(newMessage))
//     }
//   })

//   const sortByCreatedAt = (objects) => {
//     return objects.sort((a, b) => a.createdAt - b.createdAt);
//   }

//   try {
//     messages = sortByCreatedAt([...chat.messages])
//     users = chat.users.map(user => user.username).join(', ')
//   } catch (error) {
//     console.log(error)
//     return <div>Something went wrong</div>
//   }

//   if (!chat) return <div>Loading data...</div>

//   return (
//     <ChatViewContainer>
//       <p>{ users }</p>
//       <i>{ formatTime(chat.updatedAt) }</i>
//       { messages.map(message => (
//         <Message key={ message.id + message.createdAt } message={ message } />
//       ))}
//       <NewMessageForm chatId={ chat.id }/>
//     </ChatViewContainer>
//   )
// }

// ChatView.propTypes = {
//   chat: PropTypes.object
// }

// export default ChatView
