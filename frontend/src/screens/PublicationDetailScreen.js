import React from 'react';
import { View, Text, StyleSheet, Image, TouchableOpacity, ScrollView, Linking, Platform } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Ionicons } from '@expo/vector-icons';
import BottomNavBar from './BottomNavBar';

const colors = {
  bg: '#dbac7eff',
  card: '#9D8364',
  panel: '#6A4E23',
  dark: '#4B2E0C',
  chip: '#C19A6B',
  white: '#fff',
};

const shadow = {
  shadowColor: '#000',
  shadowOpacity: 0.15,
  shadowOffset: { width: 0, height: 4 },
  shadowRadius: 12,
  elevation: 8,
};

const RAZAS = { 1: 'Golden Retriever', 2: 'Labrador', 3: 'Beagle' };
const formatDate = (s) => {
  if (!s) return '—';
  const d = new Date(s);
  if (Number.isNaN(d.getTime())) return String(s);
  return d.toLocaleDateString();
};

export default function PublicationDetailScreen({ navigation, route }) {
  const { publication } = route.params || {};
  const name = publication?.nombre_mascota || 'Mascota';
  const razaNombre = RAZAS[publication?.id_raza] || (publication?.id_raza ? `Raza #${publication.id_raza}` : '—');
  const descripcion = publication?.descripcion || '—';
  const direccion = publication?.direccion_maps || '—';
  const referencia = publication?.punto_referencia || '—';
  const fechaPerdida = formatDate(publication?.fecha_perdida);
  const fechaPublic = formatDate(publication?.fecha_public);
  const lat = publication?.latitud ?? 13.6929;
  const lng = publication?.longitud ?? -89.2182;
  const radio = publication?.radio ?? 0;
  const mostrarRedes = !!publication?.mostrar_redes;
  const mostrarTel = !!publication?.mostrar_tel;
  const foto = publication?.foto;

  const openMap = () => navigation.navigate('Map', { title: name, lat, lng });

  const share = async () => {
    try {
      const url = `https://www.google.com/maps/search/?api=1&query=${lat},${lng}`;
      const text = `Se busca: ${name}\n${descripcion}\nUbicación: ${direccion}\nMapa: ${url}`;
      await Linking.openURL(`https://wa.me/?text=${encodeURIComponent(text)}`);
    } catch {}
  };

  const embedUrl = `https://maps.google.com/maps?q=${lat},${lng}&z=15&output=embed`;

  return (
    <View style={styles.container}>
      <SafeAreaView style={{ flex: 1 }} edges={['top']}>
        {/* Header */}
        <View style={styles.header}>
          <TouchableOpacity onPress={() => navigation.goBack()} style={styles.headerBtn}>
            <Ionicons name="chevron-back" size={22} color={colors.dark} />
          </TouchableOpacity>
          <Text style={styles.headerTitle}>Todas las publicaciones</Text>
          <View style={{ width: 38 }} />
        </View>

        <ScrollView contentContainerStyle={styles.content} showsVerticalScrollIndicator={false}>
          {/* Título + chips */}
          <View style={styles.titleRow}>
            <Text style={styles.petName}>{name}</Text>
            <View style={styles.chipsRow}>
              <View style={[styles.chip, shadow]}>
                <Ionicons name="ribbon-outline" size={14} color={colors.white} />
                <Text style={styles.chipText}>{razaNombre}</Text>
              </View>
              {radio > 0 && (
                <View style={[styles.chip, shadow]}>
                  <Ionicons name="radio-outline" size={14} color={colors.white} />
                  <Text style={styles.chipText}>{radio} m</Text>
                </View>
              )}
            </View>
          </View>

          {/* Foto o placeholder */}
          <View style={[styles.avatar, shadow]}>
            {foto ? (
              <Image source={{ uri: foto }} style={{ width: '100%', height: '100%' }} />
            ) : (
              <>
                <View style={styles.head} />
                <View style={styles.body} />
              </>
            )}
          </View>

          {/* Descripción */}
          <View style={[styles.bubble, shadow]}>
            <Ionicons name="information-circle-outline" size={18} color={colors.white} style={{ marginRight: 8 }} />
            <Text style={styles.bubbleText}>{descripcion}</Text>
          </View>

          {/* Fechas */}
          <View style={[styles.cardSection, shadow]}>
            <Text style={styles.sectionTitle}>Fechas</Text>
            <Text style={styles.sectionText}>Pérdida: {fechaPerdida}</Text>
            <Text style={styles.sectionText}>Publicado: {fechaPublic}</Text>
          </View>

          {/* Ubicación + mapa (con iframe en web) */}
          <View style={[styles.cardSection, shadow]}>
            <Text style={styles.sectionTitle}>Ubicación</Text>
            <Text style={styles.sectionText}>{direccion}</Text>

            <TouchableOpacity activeOpacity={0.9} onPress={openMap} style={{ marginTop: 10 }}>
              <View style={[styles.mapWrapper, shadow]}>
                {Platform.OS === 'web' ? (
                  <View style={styles.roundedClip}>
                    <iframe
                      title="map"
                      src={embedUrl}
                      style={styles.iframe}
                      allowFullScreen
                      loading="lazy"
                      referrerPolicy="no-referrer-when-downgrade"
                    />
                  </View>
                ) : (
                  <Image
                    source={{ uri: 'https://maps.gstatic.com/tactile/omnibox/placeholder_map.png' }}
                    style={styles.map}
                    resizeMode="cover"
                  />
                )}
                <View style={styles.mapOverlay}>
                  <Ionicons name="map-outline" size={16} color={colors.white} />
                  <Text style={styles.mapHint}>Ver mapa</Text>
                </View>
              </View>
            </TouchableOpacity>

            <Text style={[styles.sectionTitle, { marginTop: 8 }]}>Referencia</Text>
            <Text style={styles.sectionText}>{referencia}</Text>
          </View>

          {/* Acciones */}
          <TouchableOpacity style={[styles.cta, shadow]} onPress={() => navigation.navigate('Responder', { pet: { name, breed: razaNombre } })}>
            <Ionicons name="chatbubble-ellipses-outline" size={20} color={colors.white} />
            <Text style={styles.ctaText}>¿Tienes información? Pulsa aquí</Text>
          </TouchableOpacity>

          <View style={styles.actionsRow}>
            {mostrarRedes && (
              <TouchableOpacity style={[styles.secondaryBtn, shadow]} onPress={share}>
                <Ionicons name="share-social-outline" size={18} color={colors.white} />
                <Text style={styles.secondaryText}>Compartir</Text>
              </TouchableOpacity>
            )}
            {mostrarTel && (
              <TouchableOpacity
                style={[styles.secondaryBtn, shadow]}
                onPress={() => Linking.openURL('tel:+50300000000')} // ← reemplaza por el teléfono real
              >
                <Ionicons name="call-outline" size={18} color={colors.white} />
                <Text style={styles.secondaryText}>Llamar</Text>
              </TouchableOpacity>
            )}
          </View>

          {/* Respuestas (demo) */}
          <View style={[styles.cardSection, shadow]}>
            <Text style={styles.sectionTitle}>Respuestas</Text>
            <View style={styles.answerItem}>
              <View style={[styles.answerAvatar, shadow]}>
                <Ionicons name="person" size={16} color={colors.white} />
              </View>
              <View style={{ flex: 1 }}>
                <Text style={styles.answerAuthor}>Luis Cáceres</Text>
                <Text style={styles.answerText}>Me parece haberlo visto cerca de la zona</Text>
              </View>
              <Ionicons name="time-outline" size={14} color={colors.white} />
            </View>
          </View>
        </ScrollView>
      </SafeAreaView>

      <BottomNavBar navigation={navigation} currentScreen="Detail" />
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: colors.bg },
  content: { padding: 20, paddingBottom: 28 },
  header: { flexDirection: 'row', alignItems: 'center', paddingHorizontal: 16, paddingTop: 10, paddingBottom: 6 },
  headerBtn: { width: 38, height: 38, borderRadius: 12, backgroundColor: '#00000012', alignItems: 'center', justifyContent: 'center' },
  headerTitle: { flex: 1, textAlign: 'center', fontSize: 16, fontWeight: '700', color: colors.dark },

  titleRow: { marginBottom: 10 },
  petName: { fontSize: 30, fontWeight: '900', color: colors.dark, marginBottom: 8 },
  chipsRow: { flexDirection: 'row' },
  chip: { flexDirection: 'row', alignItems: 'center', backgroundColor: colors.panel, paddingVertical: 6, paddingHorizontal: 10, borderRadius: 999, marginRight: 8 },
  chipText: { color: colors.white, fontSize: 12, fontWeight: '700' },

  avatar: { height: 150, backgroundColor: colors.chip, borderRadius: 18, marginBottom: 14, overflow: 'hidden', justifyContent: 'center' },
  head: { width: 100, height: 100, borderRadius: 50, backgroundColor: colors.bg, alignSelf: 'center', marginTop: -6 },
  body: { width: 130, height: 130, borderRadius: 65, backgroundColor: colors.bg, alignSelf: 'center', marginTop: -18 },

  bubble: { flexDirection: 'row', alignItems: 'flex-start', backgroundColor: colors.card, padding: 14, borderRadius: 14, marginBottom: 14 },
  bubbleText: { color: colors.white, fontSize: 14, lineHeight: 20, flex: 1 },

  cardSection: { backgroundColor: colors.panel, borderRadius: 16, padding: 14, marginBottom: 14 },
  sectionTitle: { color: colors.white, fontWeight: '800', marginBottom: 6 },
  sectionText: { color: colors.white, opacity: 0.95 },

  // MAPA
  mapWrapper: { position: 'relative', borderRadius: 12, backgroundColor: '#7b5a2d' },
  roundedClip: { borderRadius: 12, overflow: 'hidden' },     // hace que el iframe quede recortado con bordes
  iframe: { border: 0, width: '100%', height: 140 },         // web
  map: { width: '100%', height: 140 },                       // native (imagen)
  mapOverlay: { position: 'absolute', right: 10, bottom: 10, backgroundColor: '#00000055', borderRadius: 999, paddingVertical: 6, paddingHorizontal: 10, flexDirection: 'row', alignItems: 'center' },
  mapHint: { color: colors.white, fontWeight: '700', fontSize: 12 },

  cta: { backgroundColor: colors.panel, flexDirection: 'row', alignItems: 'center', justifyContent: 'center', paddingVertical: 16, borderRadius: 14, marginBottom: 10 },
  ctaText: { color: colors.white, fontSize: 16, fontWeight: '900', marginLeft: 10 },

  actionsRow: { flexDirection: 'row', justifyContent: 'space-between', marginBottom: 14 },
  secondaryBtn: { flex: 1, marginHorizontal: 6, backgroundColor: colors.panel, borderRadius: 12, paddingVertical: 12, alignItems: 'center', flexDirection: 'row', justifyContent: 'center' },
  secondaryText: { color: colors.white, fontWeight: '800', marginLeft: 8 },

  answerItem: { marginTop: 8, flexDirection: 'row', alignItems: 'center', backgroundColor: colors.card, borderRadius: 12, padding: 12 },
  answerAvatar: { width: 28, height: 28, borderRadius: 14, backgroundColor: colors.panel, alignItems: 'center', justifyContent: 'center', marginRight: 10 },
  answerAuthor: { color: colors.white, fontWeight: '700', marginBottom: 4 },
  answerText: { color: colors.white },
});
