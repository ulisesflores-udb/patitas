import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Platform, Image, Linking } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Ionicons } from '@expo/vector-icons';

const colors = {
  bg: '#dbac7eff',
  panel: '#6A4E23',
  dark: '#4B2E0C',
  white: '#fff',
  chip: '#C19A6B',
};

export default function MapScreen({ navigation, route }) {
  const { title = 'Ubicación', lat = 13.6929, lng = -89.2182 } = route.params || {};
  const mapUrl = `https://maps.google.com/maps?q=${lat},${lng}&z=15&output=embed`;

  const openExternal = () => {
    const url = Platform.select({
      ios: `http://maps.apple.com/?q=${lat},${lng}`,
      android: `geo:${lat},${lng}?q=${lat},${lng}(${encodeURIComponent(title)})`,
      default: `https://www.google.com/maps/search/?api=1&query=${lat},${lng}`,
    });
    Linking.openURL(url);
  };

  return (
    <View style={{ flex: 1, backgroundColor: colors.bg }}>
      <SafeAreaView style={{ flex: 1 }}>
        {/* Header */}
        <View style={styles.header}>
          <TouchableOpacity onPress={() => navigation.goBack()} style={styles.headerBtn}>
            <Ionicons name="chevron-back" size={22} color={colors.dark} />
          </TouchableOpacity>
          <Text style={styles.headerTitle}>{title}</Text>
          <View style={{ width: 38 }} />
        </View>

        {/* Contenido */}
        <View style={styles.wrap}>
          {Platform.OS === 'web' ? (
            <iframe
              title="map"
              src={mapUrl}
              style={{ border: '0', width: '100%', height: '100%', borderRadius: 16 }}
              allowFullScreen
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
            />
          ) : (
            <View style={styles.nativeMapPreview}>
              <Image
                source={{ uri: 'https://maps.gstatic.com/tactile/omnibox/placeholder_map.png' }}
                style={styles.previewImage}
                resizeMode="cover"
              />
              <View style={styles.previewOverlay}>
                <Ionicons name="map-outline" size={18} color={colors.white} />
                <Text style={styles.previewText}>Vista previa</Text>
              </View>
            </View>
          )}
        </View>

        <TouchableOpacity style={styles.openBtn} onPress={openExternal}>
          <Ionicons name="navigate-outline" size={18} color={colors.white} />
          <Text style={styles.openText}>Abrir en Google Maps</Text>
        </TouchableOpacity>
      </SafeAreaView>
    </View>
  );
}

const shadow = {
  shadowColor: '#000',
  shadowOpacity: 0.15,
  shadowOffset: { width: 0, height: 4 },
  shadowRadius: 12,
  elevation: 8,
};

const styles = StyleSheet.create({
  header: { flexDirection: 'row', alignItems: 'center', paddingHorizontal: 16, paddingTop: 10, paddingBottom: 6 },
  headerBtn: { width: 38, height: 38, borderRadius: 12, backgroundColor: '#00000012', alignItems: 'center', justifyContent: 'center' },
  headerTitle: { flex: 1, textAlign: 'center', fontSize: 16, fontWeight: '800', color: colors.dark },

  wrap: { flex: 1, margin: 16, borderRadius: 16, overflow: 'hidden', backgroundColor: colors.chip, ...shadow },

  nativeMapPreview: { flex: 1, position: 'relative' },
  previewImage: { width: '100%', height: '100%' },
  previewOverlay: { position: 'absolute', right: 10, bottom: 10, backgroundColor: '#00000055', borderRadius: 999, paddingVertical: 6, paddingHorizontal: 10, flexDirection: 'row', alignItems: 'center' },
  previewText: { color: colors.white, fontWeight: '700', marginLeft: 6 },

  openBtn: { margin: 16, backgroundColor: colors.panel, paddingVertical: 14, borderRadius: 14, alignItems: 'center', justifyContent: 'center', flexDirection: 'row', ...shadow },
  openText: { color: colors.white, fontWeight: '900', marginLeft: 8 },
});
