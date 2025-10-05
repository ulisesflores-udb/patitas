// src/screens/AddPetLocationScreen.js
import React, { useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  TextInput,
  ScrollView,
  Platform,
  Alert,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { Ionicons } from "@expo/vector-icons";

export default function AddPetLocationScreen({ navigation }) {
  const [referencePoint, setReferencePoint] = useState("");
  const [shareSocial, setShareSocial] = useState(false);
  const [sharePhone, setSharePhone] = useState(false);

  const handleReport = () => {
    Alert.alert("Reporte enviado", "¡Gracias! Tu mascota ha sido reportada.", [
      { text: "OK", onPress: () => navigation.navigate("Home") },
    ]);
  };

  // Coordenadas por defecto (San Salvador)
  const lat = 13.6929;
  const lng = -89.2182;

  return (
    <View style={styles.container}>
      <SafeAreaView style={{ flex: 1 }} edges={["top"]}>
        {/* Header */}
        <View style={styles.headerRow}>
          <TouchableOpacity
            onPress={() => navigation.goBack()}
            style={styles.backBtn}
          >
            <Ionicons name="chevron-back" size={20} color="#3C2A1E" />
            <Text style={styles.backTxt}>Regresar</Text>
          </TouchableOpacity>
        </View>

        <ScrollView contentContainerStyle={styles.scroll}>
          {/* Título */}
          <View style={styles.titleRow}>
            <Ionicons
              name="paw"
              size={28}
              color="#3C2A1E"
              style={{ marginRight: 8 }}
            />
            <View>
              <Text style={styles.bigTitle}>Encontremos</Text>
              <Text style={styles.smallTitle}>a tu mascota</Text>
            </View>
          </View>

          {/* Punto de referencia */}
          <Text style={styles.label}>Punto de Referencia</Text>
          <TextInput
            style={styles.input}
            placeholder="Ej. Frente a Unicentro"
            placeholderTextColor="#9D8C76"
            value={referencePoint}
            onChangeText={setReferencePoint}
          />

          {/* Mapa embebido (sin API key) */}
          <Text style={[styles.label, { marginTop: 14 }]}>
            Ubicación donde perdió a su mascota
          </Text>

          <View style={styles.mapBox}>
            <iframe
              title="Mapa ubicación"
              width="100%"
              height="100%"
              style={{ border: 0, borderRadius: 12 }}
              loading="lazy"
              src={`https://maps.google.com/maps?q=${lat},${lng}&z=15&output=embed`}
            />
          </View>

          {/* Opciones */}
          <View style={styles.shareRow}>
            <TouchableOpacity
              style={styles.checkboxRow}
              onPress={() => setShareSocial(!shareSocial)}
            >
              <View
                style={[styles.checkbox, shareSocial && styles.checkboxOn]}
              >
                {shareSocial && (
                  <Ionicons name="checkmark" size={14} color="#fff" />
                )}
              </View>
              <Text style={styles.shareTxt}>Compartir redes sociales</Text>
            </TouchableOpacity>

            <TouchableOpacity
              style={styles.checkboxRow}
              onPress={() => setSharePhone(!sharePhone)}
            >
              <View style={[styles.checkbox, sharePhone && styles.checkboxOn]}>
                {sharePhone && (
                  <Ionicons name="checkmark" size={14} color="#fff" />
                )}
              </View>
              <Text style={styles.shareTxt}>Compartir número de teléfono</Text>
            </TouchableOpacity>
          </View>

          <Text style={styles.note}>
            Nota: De no seleccionarse ninguno se compartirá el correo.
          </Text>

          {/* Botón Reportar */}
          <TouchableOpacity style={styles.primaryBtn} onPress={handleReport}>
            <Text style={styles.primaryTxt}>Reportar</Text>
          </TouchableOpacity>
        </ScrollView>
      </SafeAreaView>
    </View>
  );
}

const BGC = "#C69B6D";
const INPUT = "#E0C097";
const DARK = "#3C2A1E";
const CARD = "#9D8364";

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: BGC },
  headerRow: { paddingHorizontal: 20, paddingTop: 8, paddingBottom: 8 },
  backBtn: { flexDirection: "row", alignItems: "center", gap: 6 },
  backTxt: { color: DARK, fontWeight: "bold" },
  scroll: { paddingHorizontal: 20, paddingBottom: 40 },
  titleRow: { flexDirection: "row", alignItems: "center", marginBottom: 16 },
  bigTitle: { color: DARK, fontSize: 26, fontWeight: "900", lineHeight: 26 },
  smallTitle: { color: DARK, opacity: 0.9 },
  label: { color: DARK, fontWeight: "700", marginBottom: 6 },
  input: {
    backgroundColor: INPUT,
    borderRadius: 12,
    paddingHorizontal: 12,
    paddingVertical: 12,
    borderWidth: StyleSheet.hairlineWidth,
    borderColor: "#b69373",
    color: DARK,
  },
  mapBox: {
    height: 250,
    backgroundColor: CARD,
    borderRadius: 14,
    overflow: "hidden",
    marginTop: 8,
    marginBottom: 8,
  },
  shareRow: { flexDirection: "row", justifyContent: "space-between", marginTop: 8 },
  checkboxRow: { flexDirection: "row", alignItems: "center", gap: 8 },
  checkbox: {
    width: 20,
    height: 20,
    borderRadius: 4,
    borderWidth: 1.5,
    borderColor: DARK,
    backgroundColor: "transparent",
    justifyContent: "center",
    alignItems: "center",
  },
  checkboxOn: { backgroundColor: DARK, borderColor: DARK },
  shareTxt: { color: DARK },
  note: {
    color: DARK,
    opacity: 0.85,
    fontSize: 12,
    marginTop: 10,
    marginBottom: 14,
  },
  primaryBtn: {
    backgroundColor: "#6A4E23",
    paddingVertical: 14,
    borderRadius: 12,
    alignItems: "center",
    marginTop: 6,
  },
  primaryTxt: { color: "#fff", fontWeight: "700" },
});
