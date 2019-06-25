export default `
  type User {
    id: Int!
    username: String!
    email: String!
    password: String
    teams: [Team!]!
  }
  
  type LoginResponse {
    ok: Boolean!
    token: String
    refreshToken: String
    errors: [Error!]
  }
  
  type RegisterResponse {
    ok: Boolean!
    user: User
    errors: [Error!]
  }
  
  type Query {
    me: User!
    allUsers: [User!]!
    getUser(userId: Int): User
    login(email: String!, password: String!): LoginResponse!
  }
  
  type Mutation {
    register(username: String!, email: String!, password: String!): RegisterResponse!
  }
`;
