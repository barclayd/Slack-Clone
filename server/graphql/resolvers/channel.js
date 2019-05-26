import formatErrors from '../../helpers/formatErrors';

export default {
  Query: {},
  Mutation: {
    createChannel: async (parent, args, { models }) => {
      try {
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
  },
};
