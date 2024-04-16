import ReactDOM from 'react-dom/client'
import { BrowserRouter as Router } from 'react-router-dom' 
import {
  ApolloClient,
  ApolloProvider,
  InMemoryCache,
  createHttpLink,
  split
} from '@apollo/client'
import { setContext } from '@apollo/client/link/context'
import { getMainDefinition } from '@apollo/client/utilities'
import { GraphQLWsLink } from '@apollo/client/link/subscriptions'
import { createClient } from 'graphql-ws'
import App from './App.jsx'
import { UserProvider } from './contexts/UserContext.jsx'
import { ChatsProvider } from './contexts/ChatsContext.jsx'

const CHATS_URL = import.meta.env.VITE_CHATS_URL
const CHATS_SUB_URL = import.meta.env.VITE_CHATS_SUB_URL

const authLink = setContext(async (_, { headers }) => {
  const user = JSON.parse(localStorage.getItem('MsgsUser'))
  return {
    headers: {
      ...headers,
      authorization: user ? `Bearer ${user.token}` : null
    }
  }
})

const httpLink = createHttpLink({
  uri: `${CHATS_URL}/api`
})

const wsLink = new GraphQLWsLink(createClient({
  url: `${CHATS_SUB_URL}/api`
}))

const splitLink = split(
  ({ query }) => {
    const definition = getMainDefinition(query)
    return (
      definition.kind === 'OperationDefinition' &&
      definition.operation === 'subscription'
    )
  },
  authLink.concat(wsLink),
  authLink.concat(httpLink)
)

const client = new ApolloClient({
  cache: new InMemoryCache(),
  link: splitLink,
  defaultOptions: {
    watchQuery: {
      fetchPolicy: 'network-only'
    }
  }
})

ReactDOM.createRoot(document.getElementById('root')).render(
  <Router>
    <UserProvider>
      <ApolloProvider client={client}>
        <ChatsProvider>
          <App />
        </ChatsProvider>
      </ApolloProvider>
    </UserProvider>
  </Router>
)
