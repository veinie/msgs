import { gql } from '@apollo/client'

export const SUBSCRIBE_CHAT_MESSAGES = gql`
  subscription($chatId: Int!) {
    newMessageToChat(chatId: $chatId) {
      id
      chatId
      createdAt
      updatedAt
      content
      user {
        id
        username
      }
    }
  }
`

export const SUBSCRIBE_CHAT_REQUESTS = gql`
  subscription($userId: Int!) {
    newChatRequest(userId: $userId) {
      id
      createdAt
      updatedAt
      requester {
        username
      }
    }
  }
`
