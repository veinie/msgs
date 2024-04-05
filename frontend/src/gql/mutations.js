import { gql } from '@apollo/client'

export const ADD_MESSAGE = gql`
  mutation createMessage(
    $chatId: Int!, $content: String!
  ) {
    createMessage(
      chatId: $chatId,
      content: $content
    ) {
      content
    }
  }
`

export const NEW_CHAT = gql`
  mutation createChat(
    $userId: Int!
  ) {
    createChat (
      userId: $userId
    ) {
      id
      createdAt
      updatedAt
      users {
        username
        id
      }
    }
  }
`

export const ACCEPT_CHAT_REQUEST = gql`
  mutation acceptChatRequest(
    $requestId: Int!
  ) {
    acceptChatRequest (
      requestId: $requestId
    ) {
      id
    }
  }
`