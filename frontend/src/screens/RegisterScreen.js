import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, Image, TextInput, TouchableOpacity, ScrollView } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Ionicons } from '@expo/vector-icons';
import { Picker } from '@react-native-picker/picker';
import axios from 'axios';

export default function RegisterScreen({ navigation, departamentos, municipios, usuarios, setUsuarios }) {
  const [rol, setRol] = useState(2);
  const [telefono, setTelefono] = useState('');
  const [nombre, setNombre] = useState('');
  const [apellido, setApellido] = useState('');
  const [correo, setCorreo] = useState('');
  const [genero, setGenero] = useState('MASCULINO');

  const [colonia, setColonia] = useState('');
  const [calle, setCalle] = useState('');
  const [red_social, setRed_social] = useState('Facebook');
  const [usuario_redes, setUsuario_redes] = useState('');
  const [pass, setPass] = useState('');
  const [estado, setEstado] = useState(1);

  const [departmento, setDepartmento] = useState();
  const [municipio, setMunicipio] = useState(null); 
  const [distrito, setDistrito] = useState(null);

  const [filteredMunicipios, setFilteredMunicipios] = useState([]); 
  const [distritos, setDistritos] = useState([]);
  const [isLoadingDistritos, setIsLoadingDistritos] = useState(false);

useEffect(() => {
    if (departmento) {
      const municipiosDelDepto = municipios.filter(m => parseInt(m.id_departamento) === parseInt(departmento));
      setFilteredMunicipios(municipiosDelDepto);
    } else {
      setFilteredMunicipios([]);
    }
    
    setMunicipio(null);
    setDistrito(null);
    setDistritos([]);
  }, [departmento]); 

  useEffect(() => {
    if (municipio) {
      console.log(municipio)
      const fetchDistritos = async () => {
        setIsLoadingDistritos(true);
        setDistritos([]);
        setDistrito(null); 
        try {
          
          const response = await axios.get(`http://192.168.1.188:8000/api/distrito/${municipio}`);
          setDistritos(response.data);
        } catch (error) {
          console.error("Error al obtener los distritos:", error);
          alert('No se pudieron cargar los distritos. Intente de nuevo.');
        } finally {
          setIsLoadingDistritos(false);
        }
      };
      fetchDistritos();
    }
  }, [municipio]);



  const handleRegister = () => {
    
    if (!telefono || !nombre || !apellido || !correo || !departmento || !municipio || !distrito || !colonia || !calle || !red_social || !usuario_redes || !pass) {
      alert('Por favor completa todos los campos');
      return;
    }

    if (!/^[67]\d{7}$/.test(telefono)) {
      alert('El número de teléfono debe tener 8 dígitos e iniciar con el numero 6 o 7');
      return;
    } else {
      setTelefono(parseInt(telefono));
    }
    
    
    const newUser = {
      id_rol: rol,
      nombre,
      apellido,
      genero,
      correo,
      pass,
      id_distrito: distrito,
      colonia,
      calle,
      red_social,
      usuario_redes,
      estado,
      telefono,
    };


    const resp = axios.post('http://192.168.1.188:8000/api/usuarios', newUser)
    .then(response => {
      if (response.status === 200) {
        console.log('Usuario registrado');
        alert('Registro exitoso');
        setUsuarios([...usuarios, newUser]);
        navigation.navigate('Login');
      }
    })
    .catch(error => {
      alert(error.response.data || 'Error al registrar usuario');
      console.log(error.response.data);
      return;
    });




  };


  return (
    <SafeAreaView style={styles.safeArea} edges={['top', 'bottom']}>
      <ScrollView 
        style={styles.container}
        contentContainerStyle={styles.scrollContent}>
        {/* Header con botón de regreso */}
        <View style={styles.header}>
          <TouchableOpacity 
            style={styles.backButton} 
            onPress={() => navigation.goBack()}>
            <Ionicons name="chevron-back" size={28} color="#4B2E0C" />
          </TouchableOpacity>
          <Text style={styles.headerTitle}>Regresar</Text>
        </View>

        {/* Imagen de perfil */}
        <View style={styles.profileContainer}>
          <Image 
            source={require('../../assets/Default PFP.png')} 
            style={styles.profileImage} 
          />
          <TouchableOpacity style={styles.editButton}>
            <Ionicons name="pencil" size={20} color="#fff" />
          </TouchableOpacity>
        </View>

        {/* Formulario */}
        <View style={styles.formContainer}>
          {/* Teléfono */}
          <Text style={styles.label}>Teléfono</Text>
          <TextInput
            style={styles.input}
            placeholder="72138459"
            placeholderTextColor="#6A4E23"
            value={telefono}
            onChangeText={setTelefono}
            keyboardType="phone-pad"
          />

          {/* Nombre y Apellido en fila */}
          <View style={styles.row}>
            <View style={styles.halfInput}>
              <Text style={styles.label}>Nombre</Text>
              <TextInput
                style={styles.input}
                placeholder="Juan"
                placeholderTextColor="#6A4E23"
                value={nombre}
                onChangeText={setNombre}
              />
            </View>
            <View style={styles.halfInput}>
              <Text style={styles.label}>Apellido</Text>
              <TextInput
                style={styles.input}
                placeholder="Pérez"
                placeholderTextColor="#6A4E23"
                value={apellido}
                onChangeText={setApellido}
              />
            </View>
          </View>

        

          <View style={styles.row}>
            <View style={styles.halfInput}>
              <Text style={styles.label}>Correo</Text>  
            <TextInput
              style={styles.input}
              placeholder="correo@gmail.com"
              placeholderTextColor="#6A4E23"
              value={correo}
              onChangeText={setCorreo}
              keyboardType="phone-pad"
            />
            </View>
            <View style={styles.halfInput}>
              <Text style={styles.label}>Genero</Text>
              <View style={styles.pickerContainer}>
                <Picker
                  selectedValue={genero}
                  onValueChange={setGenero}
                  style={styles.picker}>
                  <Picker.Item label="MASCULINO" value="MASCULINO" />
                  <Picker.Item label="FEMENINO" value="Femenino" />
                </Picker>
              </View>
            </View>
          </View>

          {/* Departamento y Municipio en fila */}
          <View style={styles.row}>
            <View style={styles.halfInput}>
              <Text style={styles.label}>Departamento</Text>
              <View style={styles.pickerContainer}>
                <Picker
                  selectedValue={departmento}
                  onValueChange={setDepartmento}
                  style={styles.picker}>
                  {departamentos.map((dept) => (
                    <Picker.Item key={dept.id} label={dept.nombre} value={dept.id} />
                  ))}
                </Picker>
              </View>
            </View>
            <View style={styles.halfInput}>
              <Text style={styles.label}>Municipio</Text>
              <View style={styles.pickerContainer}>
                <Picker
                  selectedValue={municipio}
                  onValueChange={setMunicipio}
                  style={styles.picker}>
                  {filteredMunicipios.map((mun) => (
                                <Picker.Item key={mun.id} label={mun.nombre} value={mun.id} />
                            ))}
                </Picker>
              </View>
            </View>
          </View>

          {/* Distrito */}
          <Text style={styles.label}>Distrito</Text>
          <View style={styles.pickerContainer}>
            <Picker
              selectedValue={distrito}
              onValueChange={setDistrito}
              style={styles.picker}>
              {distritos.map((dist) => (
                        <Picker.Item key={dist.id} label={dist.nombre} value={dist.id} />
                    ))}
            </Picker>
          </View>

          {/* Colonia y Calle en fila */}
          <View style={styles.row}>
            <View style={styles.halfInput}>
              <Text style={styles.label}>Colonia</Text>
              <TextInput
                style={styles.input}
                placeholder="Colonia Escalón"
                placeholderTextColor="#6A4E23"
                value={colonia}
                onChangeText={setColonia}
              />
            </View>
            <View style={styles.halfInput}>
              <Text style={styles.label}>Calle</Text>
              <TextInput
                style={styles.input}
                placeholder="Calle Principal"
                placeholderTextColor="#6A4E23"
                value={calle}
                onChangeText={setCalle}
              />
            </View>
          </View>

          {/* Redes Sociales */}
          <View style={styles.socialMediaContainer}>
            <TouchableOpacity 
              style={styles.radioOption}
              onPress={() => setRed_social('Facebook')}>
              <View style={[styles.radioCircle, red_social === 'Facebook' && styles.radioSelected]}>
                {red_social === 'Facebook' && <View style={styles.radioInner} />}
              </View>
              <Text style={styles.radioText}>Facebook</Text>
            </TouchableOpacity>

            <TouchableOpacity 
              style={styles.radioOption}
              onPress={() => setRed_social('Twitter')}>
              <View style={[styles.radioCircle, red_social === 'Twitter' && styles.radioSelected]}>
                {red_social === 'Twitter' && <View style={styles.radioInner} />}
              </View>
              <Text style={styles.radioText}>X (Twitter)</Text>
            </TouchableOpacity>

            <TouchableOpacity 
              style={styles.radioOption}
              onPress={() => setRed_social('Instagram')}>
              <View style={[styles.radioCircle, red_social === 'Instagram' && styles.radioSelected]}>
                {red_social === 'Instagram' && <View style={styles.radioInner} />}
              </View>
              <Text style={styles.radioText}>Instagram</Text>
            </TouchableOpacity>

            <TouchableOpacity 
              style={styles.radioOption}
              onPress={() => setRed_social('TikTok')}>
              <View style={[styles.radioCircle, red_social === 'TikTok' && styles.radioSelected]}>
                {red_social === 'TikTok' && <View style={styles.radioInner} />}
              </View>
              <Text style={styles.radioText}>TikTok</Text>
            </TouchableOpacity>
          </View>

          {/* Usuario en la Red Social */}
          <Text style={styles.label}>Usuario en la Red Social</Text>
          <TextInput
            style={styles.input}
            placeholder="Juan Perez"
            placeholderTextColor="#6A4E23"
            value={usuario_redes}
            onChangeText={setUsuario_redes}
          />

          <Text style={styles.label}>Contraseña</Text>
          <TextInput
            style={styles.input}
            placeholder="Contraseña"
            placeholderTextColor="#6A4E23"
            value={pass}
            onChangeText={setPass}
          />

          {/* <Text style={styles.label}>Repetir Contraseña</Text>
          <TextInput
            style={styles.input}
            placeholder="Contraseña"
            placeholderTextColor="#6A4E23"
            value={username}
            onChangeText={setUsername}
          /> */}

          {/* Botón de registro */}
          <TouchableOpacity 
            style={styles.registerButton}
            onPress={handleRegister}>
            <Text style={styles.registerButtonText}>Registrarse</Text>
          </TouchableOpacity>

          {/* Enlace para ir a Login */}
          <View style={styles.loginLinkContainer}>
            <Text style={styles.loginLinkText}>¿Ya tienes cuenta? </Text>
            <TouchableOpacity onPress={() => navigation.navigate('Login')}>
              <Text style={styles.loginLinkBold}>Inicia sesión</Text>
            </TouchableOpacity>
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: '#dbac7eff',
  },
  container: {
    flex: 1,
  },
  scrollContent: {
    paddingBottom: 30,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 10,
    marginLeft: 10,
    marginBottom: 20,
  },
  backButton: {
    marginRight: 10,
  },
  headerTitle: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#4B2E0C',
  },
  profileContainer: {
    alignItems: 'center',
    marginBottom: 30,
    position: 'relative',
  },
  profileImage: {
    width: 120,
    height: 120,
    borderRadius: 60,
    backgroundColor: '#9D8364',
  },
  editButton: {
    position: 'absolute',
    bottom: 0,
    right: '35%',
    backgroundColor: '#6A4E23',
    borderRadius: 20,
    width: 40,
    height: 40,
    justifyContent: 'center',
    alignItems: 'center',
  },
  formContainer: {
    paddingHorizontal: 20,
  },
  label: {
    fontSize: 16,
    color: '#4B2E0C',
    marginBottom: 8,
    fontWeight: '500',
  },
  input: {
    backgroundColor: '#C19A6B',
    borderRadius: 12,
    padding: 15,
    fontSize: 16,
    color: '#4B2E0C',
    marginBottom: 20,
  },
  row: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  halfInput: {
    width: '48%',
  },
  pickerContainer: {
    backgroundColor: '#C19A6B',
    borderRadius: 12,
    marginBottom: 20,
    overflow: 'hidden',
  },
  picker: {
    color: '#4B2E0C',
    height: 50,
  },
  socialMediaContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    marginBottom: 20,
  },
  radioOption: {
    flexDirection: 'row',
    alignItems: 'center',
    width: '50%',
    marginBottom: 15,
  },
  radioCircle: {
    width: 24,
    height: 24,
    borderRadius: 12,
    borderWidth: 2,
    borderColor: '#4B2E0C',
    marginRight: 10,
    justifyContent: 'center',
    alignItems: 'center',
  },
  radioSelected: {
    borderColor: '#4B2E0C',
  },
  radioInner: {
    width: 12,
    height: 12,
    borderRadius: 6,
    backgroundColor: '#4B2E0C',
  },
  radioText: {
    fontSize: 16,
    color: '#4B2E0C',
  },
  registerButton: {
    backgroundColor: '#6A4E23',
    borderRadius: 12,
    padding: 15,
    alignItems: 'center',
    marginTop: 10,
    marginBottom: 20,
  },
  registerButtonText: {
    color: '#fff',
    fontSize: 18,
    fontWeight: 'bold',
  },
  loginLinkContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 20,
  },
  loginLinkText: {
    fontSize: 16,
    color: '#4B2E0C',
  },
  loginLinkBold: {
    fontSize: 16,
    color: '#4B2E0C',
    fontWeight: 'bold',
    textDecorationLine: 'underline',
  },
});