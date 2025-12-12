import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View, Image, TouchableOpacity, TextInput } from 'react-native';
import React, { useState } from 'react';
import { Ionicons } from '@expo/vector-icons';

const PrimaryColor = "#0A3B74";
const DangerColor = "#8B0000";

const Profile = () => {
  const [editMode, setEditMode] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [showNewPassword, setShowNewPassword] = useState(false);

  // usuario
  const [user, setUser] = useState({
    name: "Abigil Luna Rivera",
    email: "ejemplo@gmail.com",
    password: "admin123",
    phone: "123 111 222",
    image: "https://media.glamour.mx/photos/66db363f957a01ed1cc7b4eb/16:9/w_2560%2Cc_limit/Mujer%2520sonriendo.png"
  });

  return (
    <View style={styles.container}>

      <View style={styles.imageContainer}>
        <Image source={{ uri: user.image }} style={styles.profileImage} />

        {editMode && (
          <TouchableOpacity style={styles.editLabel}>
            <Text style={{ color: "#fff", fontWeight: "600" }}>Editar</Text>
          </TouchableOpacity>
        )}
      </View>

      {/*nombre*/}
      {!editMode && (
        <Text style={styles.profileName}>{user.name}</Text>
      )}

      {/*formulario*/}
      <View style={styles.form}>

        {/*correo*/}
        <Text style={styles.label}>Correo electrónico</Text>
        <TextInput
          style={styles.input}
          value={user.email}
          editable={editMode}
        />

        {/*contraseña actual*/}
        <Text style={styles.label}>{editMode ? "Contraseña Actual" : "Contraseña"}</Text>
        <View style={styles.inputPassword}>
          <TextInput
            style={{ flex: 1 }}
            placeholder='********'
            secureTextEntry={!showPassword}
            value={user.password}
            editable={editMode}
          />
          <TouchableOpacity onPress={() => setShowPassword(!showPassword)}>
            <Ionicons name={showPassword ? "eye" : "eye-off"} size={22} color={PrimaryColor} />
          </TouchableOpacity>
        </View>

        {/*editar nueva contraseña */}
        {editMode && (
          <>
            <Text style={styles.label}>Nueva contraseña</Text>
            <View style={styles.inputPassword}>
              <TextInput
                style={{ flex: 1 }}
                secureTextEntry={!showNewPassword}
                placeholder="********"
              />
              <TouchableOpacity onPress={() => setShowNewPassword(!showNewPassword)}>
                <Ionicons name={showNewPassword ? "eye" : "eye-off"} size={22} color = {PrimaryColor}/>
              </TouchableOpacity>
            </View>
          </>
        )}

        {/*telefono*/}
        <Text style={styles.label}>Número telefónico</Text>
        <TextInput
          style={styles.input}
          value={user.phone}
          editable={editMode}
        />
      </View>

      {/*botones*/}
      {!editMode ? (
        <>
          <TouchableOpacity style={styles.editButton} onPress={() => setEditMode(true)}>
            <Text style={styles.editButtonText}>Editar</Text>
          </TouchableOpacity>

          <TouchableOpacity style={styles.logoutButton}>
            <Text style={styles.logoutButtonText}>Cerrar sesión</Text>
          </TouchableOpacity>
        </>
      ) : (
        <>
          <TouchableOpacity style={styles.saveButton} onPress={() => setEditMode(false)}>
            <Text style={styles.saveButtonText}>Guardar</Text>
          </TouchableOpacity>

          <TouchableOpacity style={styles.cancelButton} onPress={() => setEditMode(false)}>
            <Text style={styles.cancelButtonText}>Cancelar</Text>
          </TouchableOpacity>
        </>
      )}

      <StatusBar style="auto" />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    paddingTop: '15%' ,
  },
  imageContainer: {
    position: "relative",
    marginBottom: 10,
  },
  profileImage: {
    width: 150,
    height: 150,
    borderRadius: 120,
  },
  editLabel: {
    width: 150,
    height: 150,
    borderRadius: 120,
    position: "absolute",
    alignSelf: "center",
    backgroundColor: "rgba(0,0,0,0.6)",
    padding: 10,
    alignItems: "center",
    justifyContent: "center",
  },
  profileName: {
    fontSize: 22,
    fontWeight: "700",
    marginBottom: 20,
  },
  form: {
    width: "90%",
  },
  label: {
    fontSize: 14,
    color: "#555",
    marginTop: 10,
  },
  input: {
    backgroundColor: "#F2F2F2",
    padding: 12,
    borderRadius: 8,
    marginTop: 5,
    borderWidth: 1,
    borderColor: "#CBCBCB",
  },
  inputPassword: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#F2F2F2",
    padding: 3,
    paddingLeft: 8,
    paddingRight: 8,
    borderRadius: 8,
    marginTop: 5,
    borderWidth: 1,
    borderColor: "#CBCBCB",
  },
  editButton: {
    marginTop: 25,
    width: "90%",
    backgroundColor: PrimaryColor,
    padding: 15,
    borderRadius: 10,
    alignItems: "center",
  },
  editButtonText: {
    color: "#fff",
    fontSize: 18,
    fontWeight: "600",
  },
  logoutButton: {
    marginTop: 15,
    width: "90%",
    borderRadius: 10,
    padding: 15,
    borderWidth: 2,
    borderColor: DangerColor,
    alignItems: "center",
  },
  logoutButtonText: {
    color: DangerColor,
    fontSize: 18,
    fontWeight: "600",
  },
  saveButton: {
    marginTop: 25,
    width: "90%",
    backgroundColor: PrimaryColor,
    padding: 15,
    borderRadius: 10,
    alignItems: "center",
  },
  saveButtonText: {
    color: "#fff",
    fontSize: 18,
    fontWeight: "600",
  },
  cancelButton: {
    marginTop: 15,
    width: "90%",
    padding: 15,
    borderRadius: 10,
    borderWidth: 2,
    borderColor: PrimaryColor,
    alignItems: "center",
  },
  cancelButtonText: {
    color: PrimaryColor,
    fontSize: 18,
    fontWeight: "600",
  }
});

export default Profile;