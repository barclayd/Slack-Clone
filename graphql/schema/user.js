export default `
  type User {
    id: Int!
    username: String!
    email: String!
    password: String
    teams: [Team!]!
  }
  
  type Query {
    getUser(id: ID!): User!
    allUsers: [User!]!
  }
  
  type Mutation {
    createUser(username: String!, email: String!, password: String!): User!
  }
`;
