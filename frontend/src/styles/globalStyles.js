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

  .landingpage-form {
    padding: 20px;
    border-radius: 10px 20px;
    width: 350px;
  }

  .profile-div {
    box-sizing: border-box;
    @media (min-width: 767px) {
      width: 80VW;
      overflow-y: auto;
    }
  }

  .menu-btn {

  }

  .icon {
    color: ${({ theme }) => theme.accentColor}
  }

  .profile-element {
    padding: 10px;
    margin-bottom: 10px;
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
      width: 20VW;
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

  .message-info {
    font-size: 15px;
    display: inline-block;
  }

  .message-tools {
    display: inline-block;
    font-size: 15px;
    width: 100%;
    text-align: right;

    i {
      display: inline;
    }
  }

  .message-sender {}

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

  .btn-primary {
    background-color: ${({ theme }) => theme.buttonPrimary}
  }

  .btn-secondary {
    background-color: ${({ theme }) => theme.buttonSecondary}
  }

  .btn-success {
    background-color: ${({ theme }) => theme.accentColor};
  }

  .btn-light {
    background-color: light-grey;
    color: black;
  }

  .btn-send {
    background-color: ${({ theme }) => theme.background};
    color: ${({ theme }) => theme.text};
  }

  .btn-send-disabled {
    background-color: ${({ theme }) => theme.background};
    color: ${({ theme }) => theme.body};
  }

  .btn {
    color: #ffffff;
  }

  .btn-disabled {
    background-color: light-grey;
    color: white;
    cursor: default;
  }

  .form-element {
    margin-bottom: 10px;
  }

  .landingpage-input {
    padding: 10px;
    display: block; 
  }

  .text-input {
    padding: 10px;
    display: block; 
  }

  .message-edit-icon {
    cursor: pointer;
    width: 5%;
    
    @media (max-width: 767px) {
      width: 15%;
    }
  }
`
