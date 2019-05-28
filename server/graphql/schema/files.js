export default `
  
  type Query {
    files: [String]
  }
  
  type Mutation {
    uploadFile(file: Int!): Boolean
  }
`;
