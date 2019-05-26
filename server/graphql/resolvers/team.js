import formatErrors from '../../helpers/formatErrors';
import { requiresAuth } from '../../auth/permissions';

export default {
  Query: {
    // eslint-disable-next-line max-len
    allTeams: requiresAuth.createResolver(
      // eslint-disable-next-line max-len
      async (parent, args, { models, user }) => models.Team.findAll({ where: { owner: user.id } }, { raw: true }),
    ),
    inviteTeams: requiresAuth.createResolver(
      // eslint-disable-next-line max-len
      async (parent, args, { models, user }) => models.Team.findAll(
        {
          include: [
            {
              model: models.User,
              where: { id: user.id },
            },
          ],
        },
        { raw: true },
      ),
    ),
  },
  Mutation: {
    createTeam: requiresAuth.createResolver(
      async (parent, args, { models, user }) => {
        try {
          const response = await models.sequelize.transaction(async () => {
            const team = await models.Team.create({ ...args, owner: user.id });
            await models.Channel.create({
              name: 'general',
              public: true,
              teamId: team.id,
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
          const teamPromise = models.Team.findOne(
            { where: { id: teamId } },
            { raw: true },
          );
          const userToAddPromise = models.User.findOne(
            { where: { email } },
            { raw: true },
          );
          const [team, userToAdd] = await Promise.all([
            teamPromise,
            userToAddPromise,
          ]);
          if (team.owner !== user.id) {
            return {
              ok: false,
              errors: [
                {
                  path: 'email',
                  message: 'You cannot add members to the team ',
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
