import React from 'react';
import { Text, ScrollView, Pressable, StyleSheet } from 'react-native';
import { useQuery } from '@apollo/client';
import { GET_HOME_DATA } from '../graphql/getHomeData';
import { useRouter, Stack } from 'expo-router';

export default function Home() {
  const { data, loading, error } = useQuery(GET_HOME_DATA);
  const router = useRouter();

  return (
    <>
      <Stack.Screen options={{ title: 'Accueil' }} />

      {loading && <Text style={styles.loading}>Chargement...</Text>}
      {error && <Text style={styles.error}>Erreur : {error.message}</Text>}

      {!loading && !error && (
        <ScrollView contentContainerStyle={styles.container}>
          <Text style={styles.header}>🏙️ Villes disponibles</Text>
          {data.cities.map((city: any) => (
            <Pressable
              key={city.id}
              style={styles.card}
              onPress={() =>
                router.push({ pathname: '/cityId', params: { id: city.id } })
              }
            >
              <Text style={styles.cardTitle}>{city.name}</Text>
              <Text style={styles.cardSubtitle}>
                Code postal : {city.postalCode}
              </Text>
            </Pressable>
          ))}

          <Text style={styles.header}>🍴 Restaurants à découvrir</Text>
          {data.restaurants.map((r: any) => (
            <Pressable
              key={r.id}
              style={styles.card}
              onPress={() =>
                router.push({ pathname: '/restaurantId', params: { id: r.id } })
              }
            >
              <Text style={styles.cardTitle}>{r.name}</Text>
              <Text style={styles.cardSubtitle}>Ville : {r.city.name}</Text>
            </Pressable>
          ))}
        </ScrollView>
      )}
    </>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: 16,
    backgroundColor: '#f4f4f4',
  },
  header: {
    fontSize: 26,
    fontWeight: '700',
    marginVertical: 16,
    textAlign: 'center',
    color: '#222',
  },
  card: {
    backgroundColor: '#fff',
    borderRadius: 12,
    padding: 16,
    marginBottom: 12,
    shadowColor: '#000',
    shadowOpacity: 0.07,
    shadowRadius: 5,
    elevation: 3,
  },
  cardTitle: {
    fontSize: 18,
    fontWeight: '600',
    color: '#333',
  },
  cardSubtitle: {
    fontSize: 15,
    color: '#666',
    marginTop: 4,
  },
  loading: {
    textAlign: 'center',
    marginTop: 50,
    fontSize: 18,
  },
  error: {
    color: 'red',
    textAlign: 'center',
    marginTop: 50,
    fontSize: 18,
  },
});
