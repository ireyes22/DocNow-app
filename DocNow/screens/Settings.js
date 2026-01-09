import React from "react";
import {useState} from 'react';
import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View, TouchableOpacity, Image, TextInput, ScrollView, Switch } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';

const PrimaryColor = '#0A3B74';

const  Settings = () => {
  const navigation = useNavigation();

  const [settings, setSettings] = useState({
    notifications: false,
    vibration: false,
    email: false,
    sound: false,
  });

  const toggleSetting = (key) => {
    setSettings(prev => ({
      ...prev,
      [key]: !prev[key],
    }));
  };

  return(

    <View style={styles.container}>
      {/*header*/}
      <View style={styles.header}>
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <Ionicons name="arrow-back-outline" size={24} color="black" />
        </TouchableOpacity>
      </View>

      <Text style={styles.textDoctors}>Ajustes</Text>

      <View>
        {/*notifications*/}
        <View style={styles.settingItem}>
          <View style={styles.leftContent}>
            <Ionicons name="notifications-outline" size={24} color={PrimaryColor} />
            <Text style={styles.textSettings}>Notificaciones</Text>
          </View>

          <Switch style={styles.switchItem}
            trackColor={{false: '#767577', true: PrimaryColor}}
            thumbColor={settings.notifications ? '#fff' : '#f4f3f4'}
            ios_backgroundColor="#3e3e3e"
            onValueChange={() => toggleSetting('notifications')}
            value={settings.notifications}
          />
        </View>

        {/*vibration*/}
        <View style={styles.settingItem}>
          <View style={styles.leftContent}>
            <Ionicons name="phone-portrait-outline" size={24} color={PrimaryColor} />
            <Text style={styles.textSettings}>Vibración</Text>
          </View>

          <Switch
            style={styles.switchItem}
            trackColor={{false: '#767577', true: PrimaryColor}}
            thumbColor={settings.vibration ? '#fff' : '#f4f3f4'}
            ios_backgroundColor="#3e3e3e"
            onValueChange={() => toggleSetting('vibration')}
            value={settings.vibration}
          />
        </View>

        {/*email*/}
        <View style={styles.settingItem}>
          <View style={styles.leftContent}>
            <Ionicons name="mail-outline" size={24} color={PrimaryColor} />
            <Text style={styles.textSettings}>Correo Electrónico</Text>
          </View>

          <Switch
            style={styles.switchItem}
            trackColor={{false: '#767577', true: PrimaryColor}}
            thumbColor={settings.email ? '#fff' : '#f4f3f4'}
            ios_backgroundColor="#3e3e3e"
            onValueChange={() => toggleSetting('email')}
            value={settings.email}
          />
        </View>

        {/*sound*/}
        <View style={styles.settingItem}>
          <View style={styles.leftContent}>
          <Ionicons name="volume-high-outline" size={24} color={PrimaryColor} />
          <Text style={styles.textSettings}>Sonido</Text>
          </View>

          <Switch
            style={styles.switchItem}
            trackColor={{false: '#767577', true: PrimaryColor}}
            thumbColor={settings.sound  ? '#fff' : '#f4f3f4'}
            ios_backgroundColor="#3e3e3e"
            onValueChange={() => toggleSetting('sound')}
            value={settings.sound}
          />
        </View>

      </View>

    </View>

)};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
  },
  header: {
    width: '100%',
    paddingHorizontal: 20,
    paddingTop: 50, 
    flexDirection: 'row',
    justifyContent: 'space-between', 
    alignItems: 'center',
    marginBottom: 20,
  },
  textDoctors: {
    fontSize: 22,
    fontWeight: 'bold',
    marginRight: 10,
    color: PrimaryColor,
    // alignItems: 'center',
    // justifyContent: 'center',
    marginBottom: 20,
  },
  settingItem: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingVertical: 12,
    paddingHorizontal: 20,
    borderBottomWidth: 1,
    borderBottomColor: '#eee',
    gap: '20%',
  },
  leftContent: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 20,
  },
  textSettings: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#000',
    marginLeft: 10,
  },
}); 

export default Settings;