import { ApolloServer } from '@apollo/server';
import { startStandaloneServer } from '@apollo/server/standalone';
import { loadFilesSync } from '@graphql-tools/load-files';
import { mergeTypeDefs } from '@graphql-tools/merge';
import * as R from 'remeda';
import path from 'node:path';
import { prisma } from './utils/prisma';
import { createContext } from './graphql/context';
import { WeatherAPI } from './graphql/dataSources/api/weather';

const typesArray = loadFilesSync(
  path.join(import.meta.dirname, './graphql/**/*.graphql'),
);
const typeDefs = mergeTypeDefs(typesArray);

const resolversArray = loadFilesSync(
  path.join(import.meta.dirname, './graphql/**/resolver.ts'),
);
const resolvers = resolversArray.reduce(
  (acc, resolver) => R.mergeDeep(acc, resolver),
  {},
);

const server = new ApolloServer({
  typeDefs,
  resolvers,
});

const { url } = await startStandaloneServer(server, {
  listen: { port: 4000, host: '0.0.0.0' },
  // Le context va permettre de passer des données à tous les resolvers
  // On y passe généralement la connexion à la BDD, le user connecté, les sources de données que l'on peut avoir.
  context: createContext,
});

console.log(`🚀  Server ready at: ${url}`);

// const weatherAPI = new WeatherAPI();
// Exemple d'utilisation de la dataSource WeatherAPI
// const data = await weatherAPI.getWeather('50.366669', '3.06667');
