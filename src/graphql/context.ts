import type { StandaloneServerContextFunctionArgument } from '@apollo/server/dist/esm/standalone';
import { prisma } from '../utils/prisma';

export async function createContext({
  req,
  res,
}: StandaloneServerContextFunctionArgument) {
  return {
    dataSources: {
      prisma,
    },
  };
}

// On récupère également le type du context pour l'utiliser dans les resolvers
export type Context = Awaited<ReturnType<typeof createContext>>;
