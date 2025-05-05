import type { Resolvers } from '../../../generated/graphql';
import type { Context } from '../context';

const cookingStyleResolver: Resolvers<Context> = {
  Query: {
    cookingStyles(_parent, _args, ctx) {
      return ctx.dataSources.prisma.cookingStyle.findMany();
    },
  },
};

export default cookingStyleResolver;
