import { useState } from 'react'
import {
  HorizontalFlexContainer,
  HorizontallyCentralizedContainer,
  VerticallyCentralizedContainer,
  DesktopHorizontalMobileVertical,
  FormDiv
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
          <div>
            <p>Welcome to</p>
            <h1>MSGS</h1>
          </div>
          <FormDiv>
            <div style={hideWhenVisible}>
              <LoginForm />
              Do not have an account yet?
              <button onClick={toggleVisibility}>Sign up</button>
            </div>
            <div style={showWhenVisible}>
              <SignupForm />
              <button onClick={toggleVisibility}>Back to login</button>
            </div>
          </FormDiv>
        </DesktopHorizontalMobileVertical>
      </HorizontallyCentralizedContainer>
    </VerticallyCentralizedContainer>
  )
}

export default LandingPage
