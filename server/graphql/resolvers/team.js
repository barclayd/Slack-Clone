import formatErrors from '../../helpers/formatErrors';
import { requiresAuth } from '../../auth/permissions';

export default {
  Query: {
    // eslint-disable-next-line max-len
    allTeams: requiresAuth.createResolver(async (parent, args, { models, user }) => models.Team.findAll({ where: { owner: user.id } }, { raw: true })),
  },
  Mutation: {
    createTeam: requiresAuth.createResolver(
      async (parent, args, { models, user }) => {
        try {
          const team = await models.Team.create({ ...args, owner: user.id });
          await models.Channel.create({ name: 'general', public: true, teamId: team.id });
          return {
            ok: true,
          };
        } catch (err) {
          // eslint-disable-next-line no-console
          console.log(err);
          return {
            ok: false,
            errors: formatErrors(err, models),
          };
        }
      },
    ),
  },
  Team: {
    channels: ({ id }, args, { models }) => models.Channel.findAll({ where: { teamId: id } }),
  },
};
