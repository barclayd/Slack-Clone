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
  
  type RegisterResponse {
    ok: Boolean!
    user: User
    errors: [Error!]
  }
  
  type Mutation {
    register(username: String!, email: String!, password: String!): RegisterResponse!
  }
`;
