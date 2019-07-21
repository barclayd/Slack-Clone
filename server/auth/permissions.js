const createResolver = (resolver) => {
  const baseResolver = resolver;
  baseResolver.createResolver = (childResolver) => {
    const newResolver = async (parent, args, context, info) => {
      await resolver(parent, args, context, info);
      return childResolver(parent, args, context, info);
    };
    return createResolver(newResolver);
  };
  return baseResolver;
};

export const requiresAuth = createResolver((parent, args, { user }) => {
  if (!user || !user.id) {
    throw new Error('Not authenticated');
  }
});

export const requiresTeamAccess = createResolver(
  async (parent, { channelId }, { user, models }) => {
    if (!user || !user.id) {
      throw new Error('Not authenticated');
    }
    // check if part of the team
    const channel = await models.Channel.findOne({
      where: { id: channelId },
    });
    const member = await models.Member.findOne({
      where: {
        teamId: channel.teamId,
        userId: user.id,
      },
    });
    if (!member) {
      throw new Error(
        'You have to be a member of the team to receive new messages',
      );
    }
  },
);

export const directMessageAccess = createResolver(
  async (parent, { teamId, userId }, { user, models }) => {
    if (!user || !user.id) {
      throw new Error('Not authenticated');
    }
    // check if both users are part of the team
    const members = await models.Member.findAll({
      where: {
        teamId,
        [models.Sequelize.Op.or]: [{ userId }, { userId: user.id }],
      },
    });

    if (members.length < 2) {
      throw new Error(
        'Both users in the chat have to be part of the team to subscribe to new direct messages',
      );
    }
  },
);
