import type { Resolvers } from '../../../generated/graphql';
import { getPaginationInfo } from '../common/utils';
import type { Context } from '../context';

const cityResolver: Resolvers<Context> = {
  City: {
    async weather(parent, _args, ctx) {
      // Utiliser notre dataSource pour récupérer la météo depuis la latitude et la longitude de notre ville
      const [latitude, longitude] = parent.geopos?.split(',') || [];

      if (!latitude || !longitude) {
        return null;
      }

      return ctx.dataSources.weatherAPI.getWeather(latitude, longitude);
    },

    async restaurants(parent, args, ctx) {
      const restaurants = await ctx.dataSources.prisma.city
        .findUnique({
          where: {
            id: parent.id,
          },
        })
        .restaurants(getPaginationInfo(args.pagination));

      return restaurants || [];
    },
  },
  Query: {
    cities(_parent, args, ctx) {
      return ctx.dataSources.prisma.city.findMany(
        getPaginationInfo(args.pagination),
      );
    },
    async city(_parent, args, ctx) {
      const city = await ctx.dataSources.prisma.city.findUnique({
        where: {
          id: args.id,
        },
      });

      if (!city) {
        throw new Error('City not found');
      }

      return city;
    },
    async cityByPostalCode(_parent, args, ctx) {
      const city = await ctx.dataSources.prisma.city.findFirst({
        where: {
          postalCode: args.postalCode,
        },
      });

      if (!city) {
        throw new Error('City not found');
      }

      return city;
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
    async deleteCity(_parent, args, ctx) {
      const city = await ctx.dataSources.prisma.city.delete({
        where: {
          id: args.id,
        },
      });

      return city;
    },
  },
};

export default cityResolver;
