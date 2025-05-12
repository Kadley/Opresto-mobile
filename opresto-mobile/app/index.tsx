// indesx.tsx
import React from 'react';
import { FlatList, Text, View, Button } from 'react-native';
import { gql, useQuery } from '@apollo/client';
import { useRouter } from 'expo-router';

const GET_CITIES = gql`
  query {
    cities {
      id
      name
      postalCode
    }
  }
`;

export default function CityList() {
  const { loading, error, data } = useQuery(GET_CITIES);
  const router = useRouter();

  if (loading) return <Text>Chargement des villes...</Text>;
  if (error) return <Text>Erreur de chargement : {error.message}</Text>;

  return (
    <View style={{ padding: 16 }}>
      <Text style={{ fontSize: 22, fontWeight: 'bold', marginBottom: 16 }}>
        Villes disponibles
      </Text>

      <FlatList
        data={data.cities}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <View style={{ marginBottom: 10 }}>
            <Button
              title={`${item.name} (${item.postalCode})`}
              onPress={
                () => router.push(`/cityId?id=${item.id}`) // Correct usage
              }
            />
          </View>
        )}
      />
    </View>
  );
}
