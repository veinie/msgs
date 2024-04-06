import { useEffect, useState } from 'react'
import { useMutation, useApolloClient } from '@apollo/client'
import PropTypes from 'prop-types'
import { ACCEPT_CHAT_REQUEST } from '../../gql/mutations'
import { CHAT_REQUESTS } from '../../gql/queries'


const ChatRequests = ({ isVisible }) => {
  const [ chatRequests, setChatRequests ] = useState([])
  const [acceptRequest] = useMutation(ACCEPT_CHAT_REQUEST)
  const client = useApolloClient()

  useEffect(() => {
    const cachedRequests = client.readQuery({
      query: CHAT_REQUESTS
    })
    if (cachedRequests) {
      setChatRequests(cachedRequests.getChatRequests)
    }
  }, [client])

  useEffect(() => {
    const requestCacheSubscription = client.watchQuery({
      query: CHAT_REQUESTS
    }).subscribe({
      next: (subdata) => {
        const newRequests = subdata.data.getChatRequests
        setChatRequests(newRequests)
      }
    })
    return () => {
      requestCacheSubscription.unsubscribe()
    }
  }, [client])

  const handleClick = (requestId) => {
    acceptRequest({ variables: {
      requestId
    }})
    // updateChatsAndRequests()
  }
  if (!chatRequests) return <div style={{ padding: '1em' }}>No new requests...</div>
  return(
    <div style={{ display: isVisible ? 'block' : 'none', padding: '1em' }} className='full-width'>
      {chatRequests.map(request => (
        <div key={request.id}>
          { request.requester.username || 'someone' } invited you to chat!
          <>
            <button style={{ marginLeft: '1em' }} onClick={() => handleClick(request.id)}>Accept!</button>
            <hr/>
          </>
        </div>
      ))}
    </div>
  )
}

ChatRequests.propTypes = {
  isVisible: PropTypes.bool.isRequired,
}

export default ChatRequests
