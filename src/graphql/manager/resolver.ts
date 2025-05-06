import type { Resolvers } from '../../../generated/graphql';
import { getPaginationInfo } from '../common/utils';
import type { Context } from '../context';

const managerResolver: Resolvers<Context> = {
  Manager: {
    async restaurants(manager, args, ctx) {
      const restaurants = await ctx.dataSources.prisma.manager
        .findUnique({
          where: {
            id: manager.id,
          },
        })
        .restaurants(getPaginationInfo(args.pagination));

      return restaurants || [];
    },
  },
  Query: {
    managers(_parent, args, ctx) {
      return ctx.dataSources.prisma.manager.findMany({
        ...getPaginationInfo(args.pagination),
        omit: {
          password: true,
        },
      });
    },
    async manager(_parent, args, ctx) {
      const manager = await ctx.dataSources.prisma.manager.findUnique({
        where: {
          id: args.id,
        },
      });

      if (!manager) {
        throw new Error('Manager not found');
      }

      return manager;
    },
  },

  Mutation: {
    async createManager(_parent, args, ctx) {
      const manager = await ctx.dataSources.prisma.manager.create({
        // @TODO: Hash password
        data: args.input,
      });

      return manager;
    },
    async updateManager(_parent, args, ctx) {
      const manager = await ctx.dataSources.prisma.manager.update({
        where: {
          id: args.id,
        },
        data: args.input,
      });
      return manager;
    },
    async deleteManager(_parent, args, ctx) {
      const manager = await ctx.dataSources.prisma.manager.delete({
        where: {
          id: args.id,
        },
      });

      return manager;
    },
  },
};

export default managerResolver;
