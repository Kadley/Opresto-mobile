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
  },
  Query: {
    // Dans chaque resolvers, on va avoir accès à 3 arguments :
    // _parent : le parent du resolver (on ne l'utilise pas ici car c'est un Query)
    // _args : les arguments (les paramètres) de la requête (on ne l'utilise pas ici car on ne prend pas d'arguments)
    // ctx : le context (on y a accès grâce à la fonction createContext)
    restaurants(_parent, _args, ctx) {
      return ctx.dataSources.prisma.restaurant.findMany();
    },
  },
};

export default restaurantResolver;
