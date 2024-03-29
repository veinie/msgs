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
import { Page } from './styles/style'
import { UserContext } from './contexts/UserContext'
import { USER_CHATS } from './gql/queries'


function App() {
  const { authenticated } = useContext(UserContext)
  const [ chats, setChats ] = useState([])
  const chatsQuery = useQuery( USER_CHATS, {
    fetchPolicy: 'network-only'
  })

  useEffect(() => {
    if (!(chatsQuery.loading || chatsQuery.error) && chatsQuery.data) {
      setChats(chatsQuery.data.getUserChats)
    }
  }, [chatsQuery.loading, chatsQuery.error, chatsQuery.data])

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
