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