// App.js – Navegación completa con SearchScreen
import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

import WelcomeScreen from './src/screens/WelcomeScreen';
import LoginScreen from './src/screens/LoginScreen';
import RegisterScreen from './src/screens/RegisterScreen';
import HomeScreen from './src/screens/HomeScreen';
import SearchScreen from './src/screens/SearchScreen';
import ProfileScreen from './src/screens/ProfileScreen';
import FaqScreen from './src/screens/FaqScreen';
import agregarMascotaScreen from './src/screens/agregarMascotaScreen';
import AddPetLocationScreen from './src/screens/AddPetLocationScreen';

const Stack = createNativeStackNavigator();

export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Welcome" screenOptions={{ headerShown: false }}>
        <Stack.Screen name="Welcome" component={WelcomeScreen} />
        <Stack.Screen name="Login" component={LoginScreen} />
        <Stack.Screen name="Register" component={RegisterScreen} />
        <Stack.Screen name="Home" component={HomeScreen} />
        <Stack.Screen name="Search" component={SearchScreen} />
        <Stack.Screen name="Profile" component={ProfileScreen} />
        <Stack.Screen name="FAQ" component={FaqScreen} />
        <Stack.Screen name="AddPet" component={agregarMascotaScreen} />
        <Stack.Screen name="AddPetLocation" component={AddPetLocationScreen} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}