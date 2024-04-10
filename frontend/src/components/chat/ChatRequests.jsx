import { useEffect, useState } from 'react'
import { useMutation, useApolloClient } from '@apollo/client'
import PropTypes from 'prop-types'
import { ACCEPT_CHAT_REQUEST, DECLINE_CHAT_REQUEST } from '../../gql/mutations'
import { CHAT_REQUESTS } from '../../gql/queries'
import { NavTogglerPlaceholder } from '../../styles/style'
import { Button } from '../../styles/style'
// import { CHAT_REQUESTS } from '../gql/queries'


const ChatRequests = ({ isVisible, setVisibleElement, refetchChats }) => {
  const [ chatRequests, setChatRequests ] = useState([])
  const client = useApolloClient()
  const [acceptRequest] = useMutation(ACCEPT_CHAT_REQUEST, {
    onCompleted: (data) => {
      refetchChats()
      setChatRequests(chatRequests.filter(r => r.id !== data.acceptChatRequest.id))
      client.query({
        query: CHAT_REQUESTS
      })
    },
    onError: (err) => {
      console.log(err)
    }
  })
  const [declineRequest] = useMutation(DECLINE_CHAT_REQUEST, {
    onCompleted: (data) => {
      console.log(data)
      setChatRequests(chatRequests.filter(r => r.id !== data.declineChatRequest.requestId))
      client.query({
        query: CHAT_REQUESTS
      })
    },
    onError: (err) => {
      console.log(err)
    }
  })

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
  }

  const handleDeclineClick = (requestId, requester) => {
    if (window.confirm(`Decline request to chat with ${requester}?`)) {
      declineRequest({
        variables: {
          requestId
        }
      })
    }
  }

  if (!chatRequests || chatRequests.length === 0) return <div style={{ display: isVisible ? 'block' : 'none', padding: '1em' }}>No new requests...</div>
  return(
    <div style={{ display: isVisible ? 'block' : 'none', padding: '1em' }} className='full-width'>
      <NavTogglerPlaceholder />
      {chatRequests.map(request => (
        <div key={request.id}>
          { request.requester.username ? request.requester.username : 'someone' } invited you to chat!
          <>
            <Button className='btn btn-primary' style={{ marginLeft: '1em' }} onClick={() => handleClick(request.id)}>Accept!</Button>
            <Button className='btn-light' style={{ marginLeft: '1em' }} onClick={() => handleDeclineClick(request.id, request.requester.username)}>Decline</Button>
            <hr/>
          </>
        </div>
      ))}
    </div>
  )
}

ChatRequests.propTypes = {
  isVisible: PropTypes.bool.isRequired,
  refetchChats: PropTypes.func.isRequired,
  setVisibleElement: PropTypes.func.isRequired,
}

export default ChatRequests
