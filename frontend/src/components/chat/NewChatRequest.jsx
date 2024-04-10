import PropTypes from 'prop-types'
import { useState, useEffect, useContext } from 'react'
import { useLazyQuery, useMutation } from "@apollo/client"
import { FIND_USER } from "../../gql/queries"
import { NEW_CHAT } from '../../gql/mutations'
import useField from "../../hooks/useField"
import '../../styles/modalStyle.css'
import { UserPreviewSelectable } from '../../styles/style'
import { UserContext } from '../../contexts/UserContext'

const NewChatRequest = ({ isOpen, onClose, message, setVisibleElement, setChats }) => {
  const { user } = useContext(UserContext)
  const [refreshInterval, setRefreshInterval] = useState(null)
  const { reset: resetSearchQuery, ...search } = useField('text')
  const [shouldExecuteQuery, setShouldExecuteQuery] = useState(false);
  const [ executeQuery, { data,  refetch }] = useLazyQuery(FIND_USER)
  const [ sendRequest ] = useMutation(NEW_CHAT, {
    onCompleted: (data) => {
      const chatId = data.createChat.id
      setChats((existingChats) => [...existingChats, data.createChat])
      setVisibleElement(chatId)
    }
  })

  useEffect(() => {
    if (search.value && (search.value.length >= 3 || (!isNaN(search.value) && !isNaN(parseFloat(search.value)) && search.value.length > 0))) {
      setShouldExecuteQuery(true)
    } else {
      setShouldExecuteQuery(false)
    }
  }, [search.value])

  useEffect(() => {
    if (shouldExecuteQuery) {
      executeQuery({ variables: { search: search.value } })
      setShouldExecuteQuery(false)
    }
    if (refreshInterval) {
      clearInterval(refreshInterval)
    }
    const intervalId = setInterval(() => {
      if (shouldExecuteQuery) {
        refetch()
        setShouldExecuteQuery(false)
      }
    }, 3000)
    setRefreshInterval(intervalId)
  }, [search.value])

  useEffect(() => {
    return () => {
      if (refreshInterval) {
        clearInterval(refreshInterval)
      }
    }
  }, [])

  const handleCloseModal = () => {
    onClose()
    resetSearchQuery()
  }

  const handleNewChatRequest = (userId) => {
    sendRequest({ variables: { userId } })
    resetSearchQuery()
    onClose()
  }

  if (!isOpen) {
    return null
  }

  return(
    <div className='modal-overlay'>

      <div className="modal">
        <div className="modal-content">
          <p>{message}</p>
          <input autoFocus placeholder='Username or user ID' { ...search } />
          {data && data.findUser.filter(u => u.id !== user.id).map(user => (
            <UserPreviewSelectable key={ user.id } onClick={() => handleNewChatRequest(user.id)}>
              { user.username } #{ user.id }
            </UserPreviewSelectable>
          ))}
          <button className="close-button" onClick={handleCloseModal}>Close</button>
        </div>
      </div>
    </div>
  )
}

NewChatRequest.propTypes = {
  isOpen: PropTypes.bool.isRequired,
  onClose: PropTypes.func.isRequired,
  message: PropTypes.string.isRequired,
  setVisibleElement: PropTypes.func.isRequired,
  setChats: PropTypes.func.isRequired
}

export default NewChatRequest
