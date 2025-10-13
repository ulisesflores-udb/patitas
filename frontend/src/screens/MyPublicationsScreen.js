import React from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Ionicons } from '@expo/vector-icons';
import BottomNavBar from './BottomNavBar';

export default function MyPublicationsScreen({ navigation }) {
  // Array con publicaciones del usuario
  const publications = [
    {
      id: 1,
      name: 'Firulais',
      species: 'Perro',
      breed: 'Golden Retriever',
      location: 'Col. Escalón, San Salvador',
      date: '15 Oct 2025',
      status: 'Activo',
    },
    {
      id: 2,
      name: 'Mimi',
      species: 'Gato',
      breed: 'Persa',
      location: 'Col. Escalón, San Salvador',
      date: '10 Oct 2025',
      status: 'Activo',
    },
    {
      id: 3,
      name: 'Rex',
      species: 'Perro',
      breed: 'Pastor Alemán',
      location: 'Col. Escalón, San Salvador',
      date: '5 Oct 2025',
      status: 'Encontrado',
    },
    {
      id: 4,
      name: 'Luna',
      species: 'Gato',
      breed: 'Gato Callejero',
      location: 'Col. Escalón, San Salvador',
      date: '1 Oct 2025',
      status: 'Encontrado',
    },
  ];

  const getStatusColor = (status) => {
    switch (status) {
      case 'Activo':
        return '#4CAF50';
      case 'Encontrado':
        return '#2196F3';
      default:
        return '#999';
    }
  };

  const PublicationCard = ({ publication }) => (
    <View style={styles.card}>
      <View style={styles.cardHeader}>
        <View>
          <Text style={styles.petName}>{publication.name}</Text>
          <Text style={styles.petInfo}>
            {publication.species} • {publication.breed}
          </Text>
        </View>
        <View
          style={[
            styles.statusBadge,
            { backgroundColor: getStatusColor(publication.status) },
          ]}>
          <Text style={styles.statusText}>{publication.status}</Text>
        </View>
      </View>

      <View style={styles.cardContent}>
        <View style={styles.infoRow}>
          <Ionicons name="location" size={16} color="#4B2E0C" />
          <Text style={styles.infoText}>{publication.location}</Text>
        </View>
        <View style={styles.infoRow}>
          <Ionicons name="calendar" size={16} color="#4B2E0C" />
          <Text style={styles.infoText}>{publication.date}</Text>
        </View>
      </View>

      <View style={styles.cardActions}>
        <TouchableOpacity style={styles.actionButton}>
          <Ionicons name="create-outline" size={18} color="#fff" />
          <Text style={styles.actionText}>Editar</Text>
        </TouchableOpacity>
        <TouchableOpacity style={[styles.actionButton, styles.deleteButton]}>
          <Ionicons name="trash-outline" size={18} color="#fff" />
          <Text style={styles.actionText}>Eliminar</Text>
        </TouchableOpacity>
      </View>
    </View>
  );

  return (
    <View style={styles.container}>
      <SafeAreaView style={styles.safeArea} edges={['top']}>
        {/* Header */}
        <View style={styles.header}>
          <TouchableOpacity 
            style={styles.backButton}
            onPress={() => navigation.goBack()}>
            <Ionicons name="chevron-back" size={28} color="#4B2E0C" />
          </TouchableOpacity>
          <Text style={styles.headerTitle}>Mis Publicaciones</Text>
        </View>

        {/* Publicaciones */}
        <ScrollView 
          style={styles.scrollView}
          contentContainerStyle={styles.scrollContent}
          showsVerticalScrollIndicator={false}>
          {publications.length > 0 ? (
            <View>
              {publications.map((publication) => (
                <PublicationCard key={publication.id} publication={publication} />
              ))}
            </View>
          ) : (
            <View style={styles.emptyContainer}>
              <Ionicons name="paw" size={64} color="#9D8364" />
              <Text style={styles.emptyText}>No tienes publicaciones aún</Text>
              <TouchableOpacity 
                style={styles.addButton}
                onPress={() => navigation.navigate('AddPet')}>
                <Ionicons name="add" size={24} color="#fff" />
                <Text style={styles.addButtonText}>Agregar Mascota</Text>
              </TouchableOpacity>
            </View>
          )}
        </ScrollView>
      </SafeAreaView>

      {/* Navbar inferior */}
      <BottomNavBar navigation={navigation} currentScreen="Profile" />
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
  card: {
    backgroundColor: '#9D8364',
    borderRadius: 12,
    padding: 15,
    marginBottom: 15,
  },
  cardHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    marginBottom: 12,
  },
  petName: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#fff',
    marginBottom: 4,
  },
  petInfo: {
    fontSize: 14,
    color: '#fff',
    opacity: 0.9,
  },
  statusBadge: {
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 20,
  },
  statusText: {
    color: '#fff',
    fontSize: 12,
    fontWeight: 'bold',
  },
  cardContent: {
    marginBottom: 12,
    paddingVertical: 8,
    borderTopWidth: 1,
    borderBottomWidth: 1,
    borderColor: 'rgba(255, 255, 255, 0.2)',
  },
  infoRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginVertical: 4,
  },
  infoText: {
    marginLeft: 8,
    color: '#fff',
    fontSize: 13,
  },
  cardActions: {
    flexDirection: 'row',
    gap: 10,
  },
  actionButton: {
    flex: 1,
    flexDirection: 'row',
    backgroundColor: '#6A4E23',
    paddingVertical: 10,
    paddingHorizontal: 12,
    borderRadius: 8,
    justifyContent: 'center',
    alignItems: 'center',
    gap: 6,
  },
  deleteButton: {
    backgroundColor: '#D32F2F',
  },
  actionText: {
    color: '#fff',
    fontWeight: '600',
    fontSize: 12,
  },
  emptyContainer: {
    justifyContent: 'center',
    alignItems: 'center',
    paddingVertical: 80,
  },
  emptyText: {
    fontSize: 18,
    color: '#4B2E0C',
    marginTop: 15,
    marginBottom: 30,
  },
  addButton: {
    flexDirection: 'row',
    backgroundColor: '#6A4E23',
    paddingVertical: 12,
    paddingHorizontal: 30,
    borderRadius: 8,
    justifyContent: 'center',
    alignItems: 'center',
    gap: 8,
  },
  addButtonText: {
    color: '#fff',
    fontWeight: 'bold',
    fontSize: 14,
  },
}); 