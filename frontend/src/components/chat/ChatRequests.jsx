import { useMutation } from '@apollo/client'
import PropTypes, { object } from 'prop-types'
import { ACCEPT_CHAT_REQUEST } from '../../gql/mutations'

const ChatRequests = ({ chatRequests, updateChatsAndRequests, isVisible }) => {
  const [acceptRequest] = useMutation(ACCEPT_CHAT_REQUEST)

  const handleClick = (requestId) => {
    acceptRequest({ variables: {
      requestId
    }})
    updateChatsAndRequests()
  }
  if (!chatRequests) return <div style={{ padding: '1em' }}>No new requests...</div>
  return(
    <div style={{ display: isVisible ? 'block' : 'none', padding: '1em' }} className='full-width'>
      {chatRequests.map(request => (
        <div key={request.id}>
          { request.requester.username } invited you to chat!
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
  chatRequests: PropTypes.arrayOf(object),
  updateChatsAndRequests: PropTypes.func.isRequired,
  isVisible: PropTypes.bool.isRequired
}

export default ChatRequests
