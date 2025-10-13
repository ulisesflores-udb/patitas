import React from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity, Pressable } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Ionicons } from '@expo/vector-icons';
import BottomNavBar from './BottomNavBar';

export default function SearchScreen({ navigation, allPets, usuario }) {
  const PetCard = ({ pet }) => (
    <TouchableOpacity
      activeOpacity={0.9}
      style={styles.card}
      onPress={() => navigation.navigate('PublicationDetail', { pet })}
    >
      <View style={styles.imageContainer}>
        <View style={styles.placeholderImage}>
          <View style={styles.headCircle} />
          <View style={styles.bodyCircle} />
        </View>
      </View>

      <View style={styles.cardInfo}>
        <Text style={styles.petName}>{pet.nombre_mascota}</Text>
        <Text style={styles.petLocation}>Ubicación: {pet.direccion_maps}</Text>

        <View style={styles.detailsRow}>
          <Text style={styles.petDetails}>Especie: {pet.especie}</Text>
          <Pressable
            style={styles.arrowButton}
            onPress={() => navigation.navigate('PublicationDetail', { pet })}
            hitSlop={12}
          >
            <Text style={styles.arrow}>›</Text>
          </Pressable>
        </View>

        <Text style={styles.petDetails}>Raza: {pet.raza}</Text>
      </View>
    </TouchableOpacity>
  );

  return (
    <View style={styles.container}>
      <SafeAreaView style={styles.safeArea} edges={['top']}>
        <View style={styles.header}>
          <TouchableOpacity style={styles.backButton} onPress={() => navigation.goBack()}>
            <Ionicons name="chevron-back" size={28} color="#4B2E0C" />
          </TouchableOpacity>
          <Text style={styles.headerTitle}>Todas las publicaciones</Text>
        </View>

        <ScrollView style={styles.scrollView} contentContainerStyle={styles.scrollContent} showsVerticalScrollIndicator={false}>
          <View style={styles.grid}>
            {allPets.map((pet) => (
              <PetCard key={pet.id} pet={pet} />
            ))}
          </View>
        </ScrollView>
      </SafeAreaView>

      <BottomNavBar navigation={navigation} currentScreen="Search" />
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#dbac7eff' },
  safeArea: { flex: 1 },
  header: { flexDirection: 'row', alignItems: 'center', paddingHorizontal: 20, paddingTop: 20, paddingBottom: 15 },
  backButton: { marginRight: 15 },
  headerTitle: { fontSize: 22, fontWeight: 'bold', color: '#4B2E0C' },
  scrollView: { flex: 1 },
  scrollContent: { paddingHorizontal: 20, paddingBottom: 20 },
  grid: { flexDirection: 'row', flexWrap: 'wrap', justifyContent: 'space-between' },
  card: { width: '48.5%', backgroundColor: '#9D8364', borderRadius: 16, marginBottom: 15, overflow: 'hidden' },
  imageContainer: { width: '100%', height: 150, backgroundColor: '#C19A6B', justifyContent: 'center', alignItems: 'center' },
  placeholderImage: { width: '100%', height: '100%', position: 'relative' },
  headCircle: { position: 'absolute', width: 80, height: 80, borderRadius: 40, backgroundColor: '#dbac7eff', top: 20, alignSelf: 'center' },
  bodyCircle: { position: 'absolute', width: 100, height: 100, borderRadius: 50, backgroundColor: '#dbac7eff', bottom: -30, alignSelf: 'center' },
  cardInfo: { padding: 12, backgroundColor: '#6A4E23' },
  petName: { fontSize: 20, fontWeight: 'bold', color: '#fff', marginBottom: 6 },
  petLocation: { fontSize: 12, color: '#fff', marginBottom: 10 },
  detailsRow: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' },
  petDetails: { fontSize: 13, color: '#fff', marginBottom: 4 },
  arrowButton: { width: 30, height: 30, borderRadius: 15, backgroundColor: '#4B2E0C', justifyContent: 'center', alignItems: 'center' },
  arrow: { fontSize: 24, color: '#fff', fontWeight: 'bold' },
});
