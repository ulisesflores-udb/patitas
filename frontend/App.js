// App.js — Forzar inicio directo en Home y registrar rutas
import 'react-native-gesture-handler';
import React, { useState, useEffect } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import axios from 'axios'

import WelcomeScreen from './src/screens/WelcomeScreen';
import LoginScreen from './src/screens/LoginScreen';
import RegisterScreen from './src/screens/RegisterScreen';
import HomeScreen from './src/screens/HomeScreen';
import ProfileScreen from './src/screens/ProfileScreen';
import EditProfileScreen from './src/screens/EditProfileScreen';
import MyPublicationsScreen from './src/screens/MyPublicationsScreen';
import ChangePasswordScreen from './src/screens/ChangePasswordScreen';
import NotificationsScreen from './src/screens/NotificationsScreen';
import FaqScreen from './src/screens/FaqScreen';
import AgregarMascotaScreen from './src/screens/AgregarMascotaScreen';
import AddPetLocationScreen from './src/screens/AddPetLocationScreen';
import SearchScreen from './src/screens/SearchScreen';

import PublicationDetailScreen from './src/screens/PublicationDetailScreen';
import ResponderScreen from './src/screens/ResponderScreen';

import {API_URL} from './src/config/config';

const Stack = createNativeStackNavigator();

export default function App() {

  const [departamentos, setDepartamentos] = useState([])
  const [distritos, setDistritos] = useState([])
  const [especies, setEspecies] = useState([])
  const [municipios, setMunicipios] = useState([])
  const [perdidas, setPerdidas] = useState([])
  const [razas, setRazas] = useState([])
  const [respuestas, setRespuestas] = useState([])
  const [usuarios, setUsuarios] = useState([])

  const [usuarioLogeado, setUsuarioLogeado] = useState("Vacío desde el inicio");

  useEffect(() => {
    const fetchObjects = async () => {
      try {
        const [
          departamentos,
          distritos,
          especies,
          municipios,
          perdidas,
          razas,
          usuarios
        ] = await Promise.all([
          axios.get(`http://192.168.1.188:8000/api/departamento`),
          axios.get(`http://192.168.1.188:8000/api/distrito`),
          axios.get(`http://192.168.1.188:8000/api/especie`),
          axios.get(`http://192.168.1.188:8000/api/municipio`),
          axios.get(`http://192.168.1.188:8000/api/perdidas`),
          axios.get(`http://192.168.1.188:8000/api/raza`),
          axios.get(`http://192.168.1.188:8000/api/usuarios`)
        ]);

        setDepartamentos(departamentos.data);
        setDistritos(distritos.data);
        setEspecies(especies.data);
        setMunicipios(municipios.data);
        setPerdidas(perdidas.data);
        setRazas(razas.data);
        setUsuarios(usuarios.data);

      } catch (error) {
        console.error("Error al obtener los datos iniciales:", error);
      } finally {
        console.log("Datos iniciales obtenidos");
      }
    };

    fetchObjects();
  }, []);
  
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Welcome" screenOptions={{ headerShown: false }}>
        <Stack.Screen name="Welcome" component={WelcomeScreen} />
        <Stack.Screen name="Login">
          {props => 
            <LoginScreen 
              {...props}
              usuarios={usuarios}
              usuarioLogeado={usuarioLogeado}
              setUsuarioLogeado={setUsuarioLogeado}

            />}
        </Stack.Screen>
        <Stack.Screen name="Register">
          {props => 
            <RegisterScreen 
              {...props}
              departamentos={departamentos}
              municipios={municipios}
              usuarios={usuarios}
              setUsuarios={setUsuarios}
            />}
        </Stack.Screen>
        <Stack.Screen name="Home">
          {props => 
            <HomeScreen 
              {...props}
              usuarioLogeado={usuarioLogeado}
              setUsuarioLogeado={setUsuarioLogeado}
              perdidas={perdidas}
            />
          }
        </Stack.Screen>
        <Stack.Screen name="Search">
          { props => <SearchScreen 
            {...props} 
            allPets={perdidas}
            usuario={usuarioLogeado} 
          />}
        </Stack.Screen>

        <Stack.Screen name="Profile" component={ProfileScreen} />
        <Stack.Screen name="EditProfile" component={EditProfileScreen} />
        <Stack.Screen name="MyPublications" component={MyPublicationsScreen} />
        <Stack.Screen name="ChangePassword" component={ChangePasswordScreen} />
        <Stack.Screen name="Notifications" component={NotificationsScreen} />
        <Stack.Screen name="FAQ" component={FaqScreen} />
        <Stack.Screen name="AddPet">
          { props => <AgregarMascotaScreen 
            {...props}
            usuario = {usuarioLogeado}
            especies = {especies}
            razas = {razas}
            setPets={setPerdidas}
          />}
        </Stack.Screen>
        <Stack.Screen name="AddPetLocation" component={AddPetLocationScreen} />
        <Stack.Screen name="PublicationDetail" component={PublicationDetailScreen} />
        <Stack.Screen name="Responder">
          { props => <ResponderScreen 
            {...props} 
            usuario = {usuarioLogeado} 
          />}
        </Stack.Screen>
      </Stack.Navigator>
    </NavigationContainer>
  );
}
