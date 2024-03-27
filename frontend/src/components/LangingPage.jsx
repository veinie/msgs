import { useState } from 'react'
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
    <>
      <p>Welcome to</p>
      <h1>MSGS</h1>
      <div style={hideWhenVisible}>
        <LoginForm />
        Do not have an account yet?
        <button onClick={toggleVisibility}>Sign up</button>
      </div>
      <div style={showWhenVisible}>
        <SignupForm />
        <button onClick={toggleVisibility}>Back to login</button>
      </div>
    </>
  )
}

export default LandingPage
