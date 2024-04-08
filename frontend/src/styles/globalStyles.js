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
    color: ${({ theme }) => theme.accentColor}
  }

  .full-width {
    width: 100%;
    box-sizing: border-box;
  }

  .center-align {
    text-align: center;
  }
  
  .menu-div {
    text-align: center;
    min-height: 100%
    width: 100VW;
    
    @media (min-width: 767px) {
      width: 300px;
      overflow-y: auto;
    }

  }

  .scrollable {
    overflow-y auto;
  }

  .mobile-scrollable: {
    @media (min-width: 767px) {
      overflow-y: auto;
    }
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
    background: linear-gradient(to right, ${({ theme }) => theme.mildAccentColor}, ${({ theme }) => theme.background});
  }

  .not-user-message {
    background-color: ${({ theme }) => theme.background};
  }

  .modal-content {
    color: ${({ theme }) => theme.invertedText};
  }

  .message-content {
    word-wrap: break-word;
    overflow-wrap: break-word;
    white-space: pre-wrap;
  }

  .icon {

  }

`
