import { useState } from 'react'
import {
  HorizontallyCentralizedContainer,
  VerticallyCentralizedContainer,
  DesktopHorizontalMobileVertical,
  FormDiv,
  Button
} from '../styles/style'
import LoginForm from './userauth/LoginForm'
import SignupForm from './userauth/SignupForm'

const LandingPage = () => {
  const [visible, setVisible] = useState(false)

  const hideWhenVisible = { display: visible ? 'none' : '' }
  const showWhenVisible = { display: visible ? '' : 'none' }

  const toggleVisibility = () => {
    setVisible(!visible)
  }

  return (
    <VerticallyCentralizedContainer>
      <HorizontallyCentralizedContainer>
        <DesktopHorizontalMobileVertical>
            <div style={{ width: '150px', textAlign: 'center' }}>
              <p>Welcome to</p>
              <h1>MSGS</h1>
            </div>
            <FormDiv>
              <div style={hideWhenVisible} className='background-div landingpage-form'>
                <LoginForm />
                Do not have an account yet?
                <Button className='btn-light' onClick={toggleVisibility} style={{ marginLeft: '5px' }}>Sign up</Button>
              </div>
              <div style={showWhenVisible} className='background-div landingpage-form'>
                <SignupForm />
                <Button className='btn-light' onClick={toggleVisibility}>Back to login</Button>
              </div>
            </FormDiv>
        </DesktopHorizontalMobileVertical>
      </HorizontallyCentralizedContainer>
    </VerticallyCentralizedContainer>
  )
}

export default LandingPage
