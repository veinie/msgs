import { useMutation } from '@apollo/client'
import PropTypes from 'prop-types'
import { ACCEPT_CHAT_REQUEST } from '../../gql/mutations'

const ChatRequest = ({ request, updateChatsAndRequests }) => {
  const [acceptRequest] = useMutation(ACCEPT_CHAT_REQUEST, {
    variables: {
      requestId: request.id
    }
  })
  console.log(request)

  const handleClick = () => {
    acceptRequest()
    updateChatsAndRequests()
  }
  if (!request) return null
  return (
    <div>
       { request.requester.username } invited you to chat!
       <button onClick={handleClick}>Accept!</button>
    </div>
  )
}

ChatRequest.propTypes = {
  request: PropTypes.object.isRequired,
  updateChatsAndRequests: PropTypes.func.isRequired,
}

export default ChatRequest