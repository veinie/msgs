import PropTypes from 'prop-types'

const ChatList = ({ chats }) => {

  return (
    <>
      <p>User chats:</p>
      {chats}
    </>
  )
}

ChatList.propTypes = {
  chats: PropTypes.array
}

export default ChatList
