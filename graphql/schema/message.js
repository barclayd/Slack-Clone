export default `
   type Message {
    id: ID!
    text: String
    channel: Channel!
    user: User!
  }
  
   type Mutation {
    createMessage(channelId: Int!, text: String!): Boolean!
  }
  
`;
