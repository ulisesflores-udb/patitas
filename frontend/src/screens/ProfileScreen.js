// src/screens/ProfileScreen.js
import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Image } from 'react-native';
import { Ionicons } from '@expo/vector-icons';

export default function ProfileScreen({ navigation }) {
    return (
        <View style={styles.container}>
            {/* Header */}
            <View style={styles.header}>
                <TouchableOpacity onPress={() => navigation.goBack()}>
                    <Ionicons name="arrow-back" size={24} color="#3C2A1E" />
                </TouchableOpacity>
                <Text style={styles.headerTitle}>Regresar</Text>
                <Ionicons name="exit-outline" size={24} color="#3C2A1E" />
            </View>

            {/* Usuario */}
            <View style={styles.profileSection}>
                <Image
                    source={{ uri: 'https://via.placeholder.com/80' }}
                    style={styles.profileImage}
                />
                <View>
                    <Text style={styles.name}>Juan Pérez</Text>
                    <Text style={styles.phone}>+503 7213 8459</Text>
                </View>
            </View>

            {/* Opciones */}
            <View style={styles.options}>
                <TouchableOpacity style={styles.option}>
                    <Ionicons name="person-circle-outline" size={22} color="#fff" />
                    <Text style={styles.optionText}>Editar Perfil</Text>
                    <Ionicons name="chevron-forward" size={20} color="#fff" />
                </TouchableOpacity>

                <TouchableOpacity style={styles.option}>
                    <Ionicons name="paw-outline" size={22} color="#fff" />
                    <Text style={styles.optionText}>Mis Publicaciones</Text>
                    <Ionicons name="chevron-forward" size={20} color="#fff" />
                </TouchableOpacity>

                <TouchableOpacity style={styles.option}>
                    <Ionicons name="key-outline" size={22} color="#fff" />
                    <Text style={styles.optionText}>Cambiar Contraseña</Text>
                    <Ionicons name="chevron-forward" size={20} color="#fff" />
                </TouchableOpacity>

                <TouchableOpacity style={styles.option} onPress={() => navigation.navigate('FAQ')}>
                    <Ionicons name="help-circle-outline" size={22} color="#fff" />
                    <Text style={styles.optionText}>Preguntas Frecuentes</Text>
                    <Ionicons name="chevron-forward" size={20} color="#fff" />
                </TouchableOpacity>

            </View>
        </View>
    );
}

const styles = StyleSheet.create({
    container: { flex: 1, backgroundColor: '#C69B6D', padding: 20, paddingTop: 50 },
    header: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginBottom: 30,
    },
    headerTitle: { color: '#3C2A1E', fontWeight: 'bold' },
    profileSection: { flexDirection: 'row', alignItems: 'center', marginBottom: 30, gap: 20 },
    profileImage: { width: 80, height: 80, borderRadius: 50, backgroundColor: '#E0C097' },
    name: { fontWeight: 'bold', fontSize: 18, color: '#3C2A1E' },
    phone: { color: '#3C2A1E', opacity: 0.8 },
    options: { gap: 15 },
    option: {
        flexDirection: 'row',
        alignItems: 'center',
        backgroundColor: '#6B4F36',
        borderRadius: 10,
        paddingVertical: 12,
        paddingHorizontal: 18,
        justifyContent: 'space-between',
    },
    optionText: { color: '#fff', fontWeight: '600', flex: 1, marginLeft: 10 },
});
