import type { Resolvers } from '../../../generated/graphql';
import type { Context } from '../context';

const ratingResolver: Resolvers<Context> = {
  Query: {
    ratings(_parent, _args, ctx) {
      return ctx.dataSources.prisma.rating.findMany();
    },
  },
};

export default ratingResolver;
