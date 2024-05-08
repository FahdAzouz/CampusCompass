//AddNewSessionScreen.js
import React, { useState, useEffect } from 'react';
import { View, Text, TextInput, TouchableOpacity, Alert, StyleSheet, ToastAndroid } from 'react-native';
import { getFirestore, collection, addDoc, doc, getDoc } from 'firebase/firestore';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Picker } from '@react-native-picker/picker';
import { useNavigation } from '@react-navigation/native';
import { FIREBASE_AUTH, FIREBASE_DB } from '../../firebase';
import Icon from 'react-native-vector-icons/FontAwesome';
import { useFocusEffect } from '@react-navigation/native';


const AddNewSessionScreen = () => {
  const [name, setName] = useState('');
  const [date, setDate] = useState('');
  const [room, setOffice] = useState('');
  const [selectedAvailability, setAvailability] = useState('available');
  const navigation = useNavigation()

  const user = FIREBASE_AUTH.currentUser;

  const initializeTimeSlots = async (sessionId) => {
    const db = getFirestore();
    const timeSlotsCollection = collection(db, 'available_time', sessionId, 'slots');
    const hours = Array.from({ length: 10 }, (_, i) => 8 + i); // from 8 AM to 6 PM
  
    await Promise.all(hours.map(hour => {
      return addDoc(timeSlotsCollection, {
        time: `${hour}:00`,  // Example: "8:00"
        available: true
      });
    }));
  };

  const AddNewSession = async () => {
    if (name.trim() === '') {
      ToastAndroid.show('Medecine name is required!', ToastAndroid.SHORT);
      return;
    }
    if (date.trim() === '') {
      ToastAndroid.show('Molecule name is required!', ToastAndroid.SHORT);
      return;
    }
    if (room.trim() === '') {
      ToastAndroid.show('Stock is required!', ToastAndroid.SHORT);
      return;
    }
    try {
      const db = getFirestore();
      const sessionCollection = collection(db, 'sessions');
      const docRef = await addDoc(sessionCollection, {
        name: name,  // Original name for display
        name_lower: name.toLowerCase(),  // Lowercase name for searching
        date,
        room,
        status: selectedAvailability,
        userId: user.uid,
      });
      await initializeTimeSlots(docRef.id);
      navigation.navigate('CounselorList')
      Alert.alert('Success', 'New session added successfully');
    } catch (error) {
      console.error('Error adding new medicine:', error.message);
      Alert.alert('Error', 'Failed to add new medicine');
    }
  };

  return (
    <SafeAreaView style={styles.Allcontainer}>
      <Text style={styles.title}>Add New Session</Text>
      <View style={styles.container}>
        <View style={styles.inputContainer}>
          <TextInput value={name} onChangeText={text => setName(text)} placeholder='Name' style={styles.input} />
          <TextInput value={date} onChangeText={text => setDate(text)} placeholder='Date' style={styles.input} />
          <TextInput value={room} onChangeText={text => setOffice(text)} placeholder='Room' style={styles.input} />
          <View style={{ borderRadius: 50, backgroundColor: 'white', width: '100%' }}>
            <Picker
              selectedValue={selectedAvailability}
              onValueChange={(itemValue) => setAvailability(itemValue)}
            >
              <Picker.Item label="Available" value="Available" />
              <Picker.Item label="Unavailable" value="Unavailable" />
            </Picker>
          </View>

          <TouchableOpacity style={styles.button} onPress={AddNewSession}>
            <Text style={styles.buttonText}>Add Session</Text>
          </TouchableOpacity>
        </View>
      </View>
      <View >
        <TouchableOpacity onPress={() => navigation.navigate('MedicationsList')} style={styles.backButton}>
          <Icon name="arrow-left" size={24} color="white" />
          <Text style={styles.navTitle}>List</Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  Allcontainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    gap: 30
  },
  navigationBar: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#2dbfc5', // Change the background color as per your preference
    paddingHorizontal: 16,
    height: 60, // Adjust the height based on your design
    borderBottomWidth: 1,
    borderBottomColor: 'black', // Change the border color as per your preference
  },
  backButton: {
    marginRight: 10,
    borderRadius: 50,
    display: "flex",
    flexDirection: "row",
    gap: 10,
    padding: 20,
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 16,
    backgroundColor: "#416285"
  },
  navTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: 'white', // Change the text color as per your preference
  },
  container: {
    display: "flex",
    width: "100%",
    alignItems: 'center'
  },
  title: {
    fontSize: 35,
    alignContent: 'center',
    fontWeight: 'bold',
    textShadowColor: 'black'
  },
  inputContainer: {
    width: "80%",
    display: "flex",
    gap: 12,
    marginBottom: 20
  },
  input: {
    backgroundColor: "white",
    paddingHorizontal: 15,
    paddingVertical: 10,
    borderRadius: 20
  },
  buttonContainer: {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: "center",
    gap: 10
  },
  buttonText: {
    color: "white",
    fontWeight: "bold",
    alignContent: 'center',
    textAlign: 'center'
  },
  button: {
    backgroundColor: '#EFCD52',
    paddingHorizontal: 30,
    paddingVertical: 10,
    borderRadius: 50
  }
})
export default AddNewSessionScreen;
