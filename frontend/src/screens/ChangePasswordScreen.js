import React, { useState } from 'react';
import { View, Text, StyleSheet, TextInput, TouchableOpacity, ScrollView, Alert } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Ionicons } from '@expo/vector-icons';
import BottomNavBar from './BottomNavBar';

export default function ChangePasswordScreen({ navigation }) {
  const [currentPassword, setCurrentPassword] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [showCurrentPassword, setShowCurrentPassword] = useState(false);
  const [showNewPassword, setShowNewPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  const handleChangePassword = () => {
    // Validaciones
    if (!currentPassword.trim()) {
      Alert.alert('Error', 'Por favor ingresa tu contraseña actual');
      return;
    }

    if (!newPassword.trim()) {
      Alert.alert('Error', 'Por favor ingresa una nueva contraseña');
      return;
    }

    if (newPassword.length < 6) {
      Alert.alert('Error', 'La contraseña debe tener al menos 6 caracteres');
      return;
    }

    if (newPassword !== confirmPassword) {
      Alert.alert('Error', 'Las contraseñas no coinciden');
      return;
    }

    if (currentPassword === newPassword) {
      Alert.alert('Error', 'La nueva contraseña debe ser diferente a la actual');
      return;
    }

    // Si todas las validaciones pasan
    Alert.alert('Éxito', 'Contraseña cambiada correctamente');
    setCurrentPassword('');
    setNewPassword('');
    setConfirmPassword('');
    navigation.goBack();
  };

  const PasswordInput = ({
    label,
    value,
    onChangeText,
    showPassword,
    onToggleShow,
    placeholder,
  }) => (
    <View style={styles.inputContainer}>
      <Text style={styles.label}>{label}</Text>
      <View style={styles.passwordInputWrapper}>
        <TextInput
          style={styles.passwordInput}
          placeholder={placeholder}
          placeholderTextColor="#6A4E23"
          value={value}
          onChangeText={onChangeText}
          secureTextEntry={!showPassword}
        />
        <TouchableOpacity onPress={onToggleShow} style={styles.iconButton}>
          <Ionicons
            name={showPassword ? 'eye' : 'eye-off'}
            size={22}
            color="#6A4E23"
          />
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
          <Text style={styles.headerTitle}>Cambiar Contraseña</Text>
        </View>

        {/* Contenido */}
        <ScrollView 
          style={styles.scrollView}
          contentContainerStyle={styles.scrollContent}
          showsVerticalScrollIndicator={false}>
          
          {/* Información */}
          <View style={styles.infoBox}>
            <Ionicons name="information-circle" size={24} color="#4B2E0C" />
            <Text style={styles.infoText}>
              Por tu seguridad, te pedimos que confirmes tu contraseña actual antes de crear una nueva.
            </Text>
          </View>

          {/* Formulario */}
          <View style={styles.formContainer}>
            {/* Contraseña Actual */}
            <PasswordInput
              label="Contraseña Actual"
              value={currentPassword}
              onChangeText={setCurrentPassword}
              showPassword={showCurrentPassword}
              onToggleShow={() => setShowCurrentPassword(!showCurrentPassword)}
              placeholder="Ingresa tu contraseña actual"
            />

            {/* Nueva Contraseña */}
            <PasswordInput
              label="Nueva Contraseña"
              value={newPassword}
              onChangeText={setNewPassword}
              showPassword={showNewPassword}
              onToggleShow={() => setShowNewPassword(!showNewPassword)}
              placeholder="Ingresa tu nueva contraseña"
            />

            {/* Validaciones de contraseña */}
            <View style={styles.requirementsBox}>
              <Text style={styles.requirementsTitle}>Requisitos de contraseña:</Text>
              <View style={styles.requirement}>
                <Ionicons
                  name={newPassword.length >= 6 ? 'checkmark-circle' : 'close-circle'}
                  size={16}
                  color={newPassword.length >= 6 ? '#4CAF50' : '#999'}
                />
                <Text style={styles.requirementText}>Mínimo 6 caracteres</Text>
              </View>
              <View style={styles.requirement}>
                <Ionicons
                  name={
                    newPassword && currentPassword && newPassword !== currentPassword
                      ? 'checkmark-circle'
                      : 'close-circle'
                  }
                  size={16}
                  color={
                    newPassword && currentPassword && newPassword !== currentPassword
                      ? '#4CAF50'
                      : '#999'
                  }
                />
                <Text style={styles.requirementText}>Diferente de la actual</Text>
              </View>
            </View>

            {/* Confirmar Contraseña */}
            <PasswordInput
              label="Confirmar Nueva Contraseña"
              value={confirmPassword}
              onChangeText={setConfirmPassword}
              showPassword={showConfirmPassword}
              onToggleShow={() => setShowConfirmPassword(!showConfirmPassword)}
              placeholder="Confirma tu nueva contraseña"
            />

            {/* Validación de coincidencia */}
            {confirmPassword && newPassword !== confirmPassword && (
              <View style={styles.errorBox}>
                <Ionicons name="warning" size={18} color="#D32F2F" />
                <Text style={styles.errorText}>Las contraseñas no coinciden</Text>
              </View>
            )}

            {confirmPassword && newPassword === confirmPassword && (
              <View style={styles.successBox}>
                <Ionicons name="checkmark-circle" size={18} color="#4CAF50" />
                <Text style={styles.successText}>Las contraseñas coinciden</Text>
              </View>
            )}
          </View>

          {/* Botones */}
          <View style={styles.buttonContainer}>
            <TouchableOpacity 
              style={styles.cancelButton}
              onPress={() => navigation.goBack()}>
              <Text style={styles.cancelButtonText}>Cancelar</Text>
            </TouchableOpacity>

            <TouchableOpacity 
              style={styles.saveButton}
              onPress={handleChangePassword}>
              <Text style={styles.saveButtonText}>Guardar Cambios</Text>
            </TouchableOpacity>
          </View>
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
  infoBox: {
    flexDirection: 'row',
    backgroundColor: '#C19A6B',
    borderRadius: 10,
    padding: 15,
    marginBottom: 25,
    alignItems: 'flex-start',
    gap: 12,
  },
  infoText: {
    flex: 1,
    color: '#4B2E0C',
    fontSize: 14,
    lineHeight: 20,
  },
  formContainer: {
    marginBottom: 20,
  },
  inputContainer: {
    marginBottom: 18,
  },
  label: {
    fontSize: 16,
    color: '#4B2E0C',
    marginBottom: 8,
    fontWeight: '500',
  },
  passwordInputWrapper: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#C19A6B',
    borderRadius: 12,
    paddingRight: 10,
  },
  passwordInput: {
    flex: 1,
    padding: 15,
    fontSize: 16,
    color: '#4B2E0C',
  },
  iconButton: {
    padding: 8,
  },
  requirementsBox: {
    backgroundColor: '#C19A6B',
    borderRadius: 10,
    padding: 12,
    marginBottom: 18,
  },
  requirementsTitle: {
    fontSize: 13,
    fontWeight: '600',
    color: '#4B2E0C',
    marginBottom: 8,
  },
  requirement: {
    flexDirection: 'row',
    alignItems: 'center',
    marginVertical: 4,
    gap: 8,
  },
  requirementText: {
    fontSize: 13,
    color: '#4B2E0C',
  },
  errorBox: {
    flexDirection: 'row',
    backgroundColor: '#FFEBEE',
    borderRadius: 10,
    padding: 12,
    marginBottom: 15,
    alignItems: 'center',
    gap: 10,
  },
  errorText: {
    color: '#D32F2F',
    fontWeight: '500',
    flex: 1,
  },
  successBox: {
    flexDirection: 'row',
    backgroundColor: '#E8F5E9',
    borderRadius: 10,
    padding: 12,
    marginBottom: 15,
    alignItems: 'center',
    gap: 10,
  },
  successText: {
    color: '#4CAF50',
    fontWeight: '500',
    flex: 1,
  },
  buttonContainer: {
    flexDirection: 'row',
    gap: 12,
  },
  cancelButton: {
    flex: 1,
    backgroundColor: '#9D8364',
    paddingVertical: 15,
    borderRadius: 12,
    alignItems: 'center',
  },
  cancelButtonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
  },
  saveButton: {
    flex: 1,
    backgroundColor: '#6A4E23',
    paddingVertical: 15,
    borderRadius: 12,
    alignItems: 'center',
  },
  saveButtonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
  },
});