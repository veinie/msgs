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

`