import type { Resolvers } from '../../../generated/graphql';
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
      const pagination = args.pagination;
      const restaurants = await ctx.dataSources.prisma.city
        .findUnique({
          where: {
            id: parent.id,
          },
        })
        .restaurants({
          take: pagination?.limit || 10,
          skip: pagination?.offset || 0,
        });

      return restaurants || [];
    },
  },
  Query: {
    cities(_parent, args, ctx) {
      const pagination = args.pagination;
      return ctx.dataSources.prisma.city.findMany({
        take: pagination?.limit || 10,
        skip: pagination?.offset || 0,
      });
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
  },
};

export default cityResolver;
