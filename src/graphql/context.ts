import type { StandaloneServerContextFunctionArgument } from '@apollo/server/dist/esm/standalone';
import { prisma } from '../utils/prisma';
import { WeatherAPI } from './dataSources/api/weather';

export async function createContext({
  req,
  res,
}: StandaloneServerContextFunctionArgument) {
  return {
    dataSources: {
      prisma,
      weatherAPI: new WeatherAPI(),
    },
  };
}

// On récupère également le type du context pour l'utiliser dans les resolvers
export type Context = Awaited<ReturnType<typeof createContext>>;
