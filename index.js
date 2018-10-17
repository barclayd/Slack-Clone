import path from 'path';
import { fileLoader, mergeTypes, mergeResolvers } from 'merge-graphql-schemas';
import models from './models';

const typeDefs = mergeTypes(fileLoader(path.join(__dirname, './schema')));

const resolvers = mergeResolvers(fileLoader(path.join(__dirname, './resolvers')));

const express = require('express');
const {
  ApolloServer,
  gql,
} = require('apollo-server-express');

const app = express();

const server = new ApolloServer({
  typeDefs,
  resolvers,
});
server.applyMiddleware({
  app,
});

models.sequelize.sync({
  force: true,
}).then(() => {
  app.listen({
    port: PORT,
  }, () => console.log(`🚀 Server ready at http://localhost:4000${server.graphqlPath}`));
});
