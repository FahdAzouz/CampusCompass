//welcome.js
import React, { useState } from 'react';
import { StyleSheet, Text, View, Image, TouchableOpacity, Modal, ScrollView } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useNavigation } from '@react-navigation/native';

const Welcome = () => {
  const navigation = useNavigation();
  const [aboutModalVisible, setAboutModalVisible] = useState(false);

  const handleAboutPress = () => {
    setAboutModalVisible(true);
  };

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.welcome}>
        <Text style={styles.Maintitle}>Welcome To</Text>
        <Image style={styles.image} source={require('../assets/logo.png')} />
        <View style={styles.buttonContainer}>
          <TouchableOpacity onPress={() => navigation.navigate('Login')} style={styles.button}>
            <Text style={styles.buttonText}>Login</Text>
          </TouchableOpacity>
          <View style={styles.signupTextContainer}>
            <Text>You don't have an Account?</Text>
            <TouchableOpacity onPress={() => navigation.navigate('Register')}>
              <Text style={styles.signupText}>Sign Up</Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>
      <TouchableOpacity style={styles.aboutButton} onPress={() => setAboutModalVisible(true)}>
        <Text style={styles.aboutButtonText}>About</Text>
      </TouchableOpacity>
      <Modal animationType="slide" transparent={true} visible={aboutModalVisible}>
        <View style={styles.modalContainer}>
          <ScrollView style={styles.modalContent}>
            <Text style={styles.title}>About Our Counseling App</Text>
            <View style={styles.aboutContent}>
              <Text style={styles.about}>Welcome to CampusCompass, your dedicated portal for streamlined counseling services at Al Akhawayn University. Designed to support the well-being of our university community (Student, Faculty and Staff).</Text>
              <Text style={styles.about}>CampusCompass offers an intuitive platform for both students and counselors, facilitating easy access to mental health resources. It is more than just a booking app—it's a gateway to healthier, more fulfilled university life. We are committed to providing a safe, responsive, and supportive environment to help you navigate your time at Al Akhawayn University with confidence and ease.</Text>
            </View>
            <TouchableOpacity onPress={() => setAboutModalVisible(false)} style={styles.closeButton}>
              <Text style={styles.closeButtonText}>Close</Text>
            </TouchableOpacity>
          </ScrollView>
        </View>
      </Modal>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: 'white', // Ocean Blue Background
    flex: 1,
  },
  welcome: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'space-around',
    position: 'relative', // Add position property
    top: 30,
  },
  about: {
    fontSize: 19,
    fontFamily: "Gill Sans",
  },
  aboutContent: {
    marginTop: 50,

  },
  title: {
    // Text color for better readability
    fontWeight: 'bold',
    fontSize: 30,
  },
  Maintitle: {
    color: '#EFCD52', // Text color for better readability
    fontWeight: 'bold',
    fontSize: 30,
  },
  image: {
    width: 300,
    height: 300,
  },
  buttonContainer: {
    display: 'flex',
    width: '100%',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 10,
  },
  button: {
    backgroundColor: '#EFCD52', // Lighter Shade of yellow for Buttons
    width: '60%',
    padding: 15,
    borderRadius: 25,
    alignItems: 'center',
    justifyContent: 'center',
  },
  buttonText: {
    color: 'white',
    fontWeight: 'bold',
    fontSize: 20,
  },
  signupTextContainer: {
    flexDirection: 'row',
    gap: 3,
  },
  signupText: {
    color: '#416285', // Soft Ocean Blue for Sign Up Text
  },
  aboutButton: {
    position: 'absolute',
    top: 60,
    right: 16,
    padding: 8,
    backgroundColor: '#EFCD52', //soft brown
    borderRadius: 50,
    paddingVertical: 12,
    paddingHorizontal: 15,
  },
  aboutButtonText: {
    color: 'white',
    fontWeight: 'bold',
  },

  modalContainer: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    justifyContent: 'center',
    alignItems: 'center',
    paddingVertical: 80,
  },
  modalContent: {
    backgroundColor: 'white',
    padding: 20,
    borderRadius: 10,
    maxHeight: '80%',
    width: '80%',
    fontFamily: 'monospace',
    fontSize: 30,
    lineHeight: 50,
  },
  closeButton: {
    backgroundColor: 'white',
    padding: 10,
    borderRadius: 8,
    marginTop: 15,
    alignItems: 'center',
    justifyContent: 'space-around',
    marginBottom: 30,
  },
  closeButtonText: {
    color: 'white', // A deep ocean blue for strong contrast
    fontWeight: 'bold', // Make text stand out
    fontSize: 18, // Sufficient size for easy readability
    textAlign: 'center', // Center the text for aesthetics
    padding: 10, // Add some padding for touchability
    backgroundColor: 'black', // A softer, lighter blue for the button background
    borderRadius: 20, // Rounded corners for a modern, friendly look
    overflow: 'hidden', // Ensure the background doesn't bleed outside the border radius
    marginTop: 20, // Space from the top for better layout
  }
});

export default Welcome;