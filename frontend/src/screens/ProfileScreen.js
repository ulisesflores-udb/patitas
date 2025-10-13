// src/screens/ProfileScreen.js
import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Image } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Ionicons } from '@expo/vector-icons';
import BottomNavBar from './BottomNavBar';

export default function ProfileScreen({ navigation, usuario }) {
    return (
        <View style={styles.container}>
            <SafeAreaView style={styles.safeArea} edges={['top']}>
                {/* Header */}
                <View style={styles.header}>
                    <TouchableOpacity onPress={() => navigation.goBack()}>
                        <Ionicons name="chevron-back" size={28} color="#4B2E0C" />
                    </TouchableOpacity>
                    <Text style={styles.headerTitle}>Mi Perfil</Text>
                    <TouchableOpacity onPress={() => navigation.navigate('Welcome')}>
                    <Ionicons name="exit-outline" size={24} color="#4B2E0C" />
                    </TouchableOpacity>
                </View>

                {/* Usuario */}
                <View style={styles.profileSection}>
                    <Image
                        source={require('../../assets/Default PFP.png')}
                        style={styles.profileImage}
                    />
                    <View>
                        <Text style={styles.name}>{usuario.nombre}</Text>
                        <Text style={styles.phone}>{usuario.telefono}</Text>
                    </View>
                </View>

                {/* Opciones */}
                <View style={styles.options}>
                    <TouchableOpacity 
                        style={styles.option}
                        onPress={() => navigation.navigate('EditProfile')}>
                        <Ionicons name="person-circle-outline" size={22} color="#fff" />
                        <Text style={styles.optionText}>Editar Perfil</Text>
                        <Ionicons name="chevron-forward" size={20} color="#fff" />
                    </TouchableOpacity>

                    <TouchableOpacity 
                        style={styles.option}
                        onPress={() => navigation.navigate('MyPublications')}>
                        <Ionicons name="paw-outline" size={22} color="#fff" />
                        <Text style={styles.optionText}>Mis Publicaciones</Text>
                        <Ionicons name="chevron-forward" size={20} color="#fff" />
                    </TouchableOpacity>

                    <TouchableOpacity 
                        style={styles.option}
                        onPress={() => navigation.navigate('ChangePassword')}>
                        <Ionicons name="key-outline" size={22} color="#fff" />
                        <Text style={styles.optionText}>Cambiar Contraseña</Text>
                        <Ionicons name="chevron-forward" size={20} color="#fff" />
                    </TouchableOpacity>

                    <TouchableOpacity 
                        style={styles.option} 
                        onPress={() => navigation.navigate('FAQ')}>
                        <Ionicons name="help-circle-outline" size={22} color="#fff" />
                        <Text style={styles.optionText}>Preguntas Frecuentes</Text>
                        <Ionicons name="chevron-forward" size={20} color="#fff" />
                    </TouchableOpacity>
                </View>
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
        paddingHorizontal: 20,
        paddingTop: 15,
    },
    header: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginBottom: 30,
    },
    headerTitle: { 
        color: '#4B2E0C', 
        fontWeight: 'bold',
        fontSize: 24,
    },
    profileSection: { 
        flexDirection: 'row', 
        alignItems: 'center', 
        marginBottom: 30, 
        gap: 20 
    },
    profileImage: { 
        width: 80, 
        height: 80, 
        borderRadius: 50, 
        backgroundColor: '#9D8364' 
    },
    name: { 
        fontWeight: 'bold', 
        fontSize: 18, 
        color: '#4B2E0C' 
    },
    phone: { 
        color: '#4B2E0C', 
        opacity: 0.8 
    },
    options: { 
        gap: 15,
        marginBottom: 20,
    },
    option: {
        flexDirection: 'row',
        alignItems: 'center',
        backgroundColor: '#6A4E23',
        borderRadius: 10,
        paddingVertical: 12,
        paddingHorizontal: 18,
        justifyContent: 'space-between',
    },
    optionText: { 
        color: '#fff', 
        fontWeight: '600', 
        flex: 1, 
        marginLeft: 10 
    },
});