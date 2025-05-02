import { ApolloServer } from '@apollo/server';
import { startStandaloneServer } from '@apollo/server/standalone';
import { loadFilesSync } from '@graphql-tools/load-files';
import { mergeTypeDefs } from '@graphql-tools/merge';
import * as R from 'remeda';
import path from 'node:path';

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
  listen: { port: 4000 },
});

console.log(`🚀  Server ready at: ${url}`);
