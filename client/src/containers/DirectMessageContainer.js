import React, { Component } from 'react';
import { graphql } from 'react-apollo';
import { Comment } from 'semantic-ui-react';
import { Messages } from '../components/MainLayout';
import {
  directMessagesQuery,
  // newChannelMessageSubscription,
} from '../graphql/message';

// eslint-disable-next-line react/prefer-stateless-function
class DirectMessageContainer extends Component {
  // componentWillMount() {
  //   const { channelId } = this.props;
  //   this.unsubscribe = this.subscribe(channelId);
  // }
  //
  // componentWillReceiveProps({ channelId }) {
  //   const { props } = this;
  //   if (props.channelId !== channelId) {
  //     if (this.unsubscribe) {
  //       this.unsubscribe();
  //     }
  //     const {
  //       data: { subscribeToMore },
  //     } = this.props;
  //     this.unsubscribe = subscribeToMore({
  //       document: newChannelMessageSubscription,
  //       variables: {
  //         channelId,
  //       },
  //       updateQuery: (prev, { subscriptionData }) => {
  //         if (!subscriptionData) {
  //           return prev;
  //         }
  //         return {
  //           ...prev,
  //           messages: [
  //             ...prev.messages,
  //             subscriptionData.data.newChannelMessage,
  //           ],
  //         };
  //       },
  //     });
  //   }
  // }
  //
  // componentWillUnmount() {
  //   if (this.unsubscribe) {
  //     this.unsubscribe();
  //   }
  // }
  //
  // subscribe = (channelId) => {
  //   const {
  //     data: { subscribeToMore },
  //   } = this.props;
  //   return subscribeToMore({
  //     document: newChannelMessageSubscription,
  //     variables: {
  //       channelId,
  //     },
  //     updateQuery: (prev, { subscriptionData }) => {
  //       if (!subscriptionData) {
  //         return prev;
  //       }
  //       return {
  //         ...prev,
  //         messages: [...prev.messages, subscriptionData.data.newChannelMessage],
  //       };
  //     },
  //   });
  // };

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
  variables: props => ({ teamId: props.teamId, userId: props.userId }),
  options: {
    fetchPolicy: 'network-only',
  },
})(DirectMessageContainer);
