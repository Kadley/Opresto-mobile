import React from 'react';
import {
  Text,
  Button,
  Linking,
  ScrollView,
  View,
  StyleSheet,
} from 'react-native';
import { gql, useQuery } from '@apollo/client';
import { useLocalSearchParams } from 'expo-router';

type Restaurant = {
  name: string;
  description: string;
  terrace: boolean;
  address: string;
};

const GET_CITY_DETAILS = gql`
  query City($id: ID!) {
    city(id: $id) {
      id
      name
      postalCode
      geopos
      weather {
        currentTemperature
        weatherCodeDescription
        temperatureMax
        temperatureMin
      }
      restaurants {
        name
        description
        terrace
        address
      }
    }
  }
`;

export default function CityId() {
  const { id } = useLocalSearchParams();
  const { data, loading, error } = useQuery(GET_CITY_DETAILS, {
    variables: { id },
    skip: !id || typeof id !== 'string',
  });

  if (loading) return <Text style={styles.loading}>Chargement...</Text>;
  if (error) return <Text style={styles.error}>Erreur : {error.message}</Text>;

  const city = data.city;

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Text style={styles.title}>
        {city.name} ({city.postalCode})
      </Text>

      <View style={styles.card}>
        <Text style={styles.sectionTitle}>🌤️ Météo actuelle</Text>
        <Text style={styles.text}>
          Température : {city.weather.currentTemperature}°C
        </Text>
        <Text style={styles.text}>Max : {city.weather.temperatureMax}°C</Text>
        <Text style={styles.text}>Min : {city.weather.temperatureMin}°C</Text>
        <Text style={styles.text}>
          Conditions : {city.weather.weatherCodeDescription}
        </Text>
      </View>

      <View style={styles.card}>
        <Text style={styles.sectionTitle}>🍽️ Restaurants disponibles</Text>
        {city.restaurants.map((r: Restaurant, index: number) => (
          <View key={r.name} style={styles.restaurantItem}>
            <Text style={styles.restaurantName}>{r.name}</Text>
            <Text style={styles.text}>{r.description}</Text>
            <Text style={styles.text}>
              {r.terrace ? '✅ Terrasse disponible' : '❌ Pas de terrasse'}
            </Text>
            <Text style={styles.text}>📍 {r.address}</Text>
          </View>
        ))}
      </View>

      <View style={styles.card}>
        <Text style={styles.sectionTitle}>🗺️ Carte</Text>
        <Button
          title="Voir sur Google Maps"
          onPress={() =>
            Linking.openURL(`https://www.google.com/maps/place/${city.geopos}`)
          }
        />
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: 16,
    backgroundColor: '#f2f2f2',
  },
  title: {
    fontSize: 28,
    fontWeight: 'bold',
    textAlign: 'center',
    marginBottom: 20,
    color: '#222',
  },
  sectionTitle: {
    fontSize: 20,
    fontWeight: '600',
    marginBottom: 10,
    color: '#444',
  },
  card: {
    backgroundColor: '#fff',
    padding: 16,
    borderRadius: 12,
    marginBottom: 16,
    shadowColor: '#000',
    shadowOpacity: 0.05,
    shadowRadius: 6,
    elevation: 3,
  },
  text: {
    fontSize: 16,
    color: '#555',
    marginBottom: 4,
  },
  restaurantItem: {
    marginBottom: 12,
    paddingBottom: 8,
    borderBottomWidth: 0.5,
    borderBottomColor: '#ccc',
  },
  restaurantName: {
    fontSize: 17,
    fontWeight: 'bold',
    color: '#333',
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
