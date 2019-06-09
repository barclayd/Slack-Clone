import { requiresAuth } from '../../auth/permissions';

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

          return true;
        } catch (err) {
          return false;
        }
      },
    ),
  },
};
