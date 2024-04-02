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

export const CHAT_REQUESTS = gql`
  query {
    getChatRequests {
      id
      createdAt
      updatedAt
      requester {
        username
      }
    }
  }
`

export const FIND_USER = gql`
  query findUser($search: String!) {
    findUser(search: $search) {
      id,
      username
    }
  }
`

export const GET_CHAT_USERS = gql`
  query getChatUsers($chatId: Int!) {
    getChatUsers(chatId: $chatId) {
      username,
      id
    }
  }
`