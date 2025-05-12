import React from 'react';
import { Text, Button, Linking, ScrollView, View } from 'react-native';
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
  const { id } = useLocalSearchParams(); // Récupère le paramètre 'id'

  console.log('ID récupéré:', id); // Vérifie si l'ID est bien récupéré

  const { data, loading, error } = useQuery(GET_CITY_DETAILS, {
    variables: { id }, // Passe 'id' à la requête GraphQL
  });

  if (loading) return <Text>Chargement...</Text>;
  if (error) return <Text>Erreur : {error.message}</Text>;

  const city = data.city;

  return (
    <ScrollView contentContainerStyle={{ padding: 16 }}>
      <Text style={{ fontSize: 24, fontWeight: 'bold' }}>
        {city.name} ({city.postalCode})
      </Text>

      <Text style={{ fontSize: 18, marginTop: 10 }}>
        🌡️ Météo : {city.weather.currentTemperature}°C
      </Text>
      <Text style={{ fontSize: 18 }}>
        Max : {city.weather.temperatureMax}°C | Min :{' '}
        {city.weather.temperatureMin}°C
      </Text>
      <Text style={{ fontSize: 18, marginTop: 10 }}>
        🌤️ {city.weather.weatherCodeDescription}
      </Text>

      <Text style={{ fontSize: 18, fontWeight: 'bold', marginTop: 20 }}>
        🍽️ Restaurants :
      </Text>
      {city.restaurants.map((r: Restaurant, index: number) => (
        <Text key={r.name} style={{ marginLeft: 8 }}>
          • {r.name} ({r.description},{' '}
          {r.terrace ? 'Terrace disponible' : 'Pas de terrasse'}) - {r.address}
        </Text>
      ))}

      <View style={{ marginTop: 20 }}>
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
