import React, { Component } from 'react';
import { graphql } from 'react-apollo';
import { Comment } from 'semantic-ui-react';
import { Messages } from '../components/MainLayout';
import {
  directMessagesQuery,
  newDirectMessageSubscription,
} from '../graphql/message';

class DirectMessageContainer extends Component {
  componentWillMount() {
    const { teamId, userId } = this.props;
    this.unsubscribe = this.subscribe(teamId, userId);
  }

  componentWillReceiveProps({ teamId, userId }) {
    const { props } = this;
    if (props.teamId !== teamId || props.userId !== userId) {
      if (this.unsubscribe) {
        this.unsubscribe();
      }
      this.unsubscribe = this.subscribe(teamId, userId);
    }
  }

  componentWillUnmount() {
    if (this.unsubscribe) {
      this.unsubscribe();
    }
  }

  subscribe = (teamId, userId) => {
    const {
      data: { subscribeToMore },
    } = this.props;
    return subscribeToMore({
      document: newDirectMessageSubscription,
      variables: {
        teamId,
        userId,
      },
      updateQuery: (prev, { subscriptionData }) => {
        if (!subscriptionData) {
          return prev;
        }
        return {
          ...prev,
          directMessages: [
            ...prev.directMessages,
            subscriptionData.data.newDirectMessage,
          ],
        };
      },
    });
  };

  render() {
    const {
      data: { loading, directMessages },
    } = this.props;
    return loading ? null : (
      <Messages>
        <Comment.Group>
          {directMessages.map(m => (
            <Comment key={`${m.id}-direct-message`}>
              <Comment.Content>
                <Comment.Author as="a">{m.sender.username}</Comment.Author>
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

export default graphql(directMessagesQuery, {
  options: ({ teamId, userId }) => ({
    fetchPolicy: 'network-only',
    variables: { teamId, userId },
  }),
})(DirectMessageContainer);
