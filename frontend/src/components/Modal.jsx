import { useRef } from 'react'
import PropTypes from 'prop-types'
import '../styles/modalStyle.css'

const Modal = ({ isOpen, onClose, message, children }) => {
  const modalRef = useRef()

  const handleOverlayClick = (event) => {
    if (!modalRef.current.contains(event.target)) {
      onClose()
    }
  }

  if (!isOpen) {
    return null
  }

  return (
    <div className='modal-overlay' onClick={handleOverlayClick}>
      <div className="modal" ref={modalRef}>
        <div className="modal-content">
          <p>{message}</p>
          <button className="close-button" onClick={onClose}>Close</button>
          { children }
        </div>
      </div>
    </div>
  )
}

Modal.propTypes = {
  isOpen: PropTypes.bool.isRequired,
  onClose: PropTypes.func.isRequired,
  message: PropTypes.string.isRequired,
  children: PropTypes.node
}

export default Modal
