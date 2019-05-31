import { tryLogin } from '../../auth/auth';
import formatErrors from '../../helpers/formatErrors';
import { requiresAuth } from '../../auth/permissions';

export default {
  User: {
    teams: (parent, args, { models, user }) =>
      models.sequelize.query(
        'select * from teams t join members m on t.id = m.team_id where m.user_id = ?',
        {
          replacements: [user.id],
          model: models.Team,
          raw: true,
        },
      ),
  },
  Query: {
    allUsers: (parent, args, { models }) =>
      models.User.findAll(),
    me: requiresAuth.createResolver((parent, args, { models, user }) =>
      models.User.findOne({ where: { id: user.id } })),
    login: (parent, { email, password }, { models, SECRET, SECRET2 }) =>
      tryLogin(email, password, models, SECRET, SECRET2),
  },
  Mutation: {
    register: async (parent, args, { models }) => {
      try {
        const user = await models.User.create(args);
        return {
          ok: true,
          user,
        };
      } catch (err) {
        return {
          ok: false,
          errors: formatErrors(err, models),
        };
      }
    },
  },
};
