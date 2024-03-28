import { useState, useContext, useEffect, useCallback } from 'react'
import {
  Routes,
  Route,
  // Navigate,
  useMatch
} from 'react-router-dom'
import { useQuery, useSubscription } from '@apollo/client'
import LandingPage from './components/LangingPage'
import Menubar from './components/Menubar'
import ChatView from './components/chat/ChatView'
// import ChatList from './components/chat/ChatList'
import ChatPreview from './components/chat/ChatPreview'
// import Home from './components/Home'
import { Page } from './styles/style'
import { UserContext } from './contexts/UserContext'
import { USER_CHATS } from './gql/queries'
import { SUBSCRIBE_CHAT_MESSAGES } from './gql/subscriptions'


// eslint-disable-next-line react/prop-types
const MessageSubscription = ({ chatId, onNewMessage }) => {
  useSubscription(SUBSCRIBE_CHAT_MESSAGES, {
    variables: {
      chatId
    },
    onSubscriptionData: ({ subscriptionData }) => {
      const newMessage = subscriptionData.data.newMessage
      console.log(newMessage)
      onNewMessage(newMessage)
    }
  })
  return null
}

function App() {
  const { authenticated } = useContext(UserContext)
  const [ chats, setChats ] = useState([])
  const [ messageSubscriptions, setMessageSubscriptions ] = useState({})
  const chatsQuery = useQuery( USER_CHATS )

  useEffect(() => {
    if (!(chatsQuery.loading || chatsQuery.error) && chatsQuery.data) {
      setChats(chatsQuery.data.getUserChats)
      // console.log(chatsQuery)
    }
  }, [chatsQuery.loading, chatsQuery.error, chatsQuery.data])

  const handleNewMessage = useCallback((message) => {
    console.log(message)
    const updateChat = { ...chats.find(c => c.id === message.chatId) }
    updateChat.messsages.push(message)
    setChats((prevChats) =>
      prevChats.map(chat => chat.id !== message.chatId ? chat : updateChat)
    )
  }, [chats])

  useEffect(() => {
    // const subscriptions = chats.map(chat => {chat.id, MessageSubscription(chat.id, handleNewMessage)})
    const subscriptions = {}
    // chats.forEach(chat => {
    //   const newSubscription = MessageSubscription(chat.id, handleNewMessage)
    //   subscriptions[chat.id] = newSubscription
    // })
    chats.forEach((chat) => {
      <MessageSubscription
        key={chat.id}
        chatId={chat.Id}
        onNewMessage={handleNewMessage}
      />
    })
    Object.values(messageSubscriptions).forEach((sub) => {
      sub.unsubscribe()
    })
    setMessageSubscriptions((prevSubscriptions) => ({
      ...prevSubscriptions,
      ...subscriptions
    }));
  }, [chats, handleNewMessage])


  const chatMatch = useMatch('/chats/:id')
  const chatById = chatsQuery.data && chats && chatMatch
    ? chats.find(c => c.id === Number(chatMatch.params.id))
    : null

  
  if (!authenticated) {
    return (
      <Page>
        <LandingPage />
      </Page>
    )
  }

  const showChats = () => {
    if (chats) {
      return chats.map(chat => <ChatPreview chat={ chat } key={ chat.id }/>)
    }
  }

  return (
    <Page>
      <Menubar />
      { showChats() }
      <Routes>
        <Route path='/chats/:id' element={<ChatView chat={ chatById } />} />
      </Routes>
    </Page>
  )
}

export default App
