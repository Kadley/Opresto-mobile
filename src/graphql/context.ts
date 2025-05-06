import type { StandaloneServerContextFunctionArgument } from '@apollo/server/dist/esm/standalone';
import { prisma } from '../utils/prisma';
import { WeatherAPI } from './dataSources/api/weather';
import { InMemoryLRUCache } from '@apollo/utils.keyvaluecache';

// Un cache qui se clear toutes les heures
const cache = new InMemoryLRUCache({
  ttl: 60 * 60, // 1 hour
  max: 500,
});

export async function createContext({
  req,
  res,
}: StandaloneServerContextFunctionArgument) {
  return {
    dataSources: {
      prisma,
      weatherAPI: new WeatherAPI({ cache }),
    },
  };
}

// On récupère également le type du context pour l'utiliser dans les resolvers
export type Context = Awaited<ReturnType<typeof createContext>>;
