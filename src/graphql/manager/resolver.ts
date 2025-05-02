import type { Resolvers } from '../../../generated/graphql';
import type { Context } from '../context';

const managerResolver: Resolvers<Context> = {
  Query: {
    managers() {
      return [];
    },
  },
};

export default managerResolver;
