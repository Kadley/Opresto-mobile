import type { CodegenConfig } from '@graphql-codegen/cli';

const config: CodegenConfig = {
  overwrite: true,
  schema: 'src/graphql/**/*.graphql',
  generates: {
    'generated/graphql.ts': {
      config: {
        // Pour qu'il ne me force pas à retourner toutes les données dans mes resolvers
        // Car je vais utiliser les resolvers sur les Type "Restaurant" / "City"
        defaultMapper: 'Partial<{T}>',
      },
      plugins: ['typescript', 'typescript-resolvers'],
    },
  },
};

export default config;
