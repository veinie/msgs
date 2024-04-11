import { useState, useEffect, useContext, createContext } from 'react'
import { useQuery } from '@apollo/client'
import { UserContext } from './UserContext'
import { USER_CHATS, CHAT_REQUESTS } from '../gql/queries'

const ChatsContext = createContext({ chats: [], requests: [] })

// eslint-disable-next-line react/prop-types
const ChatsProvider = ({ children }) => {
  const { user, setLogout } = useContext(UserContext)
  const [chats, setChats] = useState([])
  const [chatRequests, setChatRequests] = useState([])

  const handleQueryError = (error) => {
    console.log(error)
    if (
      error.graphQLErrors
      &&
      error.graphQLErrors.map(e => e.message).includes('Unauthorized')
    ) {
      setLogout()
    }
  }

  const chatsQuery = useQuery(USER_CHATS, {
    fetchPolicy: 'network-only',
    onCompleted: (data) => {
      setChats(data.getUserChats.map(c => ({ ...c, latestMessageAt: c.createdAt })))
    },
    onError: (error) => handleQueryError(error),
    skip: !user
  })

  const refetchChats = async () => {
    console.log('refetching')
    try {
      await chatsQuery.refetch()
    } catch (error) {
      handleQueryError(error)
    }
  }

  useEffect(() => {
    if (chatsQuery.data) {
      setChats(chatsQuery.data.getUserChats.map(c => ({ ...c, latestMessageAt: c.createdAt })))
    }
  }, [chatsQuery.data])

  useQuery(CHAT_REQUESTS, {
    onCompleted: (data) => {
      setChatRequests(data.getChatRequests)
    },
    onError: (error) => handleQueryError(error),
    skip: !user
  })

  const removeChatRequest = (reqId) => {
    setChatRequests([...chatRequests].filter(req => req.id !== reqId))
  }

  return(
    <ChatsContext.Provider
      value={{
        chats,
        setChats,
        refetchChats,
        chatRequests,
        setChatRequests,
        removeChatRequest
      }}
    >
      {children}
    </ChatsContext.Provider>
  )
}

export { ChatsContext, ChatsProvider }
