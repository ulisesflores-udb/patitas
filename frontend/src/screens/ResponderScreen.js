import React, { useState } from 'react';
import { View, Text, StyleSheet, TextInput, TouchableOpacity, Switch, Alert, ScrollView } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Ionicons } from '@expo/vector-icons';
import BottomNavBar from './BottomNavBar';
import axios from 'axios';

export default function ResponderScreen({ navigation, route, usuario }) {
  const { pet } = route.params;
  const { id_reporte } = route.params;
  const petId = 1;
  const [nombre, setNombre] = useState(usuario ? usuario.nombre : '');
  const [comentario, setComentario] = useState('');
  const [compartir, setCompartir] = useState(false);

  const enviar = async () => {
    if (!comentario.trim()) {
      Alert.alert('Falta información', 'Escribe un comentario.');
      return;
    }

    const res = await axios.post(`http://192.168.1.188:8000/api/respuestas`, {
      id_usuario: usuario ? usuario.id : null,
      id_reporte: id_reporte,
      descripcion: comentario,
      mostrar_tel: compartir ? 1 : 0,
      mostrar_redes: compartir ? 1 : 0
    }).then(response => {
      if (response.status === 201) {
        Alert.alert('¡Respuesta enviada!', 'Gracias por tu ayuda.');
        console.log('Respuesta enviada:', response.data);
      } else {
        Alert.alert('Error', 'Hubo un problema al enviar tu respuesta. Inténtalo de nuevo.');
        console.log('Error al enviar la respuesta:', response);
      }
    }).catch(error => {
      console.error('Error al enviar la respuesta:', error);
    });

    setComentario('');
    setCompartir(false);
    navigation.navigate('Search');
  };

  return (
    <View style={styles.container}>
      <SafeAreaView style={{ flex: 1 }} edges={['top']}>
        <View style={styles.header}>
          <TouchableOpacity onPress={() => navigation.goBack()} style={styles.headerLeft}>
            <Ionicons name="chevron-back" size={22} color="#3C2A1E" />
          </TouchableOpacity>
        <Text style={styles.headerTitle}>Todas las publicaciones</Text>
          <View style={{ width: 22 }} />
        </View>

        <ScrollView contentContainerStyle={{ padding: 20 }}>
          <View style={styles.titleRow}>
            <Text style={styles.petName}>{pet.name}</Text>
            <Text style={styles.breed}>{pet.breed}</Text>
          </View>

          <View style={styles.card}>
            <Text style={styles.label}>Nombre</Text>
            <Text style={styles.value}>{nombre}</Text>

            <Text style={[styles.label, { marginTop: 14 }]}>Comentario</Text>
            <TextInput
              style={styles.input}
              placeholder="Escribe aquí…"
              multiline
              value={comentario}
              onChangeText={setComentario}
            />

            <View style={styles.switchRow}>
              <Switch value={compartir} onValueChange={setCompartir} />
              <Text style={styles.switchText}>Compartir redes sociales</Text>
            </View>

            <TouchableOpacity style={styles.sendBtn} onPress={enviar}>
              <Text style={styles.sendText}>Enviar respuesta</Text>
            </TouchableOpacity>
          </View>
        </ScrollView>
      </SafeAreaView>

      <BottomNavBar navigation={navigation} currentScreen="Responder" />
    </View>
  );
}

const dark = '#4B2E0C';
const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#dbac7eff' },
  header: { flexDirection: 'row', alignItems: 'center', paddingHorizontal: 16, paddingTop: 10, paddingBottom: 6 },
  headerLeft: { padding: 6, borderRadius: 10, backgroundColor: '#00000010' },
  headerTitle: { flex: 1, textAlign: 'center', fontSize: 16, fontWeight: '600', color: '#3C2A1E' },

  titleRow: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'flex-end', marginBottom: 12 },
  petName: { fontSize: 28, fontWeight: '800', color: dark },
  breed: { fontSize: 12, color: dark },

  card: { backgroundColor: '#C19A6B', borderRadius: 16, padding: 16 },
  label: { color: '#fff', fontWeight: '700', marginBottom: 6 },
  value: { color: '#fff' },
  input: { backgroundColor: '#9D8364', borderRadius: 12, minHeight: 100, padding: 12, color: '#fff', textAlignVertical: 'top' },

  switchRow: { flexDirection: 'row', alignItems: 'center', marginTop: 12 },
  switchText: { marginLeft: 10, color: dark },

  sendBtn: { backgroundColor: '#6A4E23', paddingVertical: 14, borderRadius: 12, alignItems: 'center', marginTop: 16 },
  sendText: { color: '#fff', fontWeight: '800' },
});
