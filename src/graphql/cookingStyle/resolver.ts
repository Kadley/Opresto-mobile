import type { Resolvers } from '../../../generated/graphql';
import type { Context } from '../context';

const cookingStyleResolver: Resolvers<Context> = {
  Query: {
    cookingStyles() {
      return [];
    },
  },
};

export default cookingStyleResolver;
