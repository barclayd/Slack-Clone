import typeDefs from './schema';
import resolvers from './resolvers';
import models from './models';

const express = require('express');
const { ApolloServer } = require('apollo-server-express');

const server = new ApolloServer({ typeDefs, resolvers });

const app = express();
server.applyMiddleware({ app });
// sync models with postgres before running server
models.sequelize.sync({ force: true }).then(() => {
  app.listen({ port: 4000 }, () => console.log(`🚀 Server ready at http://localhost:4000${server.graphqlPath}`));
});
