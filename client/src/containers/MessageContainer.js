import React, { Component } from 'react';
import { graphql } from 'react-apollo';
import { Comment } from 'semantic-ui-react';
import { Messages } from '../components/MainLayout';
import {
  messagesQuery,
  newChannelMessageSubscription,
} from '../graphql/message';

class MessageContainer extends Component {
  componentWillMount() {
    const {
      data: { subscribeToMore }, channelId,
    } = this.props;
    subscribeToMore({
      document: newChannelMessageSubscription,
      variables: {
        channelId,
      },
      updateQuery: (prev, { subscriptionData }) => {
        if (!subscriptionData) {
          return prev;
        }
        return {
          ...prev,
          messages: [...prev.messages, subscriptionData.data.newChannelMessage],
        };
      },
    });
  }

  render() {
    const {
      data: { loading, messages },
    } = this.props;
    return loading ? null : (
      <Messages>
        <Comment.Group>
          {messages.map(m => (
            <Comment key={`${m.id}-message`}>
              <Comment.Content>
                <Comment.Author as="a">{m.user.username}</Comment.Author>
                <Comment.Metadata>
                  <div>
                    {new Date(parseInt(m.createdAt, 10))
                      .toTimeString()
                      .substring(0, 5)}
                  </div>
                </Comment.Metadata>
                <Comment.Text>{m.text}</Comment.Text>
                <Comment.Actions>
                  <Comment.Action>Reply</Comment.Action>
                </Comment.Actions>
              </Comment.Content>
            </Comment>
          ))}
        </Comment.Group>
      </Messages>
    );
  }
}

export default graphql(messagesQuery, {
  variables: props => ({ channelId: props.channelId }),
})(MessageContainer);
