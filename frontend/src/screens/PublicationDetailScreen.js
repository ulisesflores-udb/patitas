import React from 'react';
import { View, Text, StyleSheet, Image, TouchableOpacity, ScrollView } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Ionicons } from '@expo/vector-icons';
import BottomNavBar from './BottomNavBar';

export default function PublicationDetailScreen({ navigation, route }) {
  const { pet } = route.params;

  const description =
    'Es mediano, color amarillo de unos 5 años y tiene un collar rojo con el nombre y número de teléfono en su plaquita.';

  return (
    <View style={styles.container}>
      <SafeAreaView style={{ flex: 1 }} edges={['top']}>
        {/* Header */}
        <View style={styles.header}>
          <TouchableOpacity onPress={() => navigation.goBack()} style={styles.headerLeft}>
            <Ionicons name="chevron-back" size={22} color="#3C2A1E" />
          </TouchableOpacity>
          <Text style={styles.headerTitle}>Todas las publicaciones</Text>
          <View style={{ width: 22 }} />
        </View>

        <ScrollView contentContainerStyle={{ padding: 20 }} showsVerticalScrollIndicator={false}>
          {/* Título y raza */}
          <View style={styles.titleRow}>
            <Text style={styles.petName}>{pet.name}</Text>
            <Text style={styles.breed}>{pet.breed}</Text>
          </View>

          {/* Avatar/placeholder */}
          <View style={styles.avatar}>
            <View style={styles.head} />
            <View style={styles.body} />
          </View>

          {/* Descripción */}
          <View style={styles.bubble}>
            <Text style={styles.bubbleText}>{description}</Text>
          </View>

          {/* Ubicación */}
          <Text style={styles.sectionText}>San Salvador,</Text>
          <Text style={styles.sectionText}>San Salvador Centro,</Text>
          <Text style={[styles.sectionText, { marginBottom: 10 }]}>Distrito de San Salvador</Text>

          {/* Mapa (placeholder) */}
          <View style={styles.mapWrapper}>
            <Image
              source={{ uri: 'https://maps.gstatic.com/tactile/omnibox/placeholder_map.png' }}
              style={styles.map}
              resizeMode="cover"
            />
            <Text style={styles.mapHint}>Pulsa para ampliar</Text>
          </View>

          {/* Referencia */}
          <View style={{ marginTop: 14 }}>
            <Text style={[styles.sectionText, { marginBottom: 4 }]}>Referencia:</Text>
            <Text style={styles.sectionText}>Frente a un centro</Text>
          </View>

          {/* CTA */}
          <TouchableOpacity
            style={styles.cta}
            onPress={() => navigation.navigate('Responder', { pet })}
          >
            <Text style={styles.ctaText}>¿Tienes información? Pulsa aquí</Text>
          </TouchableOpacity>

          {/* Respuestas (ejemplo) */}
          <View style={{ marginTop: 8 }}>
            <Text style={styles.sectionLabel}>Respuestas</Text>
            <View style={styles.answerItem}>
              <Text style={styles.answerAuthor}>Luis Cáceres</Text>
              <Text style={styles.answerText}>Me parece haberlo visto cerca de la zona</Text>
            </View>
          </View>
        </ScrollView>
      </SafeAreaView>

      <BottomNavBar navigation={navigation} currentScreen="Detail" />
    </View>
  );
}

const brown = '#6A4E23';
const dark = '#4B2E0C';

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#dbac7eff' },
  header: { flexDirection: 'row', alignItems: 'center', paddingHorizontal: 16, paddingTop: 10, paddingBottom: 6 },
  headerLeft: { padding: 6, borderRadius: 10, backgroundColor: '#00000010' },
  headerTitle: { flex: 1, textAlign: 'center', fontSize: 16, fontWeight: '600', color: '#3C2A1E' },

  titleRow: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'flex-end', marginBottom: 10 },
  petName: { fontSize: 28, fontWeight: '800', color: dark },
  breed: { fontSize: 12, color: dark },

  avatar: { height: 140, backgroundColor: '#C19A6B', borderRadius: 16, marginBottom: 12, overflow: 'hidden', justifyContent: 'center' },
  head: { width: 90, height: 90, borderRadius: 45, backgroundColor: '#dbac7eff', alignSelf: 'center', marginTop: -10 },
  body: { width: 120, height: 120, borderRadius: 60, backgroundColor: '#dbac7eff', alignSelf: 'center', marginTop: -20 },

  bubble: { backgroundColor: '#9D8364', padding: 12, borderRadius: 12, marginBottom: 12 },
  bubbleText: { color: '#fff', fontSize: 14 },

  sectionText: { color: dark, fontSize: 14 },
  mapWrapper: { backgroundColor: '#9D8364', borderRadius: 14, padding: 6, marginVertical: 10 },
  map: { width: '100%', height: 110, borderRadius: 10 },
  mapHint: { color: '#fff', fontSize: 12, marginTop: 4, textAlign: 'right' },

  cta: { backgroundColor: brown, paddingVertical: 14, borderRadius: 12, alignItems: 'center', marginTop: 16 },
  ctaText: { color: '#fff', fontSize: 16, fontWeight: '700' },

  sectionLabel: { color: dark, fontSize: 14, marginTop: 12, marginBottom: 6 },
  answerItem: { backgroundColor: '#C19A6B', borderRadius: 10, padding: 10 },
  answerAuthor: { color: '#fff', fontWeight: '700', marginBottom: 4 },
  answerText: { color: '#fff' },
});
