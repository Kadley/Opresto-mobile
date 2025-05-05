import type { Resolvers } from '../../../generated/graphql';
import type { Context } from '../context';

const cityResolver: Resolvers<Context> = {
  Query: {
    cities(_parent, _args, ctx) {
      return ctx.dataSources.prisma.city.findMany();
    },
  },
  Mutation: {
    async createCity(_parent, args, ctx) {
      const city = await ctx.dataSources.prisma.city.create({
        data: args.input,
      });

      return city;
    },
    async updateCity(_parent, args, ctx) {
      const city = await ctx.dataSources.prisma.city.update({
        where: {
          id: args.id,
        },
        data: args.input,
      });

      return city;
    },
  },
};

export default cityResolver;
