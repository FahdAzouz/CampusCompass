import React, { useState } from 'react';
import { ScrollView, StyleSheet, Text, TextInput, TouchableOpacity, View, Image } from 'react-native';
import { Picker } from '@react-native-picker/picker';
import { createUserWithEmailAndPassword } from 'firebase/auth';
import { useNavigation } from '@react-navigation/native';
import { doc, setDoc } from 'firebase/firestore';
import { FIREBASE_AUTH, FIREBASE_DB } from '../firebase';
import Toast from 'react-native-toast-message';

const Register = () => {
  const db = FIREBASE_DB;
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [fullName, setFullName] = useState('');
  const [companyName, setCompanyName] = useState('');
  const [selectedRole, setSelectedRole] = useState('student');
  const auth = FIREBASE_AUTH;
  const navigation = useNavigation();

  const signUp = async () => {
    if (password !== confirmPassword) {
      Toast.show({ type: 'error', text1: 'Passwords do not match!' });
      return;
    }

    if (fullName.trim() === '') {
      showToast('Full Name is required!');
      return;
    }


    try {
      const userCredential = await createUserWithEmailAndPassword(FIREBASE_AUTH, email, password);
      const user = userCredential.user;
      const userDocRef = doc(FIREBASE_DB, 'users', user.uid);

      await setDoc(userDocRef, {
        fullName: fullName,
        email: email,
        role: selectedRole,
      });

      showToast('You are registered successfully!');
    } catch (error) {
      console.log(error);
      alert(error.message);
    }
  };

  const showToast = (message) => {
    Toast.show({ type: 'error', text1: message });
  };

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Image style={styles.logo} source={require('../assets/register-user.png')} />
      <View style={styles.inputContainer}>
        <TextInput
          value={fullName}
          onChangeText={(text) => setFullName(text)}
          placeholder="First Name"
          style={styles.input}
        />
        <TextInput
          value={companyName}
          onChangeText={(text) => setCompanyName(text)}
          placeholder="Last Name"
          style={styles.input}
        />
        <TextInput value={email} onChangeText={(text) => setEmail(text)} placeholder="Email" style={styles.input} />
        <TextInput
          value={password}
          onChangeText={(text) => setPassword(text)}
          placeholder="Password"
          secureTextEntry
          style={styles.input}
        />
        <TextInput
          value={confirmPassword}
          onChangeText={(text) => setConfirmPassword(text)}
          placeholder="Confirm Password"
          secureTextEntry
          style={styles.input}
        />
        <View style={styles.pickerContainer}>
          <Picker selectedValue={selectedRole} onValueChange={(itemValue) => setSelectedRole(itemValue)}>
            <Picker.Item label="Student" value="Student" />
            <Picker.Item label="Counselor" value="Counselor" />
          </Picker>
        </View>
      </View>
      <View style={styles.buttonContainer}>
        <TouchableOpacity onPress={signUp} style={styles.button}>
          <Text style={styles.buttonText}>Register</Text>
        </TouchableOpacity>
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#FDF9F6', // Changed to snow background color
  },
  logo: {
    width: 80,
    height: 80,
  },
  inputContainer: {
    color: 'white',
    width: '80%',
    marginTop: 20,
  },
  input: {
    backgroundColor: 'white',
    paddingHorizontal: 15,
    paddingVertical: 10,
    borderRadius: 50,
    marginVertical: 10,
  },
  pickerContainer: {
    borderRadius: 50,
    backgroundColor: 'white',
    width: '100%',
  },
  buttonContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 20,
  },
  buttonText: {
    color: '#EFCD52',
    fontWeight: 'bold',
  },
  button: {
    backgroundColor: 'white',
    paddingHorizontal: 30,
    paddingVertical: 10,
    borderRadius: 50,
    borderColor: '#EFCD52',
    borderWidth: 1,
  },
});

export default Register;
