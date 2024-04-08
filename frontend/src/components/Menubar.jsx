import { useState, useContext, useEffect, useRef } from 'react';
import { PropTypes } from 'prop-types'
import { UserContext } from '../contexts/UserContext';
import NewChatRequest from './chat/NewChatRequest';
import {
  NavBar,
  MenuBtn,
  NavToggler,
  VerticalFlexContainer,
  ChatsList,
  VerticallyCentralizedContainer,
  HorizontallyCentralizedContainer,
  NavTogglerPlaceholder
} from '../styles/style';
import ChatPreview from './chat/ChatPreview';
import { MdMenu, MdNorth } from "react-icons/md";
import { useQuery, useSubscription } from '@apollo/client'
import { CHAT_REQUESTS } from '../gql/queries'
import { SUBSCRIBE_CHAT_REQUESTS } from '../gql/subscriptions';
// import { epochToHumanReadable as formatTime } from '../util/time'

const PlaceHolder = () => {
  return (
    <VerticallyCentralizedContainer>
      <HorizontallyCentralizedContainer>
        <p>¯\_( ͡° ͜ʖ ͡°)_/¯</p>
      </HorizontallyCentralizedContainer>
    </VerticallyCentralizedContainer>
  )
}

const Menubar = ({ visibleElement, setVisibleElement, chats }) => {
  const isInitialRender = useRef(true)
  const [isNavOpen, setIsNavOpen] = useState(true)
  const [isModalOpen, setIsModalOpen] = useState(false)
  const { user, setLogout } = useContext(UserContext)
  const [ chatRequests, setChatRequests ] = useState([])
  const [ menuChats, setMenuChats ] = useState(
    chats.map(c => ({ ...c, timestamp: c.createdAt ? c.createdAt : null }))
  )
  const [viewPortSize, setViewPortSize] = useState({ width: window.innerWidth, height: window.innerHeight })
  const mobileWidthTrigger = 767
  const [onMobile, setOnMobile] = useState(viewPortSize.width <= mobileWidthTrigger)
  const debug = false

  const chatRequestsQuery = useQuery(CHAT_REQUESTS, {
    onCompleted: (data) => {
      setChatRequests(data.getChatRequests)
    },
    onError: (error) => {
      if (error.message === 'invalid token') {
        setLogout()
      }
    }
  })

  useSubscription(SUBSCRIBE_CHAT_REQUESTS, {
    variables: {
      userId: user.id
    },
    onData: (subdata) => {
      console.log('new requests acknowledged')
      const newRequest = subdata.data.newChatRequest
      setChatRequests(prevRequests => [...prevRequests, newRequest])
      chatRequestsQuery.refetch()
    }
  })

  const sortChats = (chats) => {
    const sorted = chats.sort((A, B) => {
      return B.timestamp - A.timestamp
    })
    return sorted
  }

  useEffect(() => {
    if (chats) {
      const withTimestamps = chats.map(c => ({ ...c, timestamp: c.createdAt }))
      setMenuChats(withTimestamps)
    }
  }, [chats])

  useEffect(() => {
    const sorted = sortChats(menuChats)
    setMenuChats(sorted)
  }, [menuChats])

  const updateChatTimestamp = (chatId, newTimestamp) => {
    setMenuChats(sortChats(menuChats.map(c => c.id !== chatId ? c : { ...c, timestamp: newTimestamp })))
  }

  useEffect(() => {
    if (viewPortSize.width <= mobileWidthTrigger) {
      setOnMobile(true)
    } else if (viewPortSize.width >= mobileWidthTrigger) {
      setOnMobile(false)
      if (!isNavOpen){
        setIsNavOpen(true)
      }
    }
  }, [viewPortSize])

  useEffect(() => {
    if (onMobile) {
      setVisibleElement(0)
    }
    const handleResize = () => {
      setViewPortSize({
        width: window.innerWidth,
        height: window.innerHeight
      })

    }
    window.addEventListener('resize', handleResize)

    return () => {
      window.removeEventListener('resize', handleResize)
    }
  }, [])

  useEffect(() => {
    // If using mobile-sized menu, close the menu when new element is selected to be visible except during the initial render
    if(isInitialRender.current) {
      isInitialRender.current = false
    } else {
      if (window.innerWidth < 768) {
        // Except when the placeholder-element is visible
        if (visibleElement !== 0) {
          setIsNavOpen(false)
        }
      }
    }
  }, [visibleElement])

  useEffect(() => {
    if (onMobile) {
      if (isNavOpen) {
        setVisibleElement(0)
      } else {
        const currentPage = localStorage.getItem('current-page')
        if (currentPage && !isNaN(currentPage)) setVisibleElement(Number(currentPage))
      }
    }
  }, [isNavOpen, onMobile, setVisibleElement])

  const handleNavTogglerClick = () => {
    setIsNavOpen(!isNavOpen)
  }

  const openModal = () => {
    setIsModalOpen(true)
  }

  const closeModal = () => {
    setIsModalOpen(false)
  }

  const ComponentLayoutDebugger = () => {
    console.log('Menubar rendered')
    return (
      <div style={{ position: 'fixed', top: '0' }} className='background-div'>
        Width: {viewPortSize.width}<br/>
        Height: {viewPortSize.height}<br/>
        onMobile: {onMobile ? 'true' : 'false'}<br/>
        isNavOpen: {isNavOpen ? 'true' : 'false'}<br/>
        VisibleElement: {visibleElement}<br/>
        Storage-current-page: { localStorage.getItem('current-page') }
    </div>
    )
  }

  return (
    <>
      { debug && <ComponentLayoutDebugger /> }
      <NavToggler onClick={handleNavTogglerClick} className='full-width center-align'>
        { isNavOpen ? <MdNorth style={{ padding: '5px' }} className='icon icon-background' /> : <MdMenu className='icon icon-background' /> }
      </NavToggler>
      <VerticalFlexContainer style={{ display: isNavOpen ? 'flex' : 'none' }} className='menu-div background-div mobile-scrollable'>
        <NavTogglerPlaceholder />
          <h1>MSGS</h1>
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
            {/* { children } */}
            { chats && <p>Chats</p> }
            { menuChats && menuChats.map(chat => <ChatPreview chat={ chat } key={ chat.id } setVisibleElement={ setVisibleElement } visibleElement={visibleElement} updateChatTimestamp={ updateChatTimestamp } timestamp />) }
          </ChatsList>
      </VerticalFlexContainer>
      { visibleElement === 0 && isNavOpen === false && <PlaceHolder /> }
    </>
  )
}

Menubar.propTypes = {
  visibleElement: PropTypes.number,
  chats: PropTypes.array.isRequired,
  children: PropTypes.array,
  setVisibleElement: PropTypes.func
}

export default Menubar
