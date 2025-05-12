// app/_layout.tsx

import { ApolloProvider } from '../AppoloProvider'; // ✅

import { Stack } from 'expo-router';

export default function Layout() {
  return (
    <ApolloProvider>
      <Stack />
    </ApolloProvider>
  );
}
