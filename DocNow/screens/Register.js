import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View, TouchableOpacity, Image, TextInput, ScrollView } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import React, { useState } from 'react';
import { useNavigation } from '@react-navigation/native';
import DateTimePicker from '@react-native-community/datetimepicker';
import {Picker} from '@react-native-picker/picker';
import { createUserWithEmailAndPassword } from 'firebase/auth';
import { doc, setDoc } from 'firebase/firestore';
import { auth, db } from '../firebaseConfig';

const PrimaryColor = '#0A3B74';

const Register = () => {
  const navigation = useNavigation();
  const [showPassword, setShowPassword] = useState(false);
  const [date, setDate] = useState(new Date());
  const [showDatePicker, setShowDatePicker] = useState(false);

  // register user
  const [name, setName] = useState('');
  const [lastNameP, setLastNameP] = useState('');
  const [lastNameM, setLastNameM] = useState('');
  const [curp, setCurp] = useState('');
  const [sex, setSex] = useState('');
  const [civilStatus, setCivilStatus] = useState('Soltero');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');

  const onChangeDate = (event, selectedDate) => {
    setShowDatePicker(false); 
    if (selectedDate) {
      setDate(selectedDate);
    }
  };

  // alert
  const handleRegister = async () => {
    if (password !== confirmPassword) {
      alert('Las contraseñas no coinciden');
      return;
    }

    try {
      // create user
      const userCredential = await createUserWithEmailAndPassword(
        auth,
        email,
        password
      );

      const uid = userCredential.user.uid;

      // save in firestore
      await setDoc(doc(db, 'users', uid), {
        nombre: name,
        apellidoPaterno: lastNameP,
        apellidoMaterno: lastNameM,
        curp: curp,
        sexo: sex,
        fechaNacimiento: date,
        estadoCivil: civilStatus,
        correo: email,
        telefono: phone,
        createdAt: new Date(),
      });

      alert('Registro exitoso');
      navigation.navigate('Login');

    } catch (error) {
      alert(error.message);
    }
  };

  return (
    <View style={styles.container}>
      <ScrollView contentContainerStyle={styles.scroll}>
        {/*header*/}
        <View style={styles.header}>
          <TouchableOpacity style={styles.backButton} onPress={() => navigation.goBack()}>
            <Ionicons name="arrow-back-outline" size={24} color="black" />
          </TouchableOpacity>

          <Image 
            source={require('../assets/logoDocNow.png')} 
            style={{ width: 40, height: 40, resizeMode: 'contain',}}
          />
        </View>

        {/* Title */}
        <Text style={styles.title}>Registro</Text>
        <Text style={styles.subtitle}>Llena los siguientes campos tal y como aparecen en tus documentos oficiales</Text>

        {/* Form */}
        <View style={styles.form}>
          {/* Name */}
          <Text style={styles.label}>Nombre(s)</Text>
          <TextInput
            style={styles.input}
            value={name}
            onChangeText={setName}
          />

          {/* Last name */}
          <Text style={styles.label}>Apellido Paterno</Text>
          <TextInput
            style={styles.input}
              value={lastNameP}
              onChangeText={setLastNameP}
          />

          {/* Last name */}
          <Text style={styles.label}>Apellido Materno</Text>
          <TextInput
            style={styles.input}
              value={lastNameM}
              onChangeText={setLastNameM}
          />

          {/* CURP */}
          <Text style={styles.label}>CURP</Text>
          <TextInput
            style={styles.input}
            value={curp}
            onChangeText={setCurp}
          />

          {/* Sex */}
          <Text style={styles.label}>Sexo</Text>
          <View style={styles.sexGrid}>
            <TouchableOpacity
              style={[
                styles.sexButton,
                sex === 'Masculino' && { backgroundColor: '#D6E8FF' }
              ]}
              onPress={() => setSex('Masculino')}
            >
              <Image
                source={require('../assets/icon_male.png')}
                style={{ width: 30, height: 30, resizeMode: 'contain' }}
              />
              <Text style={styles.sexButtonText}>Masculino</Text>
            </TouchableOpacity>

            <TouchableOpacity
              style={[
                styles.sexButton,
                sex === 'Femenino' && { backgroundColor: '#D6E8FF' }
              ]}
              onPress={() => setSex('Femenino')}
            >
              <Image
                source={require('../assets/icon_female.png')}
                style={{ width: 30, height: 30, resizeMode: 'contain' }}
              />
              <Text style={styles.sexButtonText}>Femenino</Text>
            </TouchableOpacity>
          </View>

          {/* Date of birth */}
          <Text style={styles.label}>Fecha de nacimiento</Text>
          <TouchableOpacity 
            style={styles.inputDate} 
            onPress={() => setShowDatePicker(true)}
          >
            <Text style={styles.dateText}>
              {date ? date.toLocaleDateString() : 'Selecciona tu fecha'}
            </Text>
          </TouchableOpacity>
          {showDatePicker && (
            <DateTimePicker
              value={date}
              onChangeText={setDate}
              mode="date"
              display="default"
              onChange={onChangeDate}
              maximumDate={new Date()}
            />
          )}

          {/* Civil status */}
          <Text style={styles.label}>Estado civil</Text>
          <View style={styles.pickerContainer}>
            <Picker
              selectedValue={civilStatus}
              style={styles.picker}
              onValueChange={(itemValue) => setCivilStatus(itemValue)}
            >
              <Picker.Item label="Soltero" value="Soltero" />
              <Picker.Item label="Casado" value="Casado" />
              <Picker.Item label="Viudo" value="Viudo" />
            </Picker>
          </View>

          {/* Email */}
          <Text style={styles.label}>Correo electrónico</Text>
          <TextInput
            style={styles.input}
            placeholder="paciente@gmail.com"
            keyboardType="email-address"
            value={email}
            onChangeText={setEmail}
          />

          {/* Phone number */}
          <Text style={styles.label}>Número de teléfono</Text>
          <TextInput
            style={styles.input}
            keyboardType="phone-pad"
            value={phone}
            onChangeText={setPhone}
          />

          {/* Password */}
          <Text style={styles.label}>Contraseña</Text>
          <View style={styles.inputPassword}>
            <TextInput
              style={styles.passwordInput}
              secureTextEntry={!showPassword}
              value={password}
              onChangeText={setPassword}
            />
          </View>

          {/* Confirm password */}
          <Text style={styles.label}>Confirmar contraseña</Text>
          <View style={styles.inputPassword}>
            <TextInput
              style={styles.passwordInput}
              secureTextEntry={!showPassword}
              value={confirmPassword}
              onChangeText={setConfirmPassword}
            />
          </View>

        </View>

        {/* Button */}
        <TouchableOpacity style={styles.button} onPress={handleRegister}>
          <Text style={styles.buttonText}>Siguiente</Text>
        </TouchableOpacity>

        <StatusBar style="auto" />
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  scroll: {
    alignItems: 'center',
    paddingVertical: 60,
  },
  header: {
    width: '100%',
    paddingHorizontal: 20,
    paddingTop: 10,
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 25,
    position: 'relative',
    justifyContent: 'center',
  },
  backButton: {
    position: 'absolute',
    left: 20,
    top: 10,
  },
  title: {
    fontSize: 22,
    fontWeight: 'bold',
    color: PrimaryColor,
    marginBottom: 25,
  },
  subtitle: {
    fontSize: 14,
    color: '#555',
    marginBottom: 5,
    marginTop: 5,
    width: '85%',
    alignContent: 'center',
    textAlign: 'center',
  },
  form: {
    width: '85%',
  },
  label: {
    fontSize: 15,
    color: '#555',
    marginBottom: 5,
    marginTop: 15,
  },
  labelCivil: {
    fontSize: 14,
    color: '#555',
    marginBottom: 5,
    marginTop: 5,
  },
  inputDate: {
    height: 45,
    backgroundColor: '#F2F2F2',
    borderRadius: 10,
    paddingHorizontal: 12,
    borderWidth: 1,
    borderColor: '#CBCBCB',
    justifyContent: 'center',
  },
  dateText: {
    fontSize: 14,
    color: '#000',
  },
  input: {
    height: 45,
    backgroundColor: '#F2F2F2',
    borderRadius: 10,
    paddingHorizontal: 12,
    borderWidth: 1,
    borderColor: '#CBCBCB',
  },
  pickerContainer: {
    height: 45,
    backgroundColor: '#F2F2F2',
    borderRadius: 10,
    borderWidth: 1,
    borderColor: '#CBCBCB',
    justifyContent: 'center',
    overflow: 'hidden',
  },
  picker: {
    height: 50,
    width: '100%',
  },
   inputPassword: {
    flexDirection: 'row',
    alignItems: 'center',
    height: 45,
    backgroundColor: '#F2F2F2',
    borderRadius: 10,
    paddingHorizontal: 12,
    borderWidth: 1,
    borderColor: '#CBCBCB',
  },
  passwordInput: {
    flex: 1,
  },
  sexGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between', 
    alignItems: 'center',
    gap: 10,
  },
  sexButton: {
    marginTop: 10,
    width: "48%",
    backgroundColor: '#F1F1F1',
    padding: 10,
    borderRadius: 10,
    alignItems: "center",
    alignSelf: 'center',
    justifyContent: 'center', 
    marginTop: 7,
    marginBottom: 20,
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 5,
  },
  sexButtonText: {
    color: PrimaryColor,
    // fontWeight: 'bold',
    fontSize: 18,
  },
  button: {
    marginTop: '10%',
    width: '70%',
    backgroundColor: PrimaryColor,
    paddingVertical: 14,
    borderRadius: 12,
    alignItems: 'center',
  },
  buttonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: '600',
  },
});

export default Register;
