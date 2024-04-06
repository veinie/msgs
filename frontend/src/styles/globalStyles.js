import { createGlobalStyle} from "styled-components"
export const GlobalStyles = createGlobalStyle`
  body {
    background: ${({ theme }) => theme.body};
    color: ${({ theme }) => theme.text};
    font-family: Tahoma, Helvetica, Arial, Roboto, sans-serif;
    transition: all 0.50s linear;
  }

  a {
    color: ${({ theme }) => theme.linktext}
  }

  .background-div {
    background-color: ${({ theme }) => theme.background};
  }

  .active-element {
    background-color: ${({ theme }) => theme.body}
  }

  .menu-btn {

  }

  .icon {
    color: ${({ theme }) => theme.text}
  }

  .full-width {
    width: 100%;
  }
  
  .menu-div {
    text-align: center;
    min-width: 15em;
    min-height: 100%
    
    @media (min-width: 767px) {
      overflow-y: auto;
    }

  }

  .scrollable {
    overflow-y auto;
  }

  @keyframes pulsate {
    0% {
      background-color: ${({ theme }) => theme.background};
    }

    50% {
      background-color: ${({ theme }) => theme.accentColor};
    }

    100% {
      background-color: ${({ theme }) => theme.background};
    }
  }

  .pulsating-background {
    animation: pulsate 2s infinite;
  }

  .accent {
    background-color: ${({ theme }) => theme.accentColor};
  }

  .user-message{
    position: relative;
  }

  .user-message::before {
    content: '';
    width: 100%;
    height: 100%;
    position: absolute;
    background: linear-gradient(to right, ${({ theme }) => theme.accentColor}, rgba(0, 0, 0, 0));
    opacity: 0.2;
    z-index: -1;
  }

  .not-user-message {
    box-shadow: rgba(50, 50, 93, 0.25) 0px 2px 5px -1px, rgba(0, 0, 0, 0.3) 0px 1px 3px -1px;
  }

`
