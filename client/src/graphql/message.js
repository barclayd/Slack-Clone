import gql from 'graphql-tag';

export const createMessageMutation = gql`
  mutation($channelId: Int!, $text: String!) {
    createMessage(channelId: $channelId, text: $text)
  }
`;

export const createDirectMessageMutation = gql`
  mutation($receiverId: Int!, $text: String!) {
    createDirectMessage(receiverId: $receiverId, text: $text)
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

export const directMessagesQuery = gql`
  query($teamId: Int!) {
    directMessages(teamId: $teamId) {
      text
      id
      sender {
        username
      }
      createdAt
    }
  }
`;

export const newChannelMessageSubscription = gql`
  subscription($channelId: Int!) {
    newChannelMessage(channelId: $channelId) {
      id
      text
      user {
        username
      }
      createdAt
    }
  }
`;
