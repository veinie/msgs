import PropTypes from 'prop-types'
import '../../styles/modalStyle.css'

const SuccesfulSignupModal = ({ isOpen, onClose, message }) => {
  if (!isOpen) {
    return null;
  }

  return (
    <div className='modal-overlay'>
      <div className="modal">
        <div className="modal-content">
          <p>{message}</p>
          <button className="close-button" onClick={onClose}>OK</button>
        </div>
      </div>
    </div>
  );
};

SuccesfulSignupModal.propTypes = {
  isOpen: PropTypes.bool.isRequired,
  onClose: PropTypes.func.isRequired,
  message: PropTypes.string.isRequired
}

export default SuccesfulSignupModal;
