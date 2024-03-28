import { gql } from '@apollo/client'

export const USER_CHATS = gql`
  query {
    getUserChats {
      id
      createdAt
      updatedAt
      users {
        username
        id
      }
      messages {
        createdAt
        updatedAt
        content
        user {
          id
          username
        }
      }
    }
  }
`
