import { requiresAuth } from '../../auth/permissions';

export default {
  Message: {
    // eslint-disable-next-line max-len
    user: ({ userId }, args, { models }) => models.User.findOne({ where: { id: userId } }, { raw: true }),
  },
  Query: {
    messages: requiresAuth.createResolver(
      // eslint-disable-next-line max-len
      async (parent, { channelId }, { models }) => models.Message.findAll({ order: [['created_at', 'ASC']], where: { channelId } }, { raw: true }),
    ),
  },
  Mutation: {
    createMessage: requiresAuth.createResolver(
      async (parent, args, { models, user }) => {
        try {
          await models.Message.create({
            ...args,
            userId: user.id,
          });
          return true;
        } catch (err) {
          return false;
        }
      },
    ),
  },
};
