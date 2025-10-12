import React from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity, Pressable } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import BottomNavBar from './BottomNavBar';

//  Ejemplo de datos locales con la MISMA forma que tu tabla
const publications = [
  {
    id: 1,
    id_usuario: 10,
    nombre_mascota: 'Firulais',
    descripcion: 'Es mediano, color amarillo, 5 años, collar rojo con número.',
    foto: null, // URL si tienes
    fecha_public: '2025-10-11T12:30:00Z',
    fecha_perdida: '2025-10-10',
    id_raza: 1,
    latitud: 13.6989,
    longitud: -89.245,
    radio: 300,
    direccion_maps: 'Col. Escalón, San Salvador',
    punto_referencia: 'Frente a un centro',
    mostrar_tel: 0,
    mostrar_redes: 1,
    estado: 1,
  },
  {
    id: 2,
    id_usuario: 11,
    nombre_mascota: 'Luna',
    descripcion: 'Blanca con manchas café. Muy dócil.',
    foto: null,
    fecha_public: '2025-10-12T09:10:00Z',
    fecha_perdida: '2025-10-11',
    id_raza: 2,
    latitud: 13.6929,
    longitud: -89.2182,
    radio: 200,
    direccion_maps: 'Santa Tecla, La Libertad',
    punto_referencia: 'Cerca del parque',
    mostrar_tel: 1,
    mostrar_redes: 0,
    estado: 1,
  },
];

// Id raza -> nombre (placeholder; conecta a tu catálogo real)
const RAZAS = {
  1: 'Golden Retriever',
  2: 'Labrador',
  3: 'Beagle',
};

export default function HomeScreen({ navigation }) {
  const Card = ({ pub }) => (
    <TouchableOpacity
      activeOpacity={0.9}
      style={styles.card}
      onPress={() => navigation.navigate('PublicationDetail', { publication: pub })}
    >
      {/* Placeholder "foto" */}
      <View style={styles.imageContainer}>
        <View style={styles.placeholderImage}>
          <View style={styles.headCircle} />
          <View style={styles.bodyCircle} />
        </View>
      </View>

      <View style={styles.cardInfo}>
        <Text style={styles.petName}>{pub.nombre_mascota}</Text>
        <Text style={styles.petLocation}>Ubicación: {pub.direccion_maps || '—'}</Text>

        <View style={styles.detailsRow}>
          <Text style={styles.petDetails}>Raza: {RAZAS[pub.id_raza] || `ID ${pub.id_raza}`}</Text>
          <Pressable
            style={styles.arrowButton}
            onPress={() => navigation.navigate('PublicationDetail', { publication: pub })}
            hitSlop={12}
          >
            <Text style={styles.arrow}>›</Text>
          </Pressable>
        </View>

        <Text style={styles.petDetails}>Referencia: {pub.punto_referencia || '—'}</Text>
      </View>
    </TouchableOpacity>
  );

  return (
    <View style={styles.container}>
      <SafeAreaView style={styles.safeArea} edges={['top']}>
        <Text style={styles.header}>Bienvenido Juan Pérez</Text>

        <ScrollView style={styles.scrollView} contentContainerStyle={styles.scrollContent} showsVerticalScrollIndicator={false}>
          <View style={styles.grid}>
            {publications.map((p) => (
              <Card key={p.id} pub={p} />
            ))}
          </View>

          <TouchableOpacity style={styles.seeMoreButton} onPress={() => navigation.navigate('Search')}>
            <Text style={styles.seeMoreText}>Ver más</Text>
          </TouchableOpacity>
        </ScrollView>
      </SafeAreaView>

      <BottomNavBar navigation={navigation} currentScreen="Home" />
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#dbac7eff' },
  safeArea: { flex: 1 },
  header: { fontSize: 28, fontWeight: 'bold', color: '#4B2E0C', paddingHorizontal: 20, paddingTop: 20, paddingBottom: 15 },
  scrollView: { flex: 1 },
  scrollContent: { paddingHorizontal: 20, paddingBottom: 20 },
  grid: { flexDirection: 'row', flexWrap: 'wrap', justifyContent: 'space-between' },

  card: {
    width: '48.5%',
    backgroundColor: '#9D8364',
    borderRadius: 16,
    marginBottom: 15,
    overflow: 'hidden',
    shadowColor: '#000',
    shadowOpacity: 0.15,
    shadowOffset: { width: 0, height: 4 },
    shadowRadius: 10,
    elevation: 7,
  },
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
  seeMoreButton: { backgroundColor: '#6A4E23', paddingVertical: 15, paddingHorizontal: 50, borderRadius: 12, alignSelf: 'center', marginTop: 10, marginBottom: 20 },
  seeMoreText: { color: '#fff', fontSize: 16, fontWeight: 'bold' },
});
