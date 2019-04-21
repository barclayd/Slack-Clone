export default `

  type Team {
    owner: User!
    members: [Users!]!
    channels: [Channels!]!
  }

  type Channel {
    id: ID!
    name: String!
    messages: [Messages!]!
    public: Boolean!
    users: [User!]!
  }

  type Message {
    id: ID!
    text: String
    channel: Channel!
    user: User!
  }

  type User {
    id: Int!
    username: String!
    email: String!
    password: String
    teams: [Teams!]!
  }

  type Query {
    hi: String!
  }
`;
