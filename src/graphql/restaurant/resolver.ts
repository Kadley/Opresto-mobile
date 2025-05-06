import { skip } from 'node:test';
import type { Resolvers } from '../../../generated/graphql';
import type { Context } from '../context';

const restaurantResolver: Resolvers<Context> = {
  Restaurant: {
    async city(parent, _args, ctx) {
      const city = await ctx.dataSources.prisma.city.findUnique({
        where: {
          id: parent.cityId,
        },
      });

      if (!city) {
        throw new Error(`City with id ${parent.cityId} not found`);
      }

      return city;
    },
    async manager(parent, _args, ctx) {
      const manager = await ctx.dataSources.prisma.manager.findUnique({
        where: {
          id: parent.managerId,
        },
      });

      if (!manager) {
        throw new Error(`Manager with id ${parent.managerId} not found`);
      }

      return manager;
    },
    async cookingStyles(parent, _args, ctx) {
      // Ici, on fait autant de requêtes que de restaurants
      // const cookingStyles = await ctx.dataSources.prisma.cookingStyle.findMany({
      //   where: {
      //     restaurants: {
      //       some: {
      //         id: parent.id,
      //       },
      //     },
      //   },
      // });

      // De cette manière, prisma va être capable de regrouper toutes les requêtes pour les restaurants
      // Et récupérer les cooking styles en une seule requête
      const cookingStyles = await ctx.dataSources.prisma.restaurant
        .findUnique({
          where: {
            id: parent.id,
          },
        })
        .cookingStyles();

      return cookingStyles || [];
    },
    async ratings(parent, _args, ctx) {
      const ratings = await ctx.dataSources.prisma.restaurant
        .findUnique({
          where: {
            id: parent.id,
          },
        })
        .ratings();

      return ratings || [];
    },
  },
  Query: {
    // Dans chaque resolvers, on va avoir accès à 3 arguments :
    // _parent : le parent du resolver (on ne l'utilise pas ici car c'est un Query)
    // _args : les arguments (les paramètres) de la requête (on ne l'utilise pas ici car on ne prend pas d'arguments)
    // ctx : le context (on y a accès grâce à la fonction createContext)
    restaurants(_parent, _args, ctx) {
      return ctx.dataSources.prisma.restaurant.findMany();
    },

    async restaurant(_parent, args, ctx) {
      const restaurant = await ctx.dataSources.prisma.restaurant.findUnique({
        where: {
          id: args.id,
        },
      });

      if (!restaurant) {
        throw new Error('Restaurant not found');
      }

      return restaurant;
    },
  },
  Mutation: {
    async createRestaurant(_parent, args, ctx) {
      // On va vérifier si la ville et le nom du restaurant ne sont pas déjà pris
      const existingRestaurant =
        await ctx.dataSources.prisma.restaurant.findFirst({
          where: {
            name: args.input.name,
            cityId: args.input.cityId,
          },
        });

      if (existingRestaurant) {
        throw new Error(
          `Restaurant with name ${args.input.name} already exists in city with id ${args.input.cityId}`,
        );
      }

      const restaurant = await ctx.dataSources.prisma.restaurant.create({
        data: {
          ...args.input,
          // Si la terrace est null, on ne l'envoie pas à la BDD
          terrace: args.input.terrace || undefined,
        },
      });

      return restaurant;
    },
  },
};

export default restaurantResolver;
