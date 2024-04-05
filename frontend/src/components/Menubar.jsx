import { useState, useContext, useEffect, useRef } from 'react';
import { PropTypes } from 'prop-types'
import { UserContext } from '../contexts/UserContext';
import NewChatRequest from './chat/NewChatRequest';
import { NavBar, MenuBtn, NavToggler, VerticalFlexContainer, ChatsList } from '../styles/style';
import { MdMenu, MdNorth } from "react-icons/md";

const Menubar = ({ visibleElement, setVisibleElement, chatRequests, children }) => {
  const isInitialRender = useRef(true)
  const [isNavOpen, setIsNavOpen] = useState(true)
  const [isModalOpen, setIsModalOpen] = useState(false)
  const { user } = useContext(UserContext)

  useEffect(() => {
    // If using mobile-sized menu, close the menu when new element is selected to be visible except during the initial render
    if(isInitialRender.current) {
      isInitialRender.current = false
    } else {
      if (window.innerWidth < 768) {
        setIsNavOpen(false)
      }
    }
  }, [visibleElement])

  const openModal = () => {
    setIsModalOpen(true)
  }

  const closeModal = () => {
    setIsModalOpen(false)
  }

  console.log('Menubar rendered')

  return (
    <>
      <NavToggler onClick={() => setIsNavOpen(!isNavOpen)} className='menu-div'>
        { isNavOpen ? <MdNorth style={{ padding: '1em' }} className='icon' /> : <MdMenu className='icon' /> }
      </NavToggler>
      <VerticalFlexContainer style={{ display: isNavOpen ? 'flex' : 'none' }} className='menu-div background-div'>
          <h1 className={'pulsating-background'}>MSGS</h1>
          <NavBar>
            <i>Hello, { user.username } #{ user.id }</i>
            <MenuBtn onClick={() => setVisibleElement(-1)} className={ visibleElement === -1 ? 'active-element' : '' }>Profile and Settings</MenuBtn>
            <MenuBtn onClick={openModal}>Start a new chat</MenuBtn>
            <MenuBtn onClick={() => setVisibleElement(-2)} style={{ display: chatRequests.length > 0 ? 'block' : 'none' }}>View {chatRequests.length} new chat requests</MenuBtn> 
            <hr/>
            <NewChatRequest
              onClose={closeModal}
              isOpen={isModalOpen}
              message={'Type in username or user ID to start a new conversation:'}
            />
          </NavBar>
          <ChatsList>
            { children }
          </ChatsList>

      </VerticalFlexContainer>
    </>
  )
}

Menubar.propTypes = {
  visibleElement: PropTypes.number,
  children: PropTypes.array,
  setVisibleElement: PropTypes.func,
  chatRequests: PropTypes.array
}

export default Menubar
