import React from 'react';
import { View, Text, StyleSheet, ScrollView, Image, TouchableOpacity } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import BottomNavBar from './BottomNavBar';

export default function HomeScreen({ navigation }) {
  // Datos de ejemplo para las mascotas
  const pets = [
    {
      id: 1,
      name: 'Firulais',
      location: 'Col. Escalón, San Salvador',
      species: 'Perro',
      breed: 'Golden Retriever',
    },
    {
      id: 2,
      name: 'Firulais',
      location: 'Col. Escalón, San Salvador',
      species: 'Perro',
      breed: 'Golden Retriever',
    },
    {
      id: 3,
      name: 'Firulais',
      location: 'Col. Escalón, San Salvador',
      species: 'Perro',
      breed: 'Golden Retriever',
    },
    {
      id: 4,
      name: 'Firulais',
      location: 'Col. Escalón, San Salvador',
      species: 'Perro',
      breed: 'Golden Retriever',
    },
  ];

  const PetCard = ({ pet }) => (
    <View style={styles.card}>
      {/* Imagen del placeholder de mascota */}
      <View style={styles.imageContainer}>
        <View style={styles.placeholderImage}>
          <View style={styles.headCircle} />
          <View style={styles.bodyCircle} />
        </View>
      </View>

      {/* Información de la mascota */}
      <View style={styles.cardInfo}>
        <Text style={styles.petName}>{pet.name}</Text>
        <Text style={styles.petLocation}>Ubicación: {pet.location}</Text>
        
        <View style={styles.detailsRow}>
          <Text style={styles.petDetails}>Especie: {pet.species}</Text>
          <TouchableOpacity style={styles.arrowButton}>
            <Text style={styles.arrow}>›</Text>
          </TouchableOpacity>
        </View>
        <Text style={styles.petDetails}>Raza: {pet.breed}</Text>
      </View>
    </View>
  );

  return (
    <View style={styles.container}>
      <SafeAreaView style={styles.safeArea} edges={['top']}>
        {/* Header */}
        <Text style={styles.header}>Bienvenido Juan Pérez</Text>

        {/* Lista de mascotas */}
        <ScrollView 
          style={styles.scrollView}
          contentContainerStyle={styles.scrollContent}
          showsVerticalScrollIndicator={false}>
          <View style={styles.grid}>
            {pets.map((pet) => (
              <PetCard key={pet.id} pet={pet} />
            ))}
          </View>

          {/* Botón Ver más */}
          <TouchableOpacity style={styles.seeMoreButton}>
            <Text style={styles.seeMoreText}>Ver más</Text>
          </TouchableOpacity>
        </ScrollView>
      </SafeAreaView>

      {/* Navbar inferior */}
      <BottomNavBar navigation={navigation} currentScreen="Home" />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#dbac7eff',
  },
  safeArea: {
    flex: 1,
  },
  header: {
    fontSize: 28,
    fontWeight: 'bold',
    color: '#4B2E0C',
    paddingHorizontal: 20,
    paddingTop: 20,
    paddingBottom: 15,
  },
  scrollView: {
    flex: 1,
  },
  scrollContent: {
    paddingHorizontal: 20,
    paddingBottom: 20,
  },
  grid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
  },
  card: {
    width: '48.5%',
    backgroundColor: '#9D8364',
    borderRadius: 16,
    marginBottom: 15,
    overflow: 'hidden',
  },
  imageContainer: {
    width: '100%',
    height: 150,
    backgroundColor: '#C19A6B',
    justifyContent: 'center',
    alignItems: 'center',
  },
  placeholderImage: {
    width: '100%',
    height: '100%',
    position: 'relative',
  },
  headCircle: {
    position: 'absolute',
    width: 80,
    height: 80,
    borderRadius: 40,
    backgroundColor: '#dbac7eff',
    top: 20,
    alignSelf: 'center',
  },
  bodyCircle: {
    position: 'absolute',
    width: 100,
    height: 100,
    borderRadius: 50,
    backgroundColor: '#dbac7eff',
    bottom: -30,
    alignSelf: 'center',
  },
  cardInfo: {
    padding: 12,
    backgroundColor: '#6A4E23',
  },
  petName: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#fff',
    marginBottom: 6,
  },
  petLocation: {
    fontSize: 12,
    color: '#fff',
    marginBottom: 10,
  },
  detailsRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  petDetails: {
    fontSize: 13,
    color: '#fff',
    marginBottom: 4,
  },
  arrowButton: {
    width: 30,
    height: 30,
    borderRadius: 15,
    backgroundColor: '#4B2E0C',
    justifyContent: 'center',
    alignItems: 'center',
  },
  arrow: {
    fontSize: 24,
    color: '#fff',
    fontWeight: 'bold',
  },
  seeMoreButton: {
    backgroundColor: '#6A4E23',
    paddingVertical: 15,
    paddingHorizontal: 50,
    borderRadius: 12,
    alignSelf: 'center',
    marginTop: 10,
    marginBottom: 20,
  },
  seeMoreText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
  },
});