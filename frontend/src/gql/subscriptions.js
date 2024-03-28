import { gql } from '@apollo/client'

export const SUBSCRIBE_CHAT_MESSAGES = gql`
  subscription($chatId: Int!) {
    newMessage(chatId: $chatId) {
      message {
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
