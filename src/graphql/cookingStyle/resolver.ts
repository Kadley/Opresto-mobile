import type { Resolvers } from '../../../generated/graphql';
import { getPaginationInfo } from '../common/utils';
import type { Context } from '../context';

const cookingStyleResolver: Resolvers<Context> = {
  CookingStyle: {
    async restaurants(cookingStyle, args, ctx) {
      const restaurants = await ctx.dataSources.prisma.cookingStyle
        .findUnique({
          where: {
            id: cookingStyle.id,
          },
        })
        .restaurants(getPaginationInfo(args.pagination));

      return restaurants || [];
    },
  },
  Query: {
    cookingStyles(_parent, args, ctx) {
      return ctx.dataSources.prisma.cookingStyle.findMany(
        getPaginationInfo(args.pagination),
      );
    },
    async cookingStyle(_parent, args, ctx) {
      const cookingStyle = await ctx.dataSources.prisma.cookingStyle.findUnique(
        {
          where: {
            id: args.id,
          },
        },
      );

      if (!cookingStyle) {
        throw new Error('Cooking style not found');
      }

      return cookingStyle;
    },
  },
  Mutation: {
    async createCookingStyle(_parent, args, ctx) {
      const cookingStyle = await ctx.dataSources.prisma.cookingStyle.create({
        data: args.input,
      });

      return cookingStyle;
    },
    async updateCookingStyle(_parent, args, ctx) {
      const cookingStyle = await ctx.dataSources.prisma.cookingStyle.update({
        where: {
          id: args.id,
        },
        data: args.input,
      });

      return cookingStyle;
    },
    async deleteCookingStyle(_parent, args, ctx) {
      const cookingStyle = await ctx.dataSources.prisma.cookingStyle.delete({
        where: {
          id: args.id,
        },
      });

      return cookingStyle;
    },
  },
};

export default cookingStyleResolver;
