import { withFilter, PubSub } from 'graphql-subscriptions';
import { requiresAuth } from '../../auth/permissions';

const pubSub = new PubSub();

const NEW_CHANNEL_MESSAGE = 'NEW_CHANNEL_MESSAGE';

export default {
  Message: {
    user: ({ user, userId }, args, { models }) => {
      if (user) {
        return user;
      }
      return models.User.findOne({ where: { id: userId } }, { raw: true });
    },
  },
  Query: {
    messages: requiresAuth.createResolver(
      // eslint-disable-next-line max-len
      async (parent, { channelId }, { models }) =>
        models.Message.findAll(
          { order: [['created_at', 'ASC']], where: { channelId } },
          { raw: true },
        ),
    ),
  },
  Mutation: {
    createMessage: requiresAuth.createResolver(
      async (parent, args, { models, user }) => {
        try {
          const message = await models.Message.create({
            ...args,
            userId: user.id,
          });

          await pubSub.publish(NEW_CHANNEL_MESSAGE, {
            channelId: args.channelId,
            newChannelMessage: {
              ...message.dataValues,
              user,
            },
          });

          return true;
        } catch (err) {
          return false;
        }
      },
    ),
  },
  Subscription: {
    newChannelMessage: {
      subscribe: withFilter(
        () => pubSub.asyncIterator('NEW_CHANNEL_MESSAGE'),
        (payload, { channelId }) => parseInt(payload.channelId, 10) === parseInt(channelId, 10),
      ),
    },
  },
};
