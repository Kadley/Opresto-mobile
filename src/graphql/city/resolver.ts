import type { Resolvers } from '../../../generated/graphql';
import type { Context } from '../context';

const cityResolver: Resolvers<Context> = {
  Query: {
    cities(_parent, _args, ctx) {
      return ctx.dataSources.prisma.city.findMany();
    },
  },
};

export default cityResolver;
