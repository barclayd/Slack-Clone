import { withFilter } from 'graphql-subscriptions';
import { requiresAuth, directMessageAccess } from '../../auth/permissions';
import pubSub from '../../pubsub';

const NEW_DIRECT_MESSAGE = 'NEW_DIRECT_MESSAGE';

export default {
  DirectMessage: {
    sender: ({ sender, senderId }, args, { models }) => {
      if (sender) {
        return sender;
      }

      return models.User.findOne({ where: { id: senderId } }, { raw: true });
    },
  },
  Query: {
    directMessages: requiresAuth.createResolver(
      async (parent, { teamId, userId }, { models, user }) =>
        models.DirectMessage.findAll(
          {
            order: [['created_at', 'ASC']],
            where: {
              teamId,
              [models.Sequelize.Op.or]: [
                {
                  [models.Sequelize.Op.and]: [
                    { receiverId: userId },
                    { senderId: user.id },
                  ],
                },
                {
                  [models.Sequelize.Op.and]: [
                    { receiverId: user.id },
                    { senderId: userId },
                  ],
                },
              ],
            },
          },
          { raw: true },
        ),
    ),
  },
  Mutation: {
    createDirectMessage: requiresAuth.createResolver(
      async (parent, args, { models, user }) => {
        try {
          const directMessage = await models.DirectMessage.create({
            ...args,
            senderId: user.id,
          });

          await pubSub.publish(NEW_DIRECT_MESSAGE, {
            teamId: args.teamId,
            senderId: user.id,
            receiverId: args.receiverId,
            newDirectMessage: {
              ...directMessage.dataValues,
              sender: {
                username: user.username,
              },
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
    newDirectMessage: {
      subscribe: directMessageAccess.createResolver(
        withFilter(
          () => pubSub.asyncIterator(NEW_DIRECT_MESSAGE),
          (payload, { teamId, userId }, { user }) =>
            parseInt(payload.teamId, 10) === parseInt(teamId, 10)
            && ((parseInt(payload.senderId, 10) === parseInt(user.id, 10)
              && payload.receiverId === userId)
              || (parseInt(payload.senderId, 10) === parseInt(userId, 10)
                && payload.senderId === user.id)),
        ),
      ),
    },
  },
};
