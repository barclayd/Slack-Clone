import cors from 'cors';
import jwt from 'jsonwebtoken';
import path from 'path';
import { execute, subscribe } from 'graphql';
import { createServer } from 'http';
import { SubscriptionServer } from 'subscriptions-transport-ws';
import { makeExecutableSchema } from 'graphql-tools';
import typeDefs from './graphql/typeDefs';
import resolvers from './graphql/resolvers';
import models from './models';
import { refreshTokens } from './auth/auth';

const express = require('express');
const { ApolloServer } = require('apollo-server-express');

const SECRET = 'dsfds453dfssdfsas34fs';
const SECRET2 = 'Ro901341mi1zsxzhtZecjECxYf4324';

const app = express();
app.use(cors('*'));

const schema = makeExecutableSchema({
  typeDefs,
  resolvers,
});

const addUser = async (req, res, next) => {
  const token = req.headers['x-token'];
  if (token) {
    try {
      const { user } = jwt.verify(token, SECRET);
      req.user = user;
    } catch (err) {
      // if token is invalid, use attempt to refresh tokens
      const refreshToken = req.headers['x-refresh-token'];
      const newTokens = await refreshTokens(
        token,
        refreshToken,
        models,
        SECRET,
        SECRET2,
      );
      if (newTokens.token && newTokens.refreshToken) {
        res.set('Access-Control-Expose-Headers', 'x-token, x-refresh-token');
        res.set('x-token', newTokens.token);
        res.set('x-refresh-token', newTokens.refreshToken);
      }
      req.user = newTokens.user;
    }
  }
  next();
};

app.use(addUser);
const server = new ApolloServer({
  typeDefs,
  playground: {
    subscriptionEndpoint: 'ws://localhost:4000/subscriptions',
  },
  resolvers,
  context: ({ req, connection }) => ({
    models,
    user: connection ? connection.context : req.user,
    SECRET,
    SECRET2,
  }),
});

server.applyMiddleware({ app });

app.use('/images', express.static(path.join(__dirname, './images')));
// sync models with postgres before running server

const subscriptionServer = createServer(app);

models.sequelize.sync().then(() => {
  subscriptionServer.listen({ port: 4000 }, () => {
    // eslint-disable-next-line no-new
    new SubscriptionServer(
      {
        execute,
        subscribe,
        schema,
        onConnect: async ({ token, refreshToken }) => {
          if (token && refreshToken) {
            let user = null;
            try {
              ({ user } = jwt.verify(token, SECRET));
              return { models, user };
            } catch (err) {
              const newTokens = await refreshTokens(
                token,
                refreshToken,
                models,
                SECRET,
                SECRET2,
              );
              ({ user } = newTokens);
              return { models, user };
            }
          }
          return {};
        },
      },
      {
        server: subscriptionServer,
        path: '/subscriptions',
      },
    );
    // eslint-disable-next-line no-console
    console.log(
      `🚀 Server ready at http://localhost:4000${server.graphqlPath}`,
    );
  });
});
