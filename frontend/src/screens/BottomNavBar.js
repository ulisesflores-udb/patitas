import React from 'react';
import { View, TouchableOpacity, StyleSheet, Image } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { Ionicons } from '@expo/vector-icons';

export default function BottomNavBar({ navigation, currentScreen }) {
  const insets = useSafeAreaInsets();
  
  return (
    <View style={[styles.navbar, { paddingBottom: insets.bottom + 10 }]}>
      {/* Home */}
      <TouchableOpacity 
        style={[styles.navButton, currentScreen === 'Home' && styles.activeButton]}
        onPress={() => navigation.navigate('Home')}>
        <Image 
          source={require('../../assets/home.png')} 
          style={styles.navIcon}
          resizeMode="contain"
        />
      </TouchableOpacity>

      {/* Patita (Buscar) */}
      <TouchableOpacity 
        style={[styles.navButton, currentScreen === 'Search' && styles.activeButton]}
        onPress={() => navigation.navigate('Search')}>
        <Ionicons name="paw" size={28} color="#fff" />
      </TouchableOpacity>

      {/* Agregar (botón central más grande) */}
      <TouchableOpacity onPress={() => navigation.navigate('AddPet')}>
  <Ionicons name="add" size={28} color="#fff" />
</TouchableOpacity>


      {/* Notificaciones */}
      <TouchableOpacity 
        style={[styles.navButton, currentScreen === 'Notifications' && styles.activeButton]}
        onPress={() => navigation.navigate('Notifications')}>
        <Image 
          source={require('../../assets/campana.png')} 
          style={styles.navIcon}
          resizeMode="contain"
        />
      </TouchableOpacity>

      {/* Perfil */}
      <TouchableOpacity 
        style={[styles.navButton, currentScreen === 'Profile' && styles.activeButton]}
        onPress={() => navigation.navigate('Profile')}>
        <Image 
          source={require('../../assets/usuario.png')} 
          style={styles.navIcon}
          resizeMode="contain"
        />
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  navbar: {
    flexDirection: 'row',
    backgroundColor: '#6A4E23',
    paddingVertical: 10,
    paddingHorizontal: 20,
    justifyContent: 'space-around',
    alignItems: 'center',
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: -2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 5,
  },
  navButton: {
    width: 50,
    height: 50,
    borderRadius: 25,
    backgroundColor: '#6A4E23',
    justifyContent: 'center',
    alignItems: 'center',
  },
  activeButton: {
    backgroundColor: '#8B6838',
  },
  addButton: {
    width: 70,
    height: 70,
    borderRadius: 35,
    backgroundColor: '#4B2E0C',
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: -20,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.3,
    shadowRadius: 4,
    elevation: 8,
  },
  navIcon: {
    width: 28,
    height: 28,
    tintColor: '#fff',
  },
});