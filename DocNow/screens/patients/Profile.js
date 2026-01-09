import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View, Image, TouchableOpacity, TextInput, Alert } from 'react-native';
import React, { useState, useEffect  } from 'react';
import { Ionicons } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';
import Login from  '../Login';
import { auth, db } from '../../firebaseConfig';
import { doc, getDoc, updateDoc } from 'firebase/firestore';

const PrimaryColor = "#0A3B74";
const DangerColor = "#8B0000";

const defaultImage = "https://imgs.search.brave.com/MlqCP-S9mDSWE9l9yMNnR7cC-8BFzYmtcAZZ6l-8dU0/rs:fit:860:0:0:0/g:ce/aHR0cHM6Ly9tYXJr/ZXRwbGFjZS5jYW52/YS5jb20vaWI0SUUv/TUFGMVAyaWI0SUUv/MS90bC9jYW52YS1w/cm9maWxlLXBpY3R1/cmUtYmxvY2stc3R5/bGUtaWNvbi1NQUYx/UDJpYjRJRS5wbmc";

const Profile = ({ onLogout }) => {
  const navigation = useNavigation();
  const [editMode, setEditMode] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [showNewPassword, setShowNewPassword] = useState(false);

  // user
  const [user, setUser] = useState({
    nombre: "",
    correo: "",
    contraseña: "",
    telefono: "",
    image: "https://imgs.search.brave.com/-QlOJZyWyUVMnRffakwLvvFi5NlMcWVcb_4v6MgFZGI/rs:fit:860:0:0:0/g:ce/aHR0cHM6Ly9tZWRp/YS5pc3RvY2twaG90/by5jb20vaWQvMTQ5/NTA4ODA0My9lcy92/ZWN0b3IvaWNvbm8t/ZGUtcGVyZmlsLWRl/LXVzdWFyaW8tYXZh/dGFyLW8taWNvbm8t/ZGUtcGVyc29uYS1m/b3RvLWRlLXBlcmZp/bC1zJUMzJUFEbWJv/bG8tZGUtcmV0cmF0/by5qcGc_cz02MTJ4/NjEyJnc9MCZrPTIw/JmM9bVkzZ25qMmxV/N2toZ0xoVjZkUUJO/cW9tRUdqM2F5V0gt/eHRwWXVDWHJ6az0"
  });

  // Bring data to the screen
  useEffect(() => {
    const fetchUser = async () => {
      const userDoc = doc(db, "users", auth.currentUser.uid);
      const docSnap = await getDoc(userDoc);

      if (docSnap.exists()) {
        setUser(docSnap.data());
      } else {
        console.log("No such document!");
      }
    };

    fetchUser();
  }, []);

  // save changes on firestore
  const saveChanges = async () => {
    try {
      const userRef = doc(db, "users", auth.currentUser.uid);
      await updateDoc(userRef, user);
      Alert.alert("Éxito", "Tus cambios se guardaron correctamente");
      setEditMode(false);
    } catch (error) {
      console.error("Error updating document: ", error);
      Alert.alert("Error", "No se pudieron guardar los cambios");
    }
  };

  return (
    <View style={styles.container}>

      <View style={styles.imageContainer}>
        <Image 
          source={{ uri: user.image || defaultImage }} 
          style={styles.profileImage} 
        />

        {editMode && (
          <TouchableOpacity style={styles.editLabel}>
            <Text style={{ color: "#fff", fontWeight: "600" }}>Editar</Text>
          </TouchableOpacity>
        )}
      </View>

      {/*name*/}
      {!editMode && (
        <Text style={styles.profileName}>{user.nombre}</Text>
      )}

      {/*form*/}
      <View style={styles.form}>

        {/*email*/}
        <Text style={styles.label}>Correo electrónico</Text>
        <TextInput
          style={styles.input}
          value={user.correo}
          editable={editMode}
          onChangeText={(text) => setUser({ ...user, correo: text })}
        />

        {/*password*/}
        <Text style={styles.label}>{editMode ? "Contraseña Actual" : "Contraseña"}</Text>
        <View style={styles.inputPassword}>
          <TextInput
            style={{ flex: 1 }}
            placeholder='********'
            secureTextEntry={!showPassword}
            value={user.contraseña}
            editable={editMode}
            onChangeText={(text) => setUser({ ...user, contraseña: text })}
          />
          <TouchableOpacity onPress={() => setShowPassword(!showPassword)}>
            <Ionicons name={showPassword ? "eye" : "eye-off"} size={22} color={PrimaryColor} />
          </TouchableOpacity>
        </View>

        {/*change password */}
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

        {/*phone*/}
        <Text style={styles.label}>Número telefónico</Text>
        <TextInput
          style={styles.input}
          value={user.telefono}
          editable={editMode}
          onChangeText={(text) => setUser({ ...user, telefono: text })}
        />
      </View>

      {/*buttoms*/}
      {!editMode ? (
        <>
          <TouchableOpacity style={styles.editButton} onPress={() => setEditMode(true)}>
            <Text style={styles.editButtonText}>Editar</Text>
          </TouchableOpacity>

          <TouchableOpacity style={styles.logoutButton} onPress={onLogout}>
            <Text style={styles.logoutButtonText}>Cerrar sesión</Text>
          </TouchableOpacity>
        </>
      ) : (
        <>
          <TouchableOpacity style={styles.saveButton} onPress={saveChanges}>
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