import React from 'react';
import { graphql } from 'react-apollo';
import { Messages } from '../components/MainLayout';
import { messagesQuery } from '../graphql/message';

const MessageContainer = ({ data: { loading, messages } }) => (loading ? null : <Messages>{JSON.stringify(messages)}</Messages>);

export default graphql(messagesQuery, {
  variables: props => ({ channelId: props.channelId }),
})(MessageContainer);
