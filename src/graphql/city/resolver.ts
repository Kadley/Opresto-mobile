import type { Resolvers } from '../../../generated/graphql';
import type { Context } from '../context';

const cityResolver: Resolvers<Context> = {
  Query: {
    cities() {
      return [];
    },
  },
};

export default cityResolver;
