import { useContext } from 'react'
import { useMutation, useSubscription } from '@apollo/client'
import PropTypes from 'prop-types'
import { ACCEPT_CHAT_REQUEST, DECLINE_CHAT_REQUEST } from '../../gql/mutations'
import { NavTogglerPlaceholder } from '../../styles/style'
import { Button } from '../../styles/style'
import { ChatsContext } from '../../contexts/ChatsContext'
import { UserContext } from '../../contexts/UserContext'
import { SUBSCRIBE_CHAT_REQUESTS } from '../../gql/subscriptions'

const ChatRequests = ({ isVisible, setVisibleElement }) => {
  const { user } = useContext(UserContext)
  const { chatRequests, setChatRequests, refetchChats, removeChatRequest } = useContext(ChatsContext)

  const [acceptRequest] = useMutation(ACCEPT_CHAT_REQUEST, {
    onCompleted: (data) => {
      refetchChats()
      setChatRequests(chatRequests.filter(r => r.id !== data.acceptChatRequest.id))
      setVisibleElement(data.acceptChatRequest.id)
    },
    onError: (err) => {
      console.log(err)
    }
  })
  const [declineRequest] = useMutation(DECLINE_CHAT_REQUEST, {
    onCompleted: (data) => {
      setChatRequests(chatRequests.filter(r => r.id !== data.declineChatRequest.requestId))
    },
    onError: (err) => {
      console.log(err)
    }
  })

  useSubscription(SUBSCRIBE_CHAT_REQUESTS, {
    variables: {
      userId: user.id
    },
    onData: ({ data }) => {
      const newRequest = data.data.newChatRequest
      setChatRequests([...chatRequests, newRequest])
    },
    onError: (error) => {
      console.log(error)
    }
  })

  const handleAcceptClick = (requestId) => {
    removeChatRequest(requestId)
    acceptRequest({
      variables: {
        requestId
      }
    })
  }

  const handleDeclineClick = (requestId, requester) => {
    if (window.confirm(`Decline request to chat with ${requester}?`)) {
      declineRequest({
        variables: {
          requestId
        }
      })
      removeChatRequest(requestId)
    }
  }

  if (
    !chatRequests
    ||
    chatRequests.length === 0
    ||
    chatRequests[0] === undefined
  ) {
    return <div style={{ display: isVisible ? 'block' : 'none', padding: '1em' }}>No new requests...</div>
  }
   
  return(
    <div
      style={{ display: isVisible ? 'block' : 'none', padding: '1em', boxSizing: 'border-box' }}
      className='full-width main-window'
    >
      <NavTogglerPlaceholder />
      {chatRequests && chatRequests.map(request => (
        <div key={request.id}>
          { request.requester ? request.requester.username : 'Someone' } invited you to chat!
          <div style={{ margin: '10px 0 10px 0' }}>
            <Button
              className='btn btn-primary'
              style={{ marginLeft: '1em' }}
              onClick={() => handleAcceptClick(request.id)}
            >
              Accept!
            </Button>
            <Button
              className='btn-light'
              style={{ marginLeft: '1em' }}
              onClick={() => handleDeclineClick(request.id, request.requester.username)}
            >
              Decline
            </Button>
            <hr/>
          </div>
        </div>
      ))}
    </div>
  )
}

ChatRequests.propTypes = {
  isVisible: PropTypes.bool.isRequired,
  setVisibleElement: PropTypes.func.isRequired,
}

export default ChatRequests
