import { useState, useContext, useEffect } from 'react'
import {
  Routes,
  Route,
  // Navigate,
  useMatch
} from 'react-router-dom'
import { useQuery } from '@apollo/client'
import LandingPage from './components/LangingPage'
import Menubar from './components/Menubar'
import ChatView from './components/chat/ChatView'
import ChatPreview from './components/chat/ChatPreview'
import AccountConfirmed from './components/userauth/AccountConfirmed'
import { Page } from './styles/style'
import { UserContext } from './contexts/UserContext'
import { USER_CHATS, CHAT_REQUESTS } from './gql/queries'


function App() {
  const { authenticated } = useContext(UserContext)
  const [ chats, setChats ] = useState([])
  const [ chatRequests, setChatRequests ] = useState([])
  const chatsQuery = useQuery( USER_CHATS, {
    fetchPolicy: 'network-only'
  })
  const chatRequestsQuery = useQuery(CHAT_REQUESTS)

  useEffect(() => {
    if (!(chatsQuery.loading || chatsQuery.error) && chatsQuery.data) {
      setChats(chatsQuery.data.getUserChats)
    }
  }, [chatsQuery.loading, chatsQuery.error, chatsQuery.data])

  useEffect(() => {
    if (!(chatRequestsQuery.loading || chatRequestsQuery.error) && chatRequestsQuery.data) {
      setChatRequests(chatRequestsQuery.data.getChatRequests)
    }
  }, [chatRequestsQuery])

  const chatMatch = useMatch('/chats/:id')
  const chatById = chatsQuery.data && chats && chatMatch
    ? chats.find(c => c.id === Number(chatMatch.params.id))
    : null

  const home = () => {
    if (!authenticated) {
      return (
        <LandingPage />
      )
    }
    return (
      <>
        <Menubar />
        { chatRequests.length }
        { chatRequests.length > 0 && <button>View {chatRequests.length} incoming requests</button>}
        { chats && chats.map(chat => <ChatPreview chat={ chat } key={ chat.id }/>) }
      </>
    )
  }

  return (
    <Page>
      <Routes>
        <Route path='/' element={ home() } />
        <Route path='/chats/:id' element={<ChatView chat={ chatById } />} />
        <Route path='/accountconfirmation/:code' element={<AccountConfirmed />} />
      </Routes>
    </Page>
  )
}

export default App
