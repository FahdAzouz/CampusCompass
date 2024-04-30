// CounslerHome.js
import { Button, StyleSheet, Text, View, Image, TouchableOpacity } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import React, { useState, useEffect } from 'react'
import Icon from 'react-native-vector-icons/FontAwesome';
import { useNavigation } from '@react-navigation/native';
import { FIREBASE_AUTH, FIREBASE_DB } from '../../firebase';
import { getFirestore, doc, getDoc } from 'firebase/firestore';
import { useFocusEffect } from '@react-navigation/native';
import ShortageList from '../CounselorList';

const ManufacturerHome = ({ navigation }) => {
  const [userData, setUserData] = useState(null);
  const fetchUserData = async () => {
    const db = getFirestore();
    const userDocRef = doc(db, 'users', FIREBASE_AUTH.currentUser.uid);
  };

  useEffect(() => {
    fetchUserData();
  }, []);

  useFocusEffect(
    React.useCallback(() => {
      fetchUserData();
    }, [])
  );


  return (
    <SafeAreaView style={styles.Allcontainer}>
      <Image style={styles.image} source={require("../../assets/doctor.png")} />
      <View style={styles.container}>
        <Text style={styles.title}>Welcome to your home page,</Text>

        <Text style={styles.subTitle}>What would you like to do?</Text>
        <View style={styles.buttonContainer}>
          <TouchableOpacity
            style={styles.button}
            onPress={() => navigation.navigate('OrderHistory')}>
            <Text style={styles.buttonText}>Booking History</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.button}
            onPress={() => navigation.navigate('NotificationsList')}>
            <Text style={styles.buttonText}>Notifications List</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.button}
            onPress={() => navigation.navigate('MedicationsList')}>
            <Text style={styles.buttonText}>Session List</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.button}
            onPress={() => navigation.navigate('ShortageList')}>
            <Text style={styles.buttonText}>Counselor List</Text>
          </TouchableOpacity>
        </View>
      </View>
    </SafeAreaView>
  );
};

export default ManufacturerHome;

const styles = StyleSheet.create({
  Allcontainer: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    gap: 1,
  },
  image: {
    width: 300,
    height: 300,
  },
  container: {
    display: "flex",
    width: "100%",
    alignItems: 'center',
  },
  buttonContainer: {
    marginTop: 10,
    flexDirection: 'column',
    justifyContent: 'space-around',
    gap: 10,
    marginBottom: 30,
  },
  button: {
    backgroundColor: '#2dbfc5',
    paddingHorizontal: 80,
    paddingVertical: 10,
    borderRadius: 15,
    width: 'auto'
  },
  buttonText: {
    fontSize: 20,
    color: 'white',
    textAlign: 'center',
    alignContent: 'center',
    textShadowColor: 'black',
    display: 'flex',
  },
  title: {
    justifyContent: 'space-around',
    fontSize: 18,
    alignContent: 'center',
    textShadowColor: 'black',
    display: 'flex',
  },
  subTitle: {
    justifyContent: 'space-around',
    fontSize: 15,
    fontWeight: 'bold',
    alignContent: 'center',
    justifyContent: "center",
    display: 'flex',
    marginBottom: 1,
  },
});
