import { ApolloClient } from 'apollo-client';
// import { createHttpLink } from 'apollo-link-http';
import { createUploadLink } from 'apollo-upload-client';
import { InMemoryCache } from 'apollo-cache-inmemory';
import { setContext } from 'apollo-link-context';
import { ApolloLink, split } from 'apollo-link';
import { WebSocketLink } from 'apollo-link-ws';
import { getMainDefinition } from 'apollo-utilities';

// const httpLink = createHttpLink({ uri: 'http://localhost:4000/graphql' });
const httpLink = createUploadLink({ uri: 'http://localhost:4000/graphql' });

const wsLink = new WebSocketLink({
  uri: 'ws://localhost:4000/subscriptions',
  options: {
    reconnect: true,
    connectionParams: {
      token: localStorage.getItem('token'),
      refreshToken: localStorage.getItem('refreshToken'),
    },
  },
});

const middlewareLink = setContext(() => ({
  headers: {
    'x-token': localStorage.getItem('token'),
    'x-refresh-token': localStorage.getItem('refreshToken'),
  },
}));

const afterwareLink = new ApolloLink((operation, forward) => forward(operation).map((response) => {
  const {
    response: { headers },
  } = operation.getContext();
  if (headers) {
    const token = headers.get('x-token');
    const refreshToken = headers.get('x-refresh-token');
    if (token) {
      localStorage.setItem('token', token);
    }

    if (refreshToken) {
      localStorage.setItem('refreshToken', refreshToken);
    }
  }
  return response;
}));

const httpLinkWithMiddleware = afterwareLink.concat(
  middlewareLink.concat(httpLink),
);

const link = split(
  // split based on operation type
  ({ query }) => {
    const definition = getMainDefinition(query);
    return (
      definition.kind === 'OperationDefinition'
      && definition.operation === 'subscription'
    );
  },
  wsLink,
  httpLinkWithMiddleware,
);

export default new ApolloClient({
  link,
  cache: new InMemoryCache(),
});
