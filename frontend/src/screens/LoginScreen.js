import React, { useState } from 'react';
import { View, Text, StyleSheet, Image, TextInput, TouchableOpacity } from 'react-native';
import { Ionicons } from '@expo/vector-icons';

export default function LoginScreen({ navigation }) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  return (
    <View style={styles.container}>
      {/* Botón de regreso */}
      <TouchableOpacity 
        style={styles.backButton}
        onPress={() => navigation.goBack()}>
        <Ionicons name="chevron-back" size={28} color="#4B2E0C" />
      </TouchableOpacity>

      {/* Logo y título */}
<View style={styles.header}>
  <Image 
    source={require('../../assets/logo.png')} 
    style={styles.logo} 
  />
  <View style={styles.titleContainer}>
    <Text style={styles.title}>Inicia Sesión</Text>
    <Text style={styles.subtitle}>Bienvenido de vuelta</Text>
  </View>
</View>

      {/* Formulario */}
      <View style={styles.formContainer}>
        <Text style={styles.label}>Correo:</Text>
        <TextInput
          style={styles.input}
          placeholder="correo@dominio.com"
          placeholderTextColor="#9D8364"
          value={email}
          onChangeText={setEmail}
          keyboardType="email-address"
          autoCapitalize="none"
        />

        <Text style={styles.label}>Contraseña:</Text>
        <TextInput
          style={styles.input}
          placeholder="********"
          placeholderTextColor="#9D8364"
          value={password}
          onChangeText={setPassword}
          secureTextEntry
        />

          <TouchableOpacity 
            style={styles.loginButton}
            onPress={() => navigation.navigate('Home')}>
            <Text style={styles.loginButtonText}>Iniciar Sesión</Text>
          </TouchableOpacity>

        {/* Texto de registro */}
        <TouchableOpacity onPress={() => navigation.navigate('Register')}>
          <Text style={styles.registerText}>
            ¿No tienes cuenta? <Text style={styles.registerLink}>Regístrate</Text>
          </Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#dbac7eff',
    padding: 20,
  },
  backButton: {
    marginTop: 40,
    marginBottom: 20,
  },
  header: {
  flexDirection: 'row',
  alignItems: 'center',
  marginBottom: 40,
},
logo: {
  width: 80,
  height: 80,
  marginRight: 15,
  resizeMode: 'contain',
},
titleContainer: {
  flex: 1,
},
title: {
  fontSize: 32,
  fontWeight: 'bold',
  color: '#4B2E0C',
  marginBottom: 5,
},
subtitle: {
  fontSize: 16,
  color: '#4B2E0C',
},

  formContainer: {
    width: '100%',
  },
  label: {
    fontSize: 16,
    color: '#4B2E0C',
    marginBottom: 8,
    marginLeft: 5,
  },
  input: {
    backgroundColor: '#C19A6B',
    borderRadius: 12,
    padding: 15,
    fontSize: 16,
    color: '#4B2E0C',
    marginBottom: 20,
  },
  loginButton: {
    backgroundColor: '#6A4E23',
    borderRadius: 12,
    padding: 15,
    alignItems: 'center',
    marginTop: 20,
    marginBottom: 20,
  },
  loginButtonText: {
    color: '#fff',
    fontSize: 18,
    fontWeight: 'bold',
  },
  registerText: {
    textAlign: 'center',
    fontSize: 14,
    color: '#4B2E0C',
  },
  registerLink: {
    fontWeight: 'bold',
    textDecorationLine: 'underline',
  },
});