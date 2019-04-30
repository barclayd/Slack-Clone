import cors from 'cors';
import jwt from 'jsonwebtoken';
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

const addUser = async (req, res, next) => {
  const token = req.headers['x-token'];
  if (token) {
    try {
      const { user } = jwt.verify(token, SECRET);
      req.user = user;
    } catch (err) {
      // if token is invalid, use attempt to refresh tokens
      const refreshToken = req.headers['x-refresh-token'];
      const newTokens = await refreshTokens(token, refreshToken, models, SECRET, SECRET2);
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
  resolvers,
  context: ({ req }) => ({
    models,
    user: {
      id: req.user ? req.user.id : 0,
    },
    SECRET,
    SECRET2,
  }),
});

server.applyMiddleware({ app });
// sync models with postgres before running server
models.sequelize.sync().then(() => {
  // eslint-disable-next-line no-console
  app.listen({ port: 4000 }, () => console.log(
    `🚀 Server ready at http://localhost:4000${server.graphqlPath}`,
  ));
});
