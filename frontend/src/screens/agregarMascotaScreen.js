// src/screens/agregarMascotaScreen.js
import React, { useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, TextInput, ScrollView, Platform } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Ionicons } from '@expo/vector-icons';
import { Picker } from '@react-native-picker/picker';

export default function AgregarMascotaScreen({ navigation, usuario, especies, razas, setPets }) {
  const [contactName, setContactName] = useState('');
  const [species, setSpecies] = useState('');
  const [breed, setBreed] = useState('');
  const [description, setDescription] = useState('');
  const [lostDate, setLostDate] = useState('');

  const canContinue = contactName.trim() && species && description.trim();

  const BreedOptions = () => {
    if (!species) return null;
    const filteredBreeds = razas.filter((r) => String(r.id_especie) === String(species));
    if (filteredBreeds.length > 0) {
      return filteredBreeds.map((r) => (
        <Picker.Item key={r.id} label={r.nombre} value={r.id} />
      ));
    }
    return <Picker.Item label="Sin razas disponibles" value="" />;
  };

  const goNext = () => {
  navigation.navigate('AddPetLocation', {
    contactName, species, breed, description, lostDate
  });
};

  return (
    <View style={styles.container}>
      <SafeAreaView style={{ flex: 1 }} edges={['top']}>
        {/* Header */}
        <View style={styles.headerRow}>
          <TouchableOpacity onPress={() => navigation.goBack()} style={styles.backBtn}>
            <Ionicons name="chevron-back" size={20} color={COLORS.dark} />
            <Text style={styles.backTxt}>Página Principal</Text>
          </TouchableOpacity>
        </View>

        <ScrollView contentContainerStyle={styles.scroll}>
          {/* Título */}
          <View style={styles.titleRow}>
            <View style={styles.pawBadge}>
              <Ionicons name="paw" size={22} color={COLORS.dark} />
            </View>
            <View>
              <Text style={styles.bigTitle}>Encontremos</Text>
              <Text style={styles.smallTitle}>a tu mascota</Text>
            </View>
          </View>

          {/* Avatar + Nombre */}
          <View style={styles.avatarRow}>
            <View style={styles.avatar} />
            <View style={{ flex: 1 }}>
              <Text style={styles.labelSmall}>Nombre al que responde</Text>
              <View style={styles.inputWrapper}>
                <TextInput
                  style={styles.input}
                  placeholder="Ej. Firulais"
                  placeholderTextColor={COLORS.placeholder}
                  value={contactName}
                  onChangeText={setContactName}
                />
                <Ionicons name="create-outline" size={18} color={COLORS.dark} style={styles.inputIconRight} />
              </View>
            </View>
          </View>

          {/* Especie / Raza */}
          <View style={styles.row}>
            <View style={styles.fieldHalf}>
              <Text style={styles.label}>Especie</Text>
              <View style={styles.selectBox}>
                <Picker
                  selectedValue={species}
                  onValueChange={(v) => { setSpecies(v); setBreed(''); }}
                  style={styles.picker}
                  dropdownIconColor={COLORS.dark}
                >
                  <Picker.Item label="Seleccione" value="" />
                  {especies && especies.map((esp) => (
                    <Picker.Item key={esp.id} label={esp.nombre} value={esp.id} />
                  ))}
                </Picker>
                <Ionicons name="chevron-down" size={16} color={COLORS.dark} style={styles.selectIcon} />
              </View>
            </View>

            <View style={styles.fieldHalf}>
              <Text style={styles.label}>Raza</Text>
              <View style={[styles.selectBox, !species && { opacity: 0.6 }]}>
                <Picker
                  enabled={!!species}
                  selectedValue={breed}
                  onValueChange={setBreed}
                  style={styles.picker}
                  dropdownIconColor={COLORS.dark}
                >
                  <Picker.Item label="Seleccione" value="" />
                  <BreedOptions />
                </Picker>
                <Ionicons name="chevron-down" size={16} color={COLORS.dark} style={styles.selectIcon} />
              </View>
            </View>
          </View>

          {/* Descripción */}
          <Text style={styles.label}>Descripción</Text>
          <View style={styles.inputWrapper}>
            <TextInput
              style={[styles.input, styles.textarea]}
              multiline
              numberOfLines={5}
              value={description}
              onChangeText={setDescription}
              placeholder="Ej. Es mediano, color amarillo de unos 5 años y tiene un collar rojo..."
              placeholderTextColor={COLORS.placeholder}
            />
          </View>

          {/* Fecha de pérdida */}
          <Text style={styles.label}>Fecha de Pérdida</Text>
          <View style={styles.inputWrapper}>
            <TextInput
              style={styles.input}
              placeholder="Ej. 12/08/2025"
              value={lostDate}
              onChangeText={setLostDate}
              placeholderTextColor={COLORS.placeholder}
            />
            <Ionicons name="calendar-outline" size={18} color={COLORS.dark} style={styles.inputIconRight} />
          </View>

          {/* Botón siguiente */}



          <TouchableOpacity
            style={[styles.primaryBtn, !canContinue && styles.primaryBtnDisabled]}
            activeOpacity={0.9}
            disabled={!canContinue}
            onPress={goNext}
          >
            <Text style={styles.primaryTxt}>Siguiente</Text>
          </TouchableOpacity>

          <View style={{ height: 16 }} />
        </ScrollView>
      </SafeAreaView>
    </View>
  );
}

const COLORS = {
  bg: '#C69B6D',
  card: '#9D8364',
  dark: '#3C2A1E',
  input: '#E0C097',
  placeholder: '#9D8C76',
  primary: '#6A4E23',
};

const RADIUS = 12;

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: COLORS.bg },
  headerRow: { paddingHorizontal: 20, paddingTop: 8, paddingBottom: 8 },
  backBtn: { flexDirection: 'row', alignItems: 'center', gap: 6 },
  backTxt: { color: COLORS.dark, fontWeight: 'bold' },
  scroll: { paddingHorizontal: 20, paddingBottom: 24 },
  titleRow: { flexDirection: 'row', alignItems: 'center', marginBottom: 18 },
  pawBadge: {
    width: 36, height: 36, borderRadius: 18, backgroundColor: COLORS.input,
    alignItems: 'center', justifyContent: 'center', marginRight: 10,
  },
  bigTitle: { color: COLORS.dark, fontSize: 28, fontWeight: '900', lineHeight: 28 },
  smallTitle: { color: COLORS.dark, opacity: 0.9, marginTop: 2 },
  avatarRow: { flexDirection: 'row', alignItems: 'center', marginBottom: 16 },
  avatar: { width: 52, height: 52, borderRadius: 26, backgroundColor: COLORS.input, marginRight: 12 },
  labelSmall: { color: COLORS.dark, opacity: 0.9, marginBottom: 6, fontSize: 12 },

  row: { flexDirection: 'row', gap: 12, marginBottom: 12 },
  fieldHalf: { flex: 1 },
  label: { color: COLORS.dark, fontWeight: '700', marginBottom: 6 },

  inputWrapper: {
    backgroundColor: COLORS.input,
    borderRadius: RADIUS,
    borderWidth: StyleSheet.hairlineWidth,
    borderColor: '#b69373',
    shadowColor: '#000',
    shadowOpacity: 0.06,
    shadowRadius: 6,
    shadowOffset: { width: 0, height: 3 },
    elevation: 2,
    position: 'relative',
  },
  input: {
    paddingHorizontal: 12,
    paddingVertical: Platform.OS === 'web' ? 14 : 12,
    color: COLORS.dark,
  },
  inputIconRight: {
    position: 'absolute',
    right: 12,
    top: '50%',
    marginTop: -9,
    opacity: 0.8,
  },
  textarea: { minHeight: 110, textAlignVertical: 'top' },

  selectBox: {
    backgroundColor: COLORS.input,
    borderRadius: RADIUS,
    borderWidth: StyleSheet.hairlineWidth,
    borderColor: '#b69373',
    overflow: 'hidden',
    shadowColor: '#000',
    shadowOpacity: 0.06,
    shadowRadius: 6,
    shadowOffset: { width: 0, height: 3 },
    elevation: 2,
    position: 'relative',
  },
  picker: { height: 44 },
  selectIcon: {
    position: 'absolute',
    right: 12,
    top: '50%',
    marginTop: -8,
    pointerEvents: 'none',
    opacity: 0.8,
  },

  primaryBtn: {
    marginTop: 18,
    backgroundColor: COLORS.primary,
    paddingVertical: 14,
    borderRadius: RADIUS + 2,
    alignItems: 'center',
    flexDirection: 'row',
    justifyContent: 'center',
    shadowColor: '#000',
    shadowOpacity: 0.12,
    shadowRadius: 8,
    shadowOffset: { width: 0, height: 6 },
    elevation: 3,
  },
  primaryBtnDisabled: { backgroundColor: '#9c7a55' },
  primaryTxt: { color: '#fff', fontWeight: '800', fontSize: 16, letterSpacing: 0.2 },
});
