import type { Resolvers } from '../../../generated/graphql';
import type { Context } from '../context';

const managerResolver: Resolvers<Context> = {
  Query: {
    managers(_parent, _args, ctx) {
      return ctx.dataSources.prisma.manager.findMany({
        omit: {
          password: true,
        },
      });
    },
  },
};

export default managerResolver;
