import React from 'react';
import {
  Text,
  View,
  ScrollView,
  Button,
  Linking,
  StyleSheet,
} from 'react-native';
import { useQuery } from '@apollo/client';
import { useLocalSearchParams } from 'expo-router';
import { GET_RESTAURANT_DETAILS } from '../graphql/getRestaurantDetails';

export default function RestaurantId() {
  const { id } = useLocalSearchParams();
  const restaurantId = typeof id === 'string' ? id : undefined;

  const { data, loading, error } = useQuery(GET_RESTAURANT_DETAILS, {
    variables: { id: restaurantId },
    skip: !restaurantId,
  });

  if (!restaurantId) return <Text>❌ ID invalide</Text>;
  if (loading) return <Text>Chargement...</Text>;
  if (error) return <Text>Erreur : {error.message}</Text>;

  const r = data.restaurant;

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Text style={styles.title}>{r.name}</Text>

      <View style={styles.card}>
        <Text style={styles.sectionTitle}>📄 Description</Text>
        <Text style={styles.text}>{r.description}</Text>
      </View>

      <View style={styles.card}>
        <Text style={styles.sectionTitle}>📍 Localisation</Text>
        <Text style={styles.text}>Adresse : {r.address}</Text>
        <Text style={styles.text}>
          Ville : {r.city.name} ({r.city.postalCode})
        </Text>
        <Text style={styles.text}>
          Terrasse : {r.terrace ? '✅ Oui' : '❌ Non'}
        </Text>
      </View>

      <View style={styles.card}>
        <Text style={styles.sectionTitle}>📞 Informations pratiques</Text>
        {r.phone && <Text style={styles.text}>Téléphone : {r.phone}</Text>}
        {r.openingHours && (
          <Text style={styles.text}>Horaires : {r.openingHours}</Text>
        )}
        {r.cuisine && <Text style={styles.text}>Cuisine : {r.cuisine}</Text>}
        {r.website && (
          <View style={{ marginTop: 10 }}>
            <Button
              title="🌐 Site web"
              onPress={() => Linking.openURL(r.website)}
            />
          </View>
        )}
      </View>

      <View style={styles.card}>
        <Text style={styles.sectionTitle}>👤 Gérant</Text>
        {r.manager ? (
          <>
            <Text style={styles.text}>
              {r.manager.firstname} {r.manager.lastname}
            </Text>
            <Text style={styles.text}>Email : {r.manager.email}</Text>
          </>
        ) : (
          <Text style={styles.text}>Non renseigné</Text>
        )}
      </View>

      {r.ratings && r.ratings.length > 0 && (
        <View style={styles.card}>
          <Text style={styles.sectionTitle}>⭐ Avis clients</Text>
          {r.ratings.map((rating: any) => (
            <Text key={rating.id} style={styles.text}>
              Note : {rating.value} / 5
            </Text>
          ))}
        </View>
      )}

      {r.cookingStyles && r.cookingStyles.length > 0 && (
        <View style={styles.card}>
          <Text style={styles.sectionTitle}>🍳 Styles de cuisine</Text>
          {r.cookingStyles.map((style: any) => (
            <Text key={style.id} style={styles.text}>
              • {style.label}
            </Text>
          ))}
        </View>
      )}
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: 16,
    backgroundColor: '#f7f7f7',
  },
  title: {
    fontSize: 28,
    fontWeight: 'bold',
    textAlign: 'center',
    marginBottom: 20,
    color: '#333',
  },
  card: {
    backgroundColor: '#fff',
    borderRadius: 12,
    padding: 16,
    marginBottom: 16,
    shadowColor: '#000',
    shadowOpacity: 0.08,
    shadowRadius: 6,
    elevation: 3,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: '600',
    marginBottom: 8,
    color: '#444',
  },
  text: {
    fontSize: 16,
    marginBottom: 4,
    color: '#555',
  },
});
