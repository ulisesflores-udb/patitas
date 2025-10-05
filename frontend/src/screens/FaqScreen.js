// src/screens/FaqScreen.js
import React, { useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, ScrollView } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Ionicons } from '@expo/vector-icons';
import BottomNavBar from './BottomNavBar';

export default function FaqScreen({ navigation }) {
  const [openIndex, setOpenIndex] = useState(null);

  const faqs = [
    {
      q: '¿Qué es Patitas y cómo funciona?',
      a: 'Patitas permite reportar, buscar y ayudar a encontrar mascotas perdidas. Publica información, agrega fotos y recibe alertas en tu zona.',
    },
    {
      q: '¿Es gratis usar la aplicación?',
      a: 'Sí, Patitas es completamente gratuita. Solo registrate para comenzar a publicar o buscar.',
    },
    {
      q: '¿En qué ciudades está disponible Patitas?',
      a: 'Actualmente en todo El Salvador. Planeamos expandirnos pronto.',
    },
    {
      q: '¿Cómo reporto que perdí a mi mascota?',
      a: 'En “Publicaciones” toca “Agregar mascota” y completa los datos con una foto reciente.',
    },
    {
      q: '¿Qué información debo incluir al publicar?',
      a: 'Foto clara, nombre, lugar donde se perdió, raza, color y detalles de identificación.',
    },
    {
      q: '¿Qué hago si encontré una mascota?',
      a: 'Publicá “mascota encontrada” y usa la app para contactar a los dueños si responden.',
    },
  ];

  const toggle = (i) => setOpenIndex(openIndex === i ? null : i);

  return (
    <View style={styles.container}>
      <SafeAreaView style={{ flex: 1 }} edges={['top']}>
        {/* Header */}
        <View style={styles.header}>
          <TouchableOpacity onPress={() => navigation.goBack()} style={styles.back}>
            <Ionicons name="arrow-back" size={22} color="#3C2A1E" />
            <Text style={styles.backTxt}>Regresar</Text>
          </TouchableOpacity>
        </View>

        <ScrollView contentContainerStyle={styles.scroll}>
          <Text style={styles.title}>Preguntas Frecuentes</Text>

          {faqs.map((item, i) => (
            <View key={i} style={styles.card}>
              <TouchableOpacity style={styles.cardHead} onPress={() => toggle(i)}>
                <Text style={styles.question}>{i + 1}. {item.q}</Text>
                <Ionicons
                  name={openIndex === i ? 'chevron-up' : 'chevron-down'}
                  size={20}
                  color="#3C2A1E"
                />
              </TouchableOpacity>

              {openIndex === i && (
                <Text style={styles.answer}>{item.a}</Text>
              )}
            </View>
          ))}
        </ScrollView>
      </SafeAreaView>

      {/* Barra inferior (igual que en Home) */}
      <BottomNavBar navigation={navigation} currentScreen="FAQ" />
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#C69B6D' },
  header: { paddingHorizontal: 20, paddingTop: 8, paddingBottom: 8 },
  back: { flexDirection: 'row', alignItems: 'center', gap: 8 },
  backTxt: { color: '#3C2A1E', fontWeight: 'bold' },
  scroll: { paddingHorizontal: 20, paddingBottom: 90 },
  title: { fontSize: 24, fontWeight: 'bold', color: '#3C2A1E', marginVertical: 16 },
  card: {
    backgroundColor: '#9D8364',
    borderRadius: 12,
    padding: 12,
    marginBottom: 12,
  },
  cardHead: { flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between' },
  question: { color: '#3C2A1E', fontWeight: '600', flex: 1, marginRight: 10 },
  answer: { marginTop: 10, color: '#fff', fontSize: 14, lineHeight: 20 },
});
