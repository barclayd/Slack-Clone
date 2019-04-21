export default `
  type Channel {
    id: ID!
    name: String!
    messages: [Message!]!
    public: Boolean!
    users: [User!]!
  }
`;
