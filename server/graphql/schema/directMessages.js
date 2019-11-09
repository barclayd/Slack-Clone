export default `

  type DirectMessage {
    id: ID!
    text: String
    sender: User!
    receiverId: Int!
    createdAt: String!
  }
  
  type Query {
    directMessages(teamId: Int!, userId: Int!): [DirectMessage!]!
  }
  
  type Mutation {
    createDirectMessage(receiverId: Int!, text: String!, teamId: Int!): Boolean!
  }
  
  type Subscription {
    newDirectMessage(teamId: Int!, userId: Int!): DirectMessage!
  }
  
`;
