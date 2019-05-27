import formatErrors from '../../helpers/formatErrors';
import { requiresAuth } from '../../auth/permissions';

export default {
  Query: {},
  Mutation: {
    createChannel: requiresAuth.createResolver(
      async (parent, args, { models, user }) => {
        try {
          const team = await models.Team.findOne(
            { where: { id: args.teamId } },
            { raw: true },
          );
          if (team.owner !== user.id) {
            return {
              ok: false,
              errors: [
                {
                  path: 'name',
                  message: 'Only the owner of a team can create channels',
                },
              ],
            };
          }
          const channel = await models.Channel.create(args);
          return {
            ok: true,
            channel,
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
};
