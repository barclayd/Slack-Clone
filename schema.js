export default `

    type Team {
        owner: User!
        members: [Users!!
        channels: [Channels!]!
    }

    type Channel {
        id: Int
        name: String!
        public: Boolean!
        messages: [Message!]!
        users: [Users!]!
    }

    type Message {
        id: Int!
        text: String!
        user: User!
        channel: Channel!
    }

    type User {
        id: Int!
        username: String!
        email: String!
        teams: [Team!]!
    }

    type Query {
        hi: String
    }
`;