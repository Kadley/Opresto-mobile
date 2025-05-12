import type React from 'react';
import {
  ApolloClient,
  InMemoryCache,
  ApolloProvider as Provider,
} from '@apollo/client';
import { Platform } from 'react-native';

const uri =
  Platform.OS === 'web'
    ? 'http://localhost:4000/graphql' // Utiliser localhost pour le web
    : 'http://192.168.93.131:4000/graphql'; // Remplacer localhost par l'IP de ton PC pour Expo Go

const client = new ApolloClient({
  uri,
  cache: new InMemoryCache(),
});

export const ApolloProvider = ({ children }: { children: React.ReactNode }) => (
  <Provider client={client}>{children}</Provider>
);
