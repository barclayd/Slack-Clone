import formatErrors from '../../helpers/formatErrors';
import { requiresAuth } from '../../auth/permissions';

export default {
  Query: {},
  Mutation: {
    createTeam: requiresAuth.createResolver(async (parent, args, { models, user }) => {
      try {
        await models.Team.create({ ...args, owner: user.id });
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
    }),
  },
};
