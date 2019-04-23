import cors from 'cors';
import typeDefs from './graphql/typeDefs';
import resolvers from './graphql/resolvers';
import models from './models';

const express = require('express');
const { ApolloServer } = require('apollo-server-express');

const server = new ApolloServer({
  typeDefs,
  resolvers,
  context: {
    models,
    user: {
      id: 1,
    },
  },
});

const app = express();
app.use(cors('*'));

server.applyMiddleware({ app });
// sync models with postgres before running server
models.sequelize.sync().then(() => {
  app.listen({ port: 4000 }, () =>
    console.log(
      `🚀 Server ready at http://localhost:4000${server.graphqlPath}`,
    ),
  ); // eslint-disable-line no-console
});
