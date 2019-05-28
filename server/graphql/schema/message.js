export default `
   type Message {
    id: ID!
    text: String
    channel: Channel!
    user: User!
    createdAt: String!
  }
  
  type Query {
    messages(channelId: Int!): [Message!]!
  }
  
   type Mutation {
    createMessage(channelId: Int!, text: String!): Boolean!
  }
  
  type Subscription {
    newChannelMessage(channelId: Int!): Message!
  }
  
`;
