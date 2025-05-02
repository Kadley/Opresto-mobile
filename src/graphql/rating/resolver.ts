import type { Resolvers } from '../../../generated/graphql';
import type { Context } from '../context';

const ratingResolver: Resolvers<Context> = {
  Query: {
    ratings() {
      return [];
    },
  },
};

export default ratingResolver;
