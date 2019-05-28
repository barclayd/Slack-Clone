import gql from 'graphql-tag';

export const createMessageMutation = gql`
mutation($channelId: Int!, $text: String!) {
  createMessage(channelId: $channelId, text: $text)
}
`;

export const messagesQuery = gql`
query($channelId: Int!) {
  messages(channelId: $channelId) {
    text
    id
    createdAt
    user {
      username
    }
  }
}
`;
