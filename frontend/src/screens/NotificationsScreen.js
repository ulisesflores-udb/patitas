import React from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Ionicons } from '@expo/vector-icons';
import BottomNavBar from './BottomNavBar';

export default function NotificationsScreen({ navigation }) {
  const notifications = [
    {
      id: 1,
      type: 'publication',
      title: '¡Perrito en tu zona!',
      description: 'Se ha encontrado un perrito Golden Retriever en Col. Escalón',
      location: 'Col. Escalón, San Salvador',
      date: 'Hace 2 horas',
      icon: 'paw',
      color: '#FF6B6B',
      hasAction: true,
      petName: 'Firulais',
      breed: 'Golden Retriever',
    },
    {
      id: 2,
      type: 'welcome',
      title: '¡Bienvenido de vuelta, Juan!',
      description: 'Te contamos que hay 18 animales nuevos en tu zona esperando ser encontrados',
      date: 'Hoy',
      icon: 'heart',
      color: '#FFA500',
      hasAction: false,
    },
  ];

  const NotificationCard = ({ notification }) => (
    <View style={[styles.card, { borderLeftColor: notification.color }]}>
      <View style={styles.cardHeader}>
        <View style={[styles.iconContainer, { backgroundColor: notification.color }]}>
          <Ionicons name={notification.icon} size={24} color="#fff" />
        </View>
        <View style={styles.headerContent}>
          <Text style={styles.title}>{notification.title}</Text>
          <Text style={styles.date}>{notification.date}</Text>
        </View>
      </View>

      <Text style={styles.description}>{notification.description}</Text>

      {notification.type === 'publication' && (
        <View style={styles.locationContainer}>
          <Ionicons name="location" size={16} color="#4B2E0C" />
          <Text style={styles.locationText}>{notification.location}</Text>
        </View>
      )}

      {notification.hasAction && (
        <TouchableOpacity 
          style={styles.viewButton}
          onPress={() => navigation.navigate('PublicationDetail', { 
            publication: {
              nombre_mascota: notification.petName,
              breed: notification.breed,
              direccion_maps: notification.location,
              descripcion: 'Perrito amigable y cariñoso, fue visto por última vez en la zona. Si tienes información, por favor contáctanos.',
              fecha_perdida: new Date().toISOString(),
              fecha_public: new Date().toISOString(),
              latitud: 13.6929,
              longitud: -89.2182,
              mostrar_redes: true,
              mostrar_tel: true,
            }
          })}>
          <Text style={styles.viewButtonText}>Ver</Text>
          <Ionicons name="arrow-forward" size={16} color="#fff" />
        </TouchableOpacity>
      )}
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
          <Text style={styles.headerTitle}>Notificaciones</Text>
          <View style={styles.placeholder} />
        </View>

        {/* Notificaciones */}
        <ScrollView 
          style={styles.scrollView}
          contentContainerStyle={styles.scrollContent}
          showsVerticalScrollIndicator={false}>
          {notifications.length > 0 ? (
            <View>
              {notifications.map((notification) => (
                <NotificationCard key={notification.id} notification={notification} />
              ))}
            </View>
          ) : (
            <View style={styles.emptyContainer}>
              <Ionicons name="notifications-off" size={64} color="#9D8364" />
              <Text style={styles.emptyText}>No hay notificaciones</Text>
            </View>
          )}
        </ScrollView>
      </SafeAreaView>

      {/* Navbar inferior */}
      <BottomNavBar navigation={navigation} currentScreen="Notifications" />
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
    justifyContent: 'space-between',
  },
  backButton: {
    marginRight: 15,
  },
  headerTitle: {
    fontSize: 28,
    fontWeight: 'bold',
    color: '#4B2E0C',
    flex: 1,
  },
  placeholder: {
    width: 28,
  },
  scrollView: {
    flex: 1,
  },
  scrollContent: {
    paddingHorizontal: 20,
    paddingBottom: 20,
  },
  card: {
    backgroundColor: '#fff',
    borderRadius: 12,
    padding: 16,
    marginBottom: 12,
    borderLeftWidth: 4,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  cardHeader: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    marginBottom: 10,
    gap: 12,
  },
  iconContainer: {
    width: 48,
    height: 48,
    borderRadius: 24,
    justifyContent: 'center',
    alignItems: 'center',
  },
  headerContent: {
    flex: 1,
  },
  title: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#4B2E0C',
    marginBottom: 4,
  },
  date: {
    fontSize: 12,
    color: '#999',
  },
  description: {
    fontSize: 14,
    color: '#555',
    marginBottom: 10,
    lineHeight: 20,
    marginLeft: 60,
  },
  locationContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 12,
    marginLeft: 60,
    gap: 6,
  },
  locationText: {
    fontSize: 12,
    color: '#4B2E0C',
    fontWeight: '500',
  },
  viewButton: {
    flexDirection: 'row',
    backgroundColor: '#6A4E23',
    paddingVertical: 10,
    paddingHorizontal: 16,
    borderRadius: 8,
    alignItems: 'center',
    justifyContent: 'center',
    gap: 8,
    marginLeft: 60,
    alignSelf: 'flex-start',
  },
  viewButtonText: {
    color: '#fff',
    fontWeight: '600',
    fontSize: 14,
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
  },
});