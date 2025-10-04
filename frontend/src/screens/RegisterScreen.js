import React, { useState } from 'react';
import { View, Text, StyleSheet, Image, TextInput, TouchableOpacity, ScrollView } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Ionicons } from '@expo/vector-icons';
import { Picker } from '@react-native-picker/picker';

export default function RegisterScreen({ navigation }) {
  const [phone, setPhone] = useState('');
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [department, setDepartment] = useState('San Salvador');
  const [municipality, setMunicipality] = useState('San Salvador Centro');
  const [district, setDistrict] = useState('Distrito de San Salvador');
  const [colony, setColony] = useState('');
  const [street, setStreet] = useState('');
  const [socialMedia, setSocialMedia] = useState('Facebook');
  const [username, setUsername] = useState('');

  return (
    <SafeAreaView style={styles.safeArea} edges={['top', 'bottom']}>
      <ScrollView 
        style={styles.container}
        contentContainerStyle={styles.scrollContent}>
        {/* Header con botón de regreso */}
        <View style={styles.header}>
          <TouchableOpacity 
            style={styles.backButton} 
            onPress={() => navigation.goBack()}>
            <Ionicons name="chevron-back" size={28} color="#4B2E0C" />
          </TouchableOpacity>
          <Text style={styles.headerTitle}>Regresar</Text>
        </View>

        {/* Imagen de perfil */}
        <View style={styles.profileContainer}>
          <Image 
            source={require('../../assets/Default PFP.png')} 
            style={styles.profileImage} 
          />
          <TouchableOpacity style={styles.editButton}>
            <Ionicons name="pencil" size={20} color="#fff" />
          </TouchableOpacity>
        </View>

        {/* Formulario */}
        <View style={styles.formContainer}>
          {/* Teléfono */}
          <Text style={styles.label}>Teléfono</Text>
          <TextInput
            style={styles.input}
            placeholder="7213 8459"
            placeholderTextColor="#6A4E23"
            value={phone}
            onChangeText={setPhone}
            keyboardType="phone-pad"
          />

          {/* Nombre y Apellido en fila */}
          <View style={styles.row}>
            <View style={styles.halfInput}>
              <Text style={styles.label}>Nombre</Text>
              <TextInput
                style={styles.input}
                placeholder="Juan"
                placeholderTextColor="#6A4E23"
                value={firstName}
                onChangeText={setFirstName}
              />
            </View>
            <View style={styles.halfInput}>
              <Text style={styles.label}>Apellido</Text>
              <TextInput
                style={styles.input}
                placeholder="Pérez"
                placeholderTextColor="#6A4E23"
                value={lastName}
                onChangeText={setLastName}
              />
            </View>
          </View>

          {/* Departamento y Municipio en fila */}
          <View style={styles.row}>
            <View style={styles.halfInput}>
              <Text style={styles.label}>Departamento</Text>
              <View style={styles.pickerContainer}>
                <Picker
                  selectedValue={department}
                  onValueChange={setDepartment}
                  style={styles.picker}>
                  <Picker.Item label="San Salvador" value="San Salvador" />
                  <Picker.Item label="La Libertad" value="La Libertad" />
                  <Picker.Item label="Santa Ana" value="Santa Ana" />
                </Picker>
              </View>
            </View>
            <View style={styles.halfInput}>
              <Text style={styles.label}>Municipio</Text>
              <View style={styles.pickerContainer}>
                <Picker
                  selectedValue={municipality}
                  onValueChange={setMunicipality}
                  style={styles.picker}>
                  <Picker.Item label="San Salvador Centro" value="San Salvador Centro" />
                  <Picker.Item label="Soyapango" value="Soyapango" />
                  <Picker.Item label="Mejicanos" value="Mejicanos" />
                </Picker>
              </View>
            </View>
          </View>

          {/* Distrito */}
          <Text style={styles.label}>Distrito</Text>
          <View style={styles.pickerContainer}>
            <Picker
              selectedValue={district}
              onValueChange={setDistrict}
              style={styles.picker}>
              <Picker.Item label="Distrito de San Salvador" value="Distrito de San Salvador" />
              <Picker.Item label="Distrito 2" value="Distrito 2" />
            </Picker>
          </View>

          {/* Colonia y Calle en fila */}
          <View style={styles.row}>
            <View style={styles.halfInput}>
              <Text style={styles.label}>Colonia</Text>
              <TextInput
                style={styles.input}
                placeholder="Colonia Escalón"
                placeholderTextColor="#6A4E23"
                value={colony}
                onChangeText={setColony}
              />
            </View>
            <View style={styles.halfInput}>
              <Text style={styles.label}>Calle</Text>
              <TextInput
                style={styles.input}
                placeholder="Calle Principal"
                placeholderTextColor="#6A4E23"
                value={street}
                onChangeText={setStreet}
              />
            </View>
          </View>

          {/* Redes Sociales */}
          <View style={styles.socialMediaContainer}>
            <TouchableOpacity 
              style={styles.radioOption}
              onPress={() => setSocialMedia('Facebook')}>
              <View style={[styles.radioCircle, socialMedia === 'Facebook' && styles.radioSelected]}>
                {socialMedia === 'Facebook' && <View style={styles.radioInner} />}
              </View>
              <Text style={styles.radioText}>Facebook</Text>
            </TouchableOpacity>

            <TouchableOpacity 
              style={styles.radioOption}
              onPress={() => setSocialMedia('Twitter')}>
              <View style={[styles.radioCircle, socialMedia === 'Twitter' && styles.radioSelected]}>
                {socialMedia === 'Twitter' && <View style={styles.radioInner} />}
              </View>
              <Text style={styles.radioText}>X (Twitter)</Text>
            </TouchableOpacity>

            <TouchableOpacity 
              style={styles.radioOption}
              onPress={() => setSocialMedia('Instagram')}>
              <View style={[styles.radioCircle, socialMedia === 'Instagram' && styles.radioSelected]}>
                {socialMedia === 'Instagram' && <View style={styles.radioInner} />}
              </View>
              <Text style={styles.radioText}>Instagram</Text>
            </TouchableOpacity>

            <TouchableOpacity 
              style={styles.radioOption}
              onPress={() => setSocialMedia('TikTok')}>
              <View style={[styles.radioCircle, socialMedia === 'TikTok' && styles.radioSelected]}>
                {socialMedia === 'TikTok' && <View style={styles.radioInner} />}
              </View>
              <Text style={styles.radioText}>TikTok</Text>
            </TouchableOpacity>
          </View>

          {/* Usuario en la Red Social */}
          <Text style={styles.label}>Usuario en la Red Social</Text>
          <TextInput
            style={styles.input}
            placeholder="Juan Perez"
            placeholderTextColor="#6A4E23"
            value={username}
            onChangeText={setUsername}
          />

          {/* Botón de registro */}
          <TouchableOpacity 
            style={styles.registerButton}
            onPress={() => navigation.navigate('Home')}>
            <Text style={styles.registerButtonText}>Registrarse</Text>
          </TouchableOpacity>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: '#dbac7eff',
  },
  container: {
    flex: 1,
  },
  scrollContent: {
    paddingBottom: 30,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 10,
    marginLeft: 10,
    marginBottom: 20,
  },
  backButton: {
    marginRight: 10,
  },
  headerTitle: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#4B2E0C',
  },
  profileContainer: {
    alignItems: 'center',
    marginBottom: 30,
    position: 'relative',
  },
  profileImage: {
    width: 120,
    height: 120,
    borderRadius: 60,
    backgroundColor: '#9D8364',
  },
  editButton: {
    position: 'absolute',
    bottom: 0,
    right: '35%',
    backgroundColor: '#6A4E23',
    borderRadius: 20,
    width: 40,
    height: 40,
    justifyContent: 'center',
    alignItems: 'center',
  },
  formContainer: {
    paddingHorizontal: 20,
  },
  label: {
    fontSize: 16,
    color: '#4B2E0C',
    marginBottom: 8,
    fontWeight: '500',
  },
  input: {
    backgroundColor: '#C19A6B',
    borderRadius: 12,
    padding: 15,
    fontSize: 16,
    color: '#4B2E0C',
    marginBottom: 20,
  },
  row: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  halfInput: {
    width: '48%',
  },
  pickerContainer: {
    backgroundColor: '#C19A6B',
    borderRadius: 12,
    marginBottom: 20,
    overflow: 'hidden',
  },
  picker: {
    color: '#4B2E0C',
    height: 50,
  },
  socialMediaContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    marginBottom: 20,
  },
  radioOption: {
    flexDirection: 'row',
    alignItems: 'center',
    width: '50%',
    marginBottom: 15,
  },
  radioCircle: {
    width: 24,
    height: 24,
    borderRadius: 12,
    borderWidth: 2,
    borderColor: '#4B2E0C',
    marginRight: 10,
    justifyContent: 'center',
    alignItems: 'center',
  },
  radioSelected: {
    borderColor: '#4B2E0C',
  },
  radioInner: {
    width: 12,
    height: 12,
    borderRadius: 6,
    backgroundColor: '#4B2E0C',
  },
  radioText: {
    fontSize: 16,
    color: '#4B2E0C',
  },
  registerButton: {
    backgroundColor: '#6A4E23',
    borderRadius: 12,
    padding: 15,
    alignItems: 'center',
    marginTop: 10,
    marginBottom: 20,
  },
  registerButtonText: {
    color: '#fff',
    fontSize: 18,
    fontWeight: 'bold',
  },
});