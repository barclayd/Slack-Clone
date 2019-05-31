import formatErrors from '../../helpers/formatErrors';
import { requiresAuth } from '../../auth/permissions';

export default {
  Mutation: {
    createTeam: requiresAuth.createResolver(
      async (parent, args, { models, user }) => {
        try {
          const response = await models.sequelize.transaction(async () => {
            const team = await models.Team.create({ ...args });
            await models.Channel.create({
              name: 'general',
              public: true,
              teamId: team.id,
            });
            await models.Member.create({
              teamId: team.id,
              userId: user.id,
              admin: true,
            });
            return team;
          });
          return {
            ok: true,
            team: response,
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
    addTeamMember: requiresAuth.createResolver(
      async (parent, { email, teamId }, { models, user }) => {
        try {
          const memberPromise = models.Member.findOne(
            { where: { teamId, userId: user.id } },
            { raw: true },
          );
          const userToAddPromise = models.User.findOne(
            { where: { email } },
            { raw: true },
          );
          const [member, userToAdd] = await Promise.all([
            memberPromise,
            userToAddPromise,
          ]);
          if (member.dataValues.admin) {
            return {
              ok: false,
              errors: [
                {
                  path: 'email',
                  message: 'You cannot add members to the team',
                },
              ],
            };
          }
          if (!userToAdd) {
            return {
              ok: false,
              errors: [
                {
                  path: 'email',
                  message: 'User with specified email does not exist',
                },
              ],
            };
          }
          await models.Member.create({ userId: userToAdd.id, teamId });
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
