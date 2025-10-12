import React from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Ionicons } from '@expo/vector-icons';
import BottomNavBar from './BottomNavBar';

export default function SearchScreen({ navigation }) {
  // Array con muchas mascotas
  const allPets = [
    { id: 1, name: 'Firulais', location: 'Col. Escalón, San Salvador', species: 'Perro', breed: 'Golden Retriever' },
    { id: 2, name: 'Mimi', location: 'Col. Escalón, San Salvador', species: 'Gato', breed: 'Persa' },
    { id: 3, name: 'Rex', location: 'Col. Escalón, San Salvador', species: 'Perro', breed: 'Pastor Alemán' },
    { id: 4, name: 'Whiskers', location: 'Col. Escalón, San Salvador', species: 'Gato', breed: 'Siamés' },
    { id: 5, name: 'Buddy', location: 'Col. Escalón, San Salvador', species: 'Perro', breed: 'Labrador' },
    { id: 6, name: 'Luna', location: 'Col. Escalón, San Salvador', species: 'Gato', breed: 'Gato Callejero' },
    { id: 7, name: 'Max', location: 'Col. Escalón, San Salvador', species: 'Perro', breed: 'Bulldog' },
    { id: 8, name: 'Fluffy', location: 'Col. Escalón, San Salvador', species: 'Gato', breed: 'Angora' },
    { id: 9, name: 'Charlie', location: 'Col. Escalón, San Salvador', species: 'Perro', breed: 'Cocker Spaniel' },
    { id: 10, name: 'Nala', location: 'Col. Escalón, San Salvador', species: 'Gato', breed: 'Bengalí' },
    { id: 11, name: 'Rocky', location: 'Col. Escalón, San Salvador', species: 'Perro', breed: 'Rottweiler' },
    { id: 12, name: 'Bella', location: 'Col. Escalón, San Salvador', species: 'Gato', breed: 'Ragdoll' },
    { id: 13, name: 'Cooper', location: 'Col. Escalón, San Salvador', species: 'Perro', breed: 'Beagle' },
    { id: 14, name: 'Shadow', location: 'Col. Escalón, San Salvador', species: 'Gato', breed: 'Gato Negro' },
    { id: 15, name: 'Duke', location: 'Col. Escalón, San Salvador', species: 'Perro', breed: 'Doberman' },
    { id: 16, name: 'Smokey', location: 'Col. Escalón, San Salvador', species: 'Gato', breed: 'Gato Gris' },
    { id: 17, name: 'Oliver', location: 'Col. Escalón, San Salvador', species: 'Perro', breed: 'Shiba Inu' },
    { id: 18, name: 'Mittens', location: 'Col. Escalón, San Salvador', species: 'Gato', breed: 'Gato Blanco' },
  ];

  const PetCard = ({ pet }) => (
    <View style={styles.card}>
      <View style={styles.imageContainer}>
        <View style={styles.placeholderImage}>
          <View style={styles.headCircle} />
          <View style={styles.bodyCircle} />
        </View>
      </View>

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
        {/* Header con botón de regreso */}
        <View style={styles.header}>
          <TouchableOpacity 
            style={styles.backButton}
            onPress={() => navigation.goBack()}>
            <Ionicons name="chevron-back" size={28} color="#4B2E0C" />
          </TouchableOpacity>
          <Text style={styles.headerTitle}>Todos los animales</Text>
        </View>

        {/* Lista de mascotas */}
        <ScrollView 
          style={styles.scrollView}
          contentContainerStyle={styles.scrollContent}
          showsVerticalScrollIndicator={false}>
          <View style={styles.grid}>
            {allPets.map((pet) => (
              <PetCard key={pet.id} pet={pet} />
            ))}
          </View>
        </ScrollView>
      </SafeAreaView>

      {/* Navbar inferior */}
      <BottomNavBar navigation={navigation} currentScreen="Search" />
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
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 20,
    paddingTop: 20,
    paddingBottom: 15,
  },
  backButton: {
    marginRight: 15,
  },
  headerTitle: {
    fontSize: 28,
    fontWeight: 'bold',
    color: '#4B2E0C',
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
});