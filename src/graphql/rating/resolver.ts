import type { Resolvers } from '../../../generated/graphql';
import { getPaginationInfo } from '../common/utils';
import type { Context } from '../context';

const ratingResolver: Resolvers<Context> = {
  Rating: {
    async restaurant(parent, args, ctx) {
      const restaurant = await ctx.dataSources.prisma.restaurant.findUnique({
        where: {
          id: parent.restaurantId,
        },
      });

      if (!restaurant) {
        throw new Error('Restaurant not found');
      }

      return restaurant;
    },
  },
  Query: {
    ratings(_parent, args, ctx) {
      return ctx.dataSources.prisma.rating.findMany(
        getPaginationInfo(args.pagination),
      );
    },
    async rating(_parent, args, ctx) {
      const rating = await ctx.dataSources.prisma.rating.findUnique({
        where: {
          id: args.id,
        },
      });

      if (!rating) {
        throw new Error('Rating not found');
      }

      return rating;
    },
  },

  Mutation: {
    async createRating(_parent, args, ctx) {
      const rating = await ctx.dataSources.prisma.rating.create({
        data: args.input,
      });

      return rating;
    },
    async updateRating(_parent, args, ctx) {
      const rating = await ctx.dataSources.prisma.rating.update({
        where: {
          id: args.id,
        },
        data: args.input,
      });

      return rating;
    },
    async deleteRating(_parent, args, ctx) {
      const rating = await ctx.dataSources.prisma.rating.delete({
        where: {
          id: args.id,
        },
      });

      return rating;
    },
  },
};

export default ratingResolver;
