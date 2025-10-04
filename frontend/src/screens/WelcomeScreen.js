import React from 'react';
import { View, Text, StyleSheet, Image, TouchableOpacity } from 'react-native';

export default function WelcomeScreen({ navigation }) {
  return (
    <View style={styles.container}>
      {/* Logo */}
      <Image source={require('../../assets/logo.png')} style={styles.logo} />

      <Text style={styles.TitleText}>Bienvenido a Patitas</Text>

      {/* Texto de bienvenida */}
      <Text style={styles.welcomeText}>
        Patitas es una app diseñada para aquellos que cuando han perdido a
        su mascota desean encontrarla y también desean ayudar a otros a
        encontrar la suya
      </Text>

      {/* Botones */}
      <TouchableOpacity 
        style={styles.button} 
        onPress={() => navigation.navigate('Login')}>
        <Text style={styles.buttonText}>Iniciar Sesión</Text>
      </TouchableOpacity>


      <TouchableOpacity 
        style={[styles.button, { backgroundColor: '#6A4E23' }]} 
        onPress={() => navigation.navigate('Register')}>
        <Text style={styles.buttonText}>Registrarse</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#dbac7eff',
    justifyContent: 'center',
    alignItems: 'center',
    padding: 30,
  },

  TitleText:{
  fontSize: 60,
  textAlign: 'center',
  color: '#4B2E0C',
  marginBottom: 40,
  maxWidth: 300, 
  alignSelf: 'center',
  },

  logo: {
    width: 180,
    height: 180,
    marginBottom: 20,
    resizeMode: 'contain',
  },

 welcomeText: {
  fontSize: 16,
  textAlign: 'center',
  color: '#4B2E0C',
  marginBottom: 40,
  maxWidth: 300, 
  alignSelf: 'center',
},

  button: {
    backgroundColor: '#4B2E0C',
    paddingVertical: 15,
    paddingHorizontal: 50,
    borderRadius: 12,
    marginVertical: 10,
    width: '100%',
    alignItems: 'center',
  },
  buttonText: {
    color: '#fff',
    fontWeight: 'bold',
    fontSize: 16,
  },
});
