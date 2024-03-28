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
  uri: 'http://localhost:3002/api'
})

const wsLink = new GraphQLWsLink(createClient({
  url: 'ws://localhost:3002/api'
}))

const splitLink = split(
  ({ query }) => {
    const definition = getMainDefinition(query)
    return (
      definition.kind === 'OperationDefinition' &&
      definition.operation === 'subscription'
    )
  },
  wsLink,
  authLink.concat(httpLink)
)

const client = new ApolloClient({
  cache: new InMemoryCache(),
  link: splitLink
})

ReactDOM.createRoot(document.getElementById('root')).render(
  <Router>
    <UserProvider>
      <ApolloProvider client={client}>
        <App />
      </ApolloProvider>
    </UserProvider>
  </Router>
)
