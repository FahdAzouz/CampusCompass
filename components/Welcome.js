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
        <Text style={styles.title}>Welcome To</Text>
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
      <TouchableOpacity style={styles.aboutButton} onPress={handleAboutPress}>
        <Text style={styles.aboutButtonText}>About</Text>
      </TouchableOpacity>
      <Modal animationType="slide" transparent={true} visible={aboutModalVisible}>
        <View style={styles.modalContainer}>
          <ScrollView style={styles.modalContent}>
            {/* Modal Content Here */}
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
    backgroundColor: '#FFFAFA', // Ocean Blue Background
    flex: 1,
  },
  welcome: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'space-around',
    position: 'relative', // Add position property
    top: 30,
  },
  title: {
    color: '#48CAE4', // Text color for better readability
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
    backgroundColor: '#48CAE4', // Lighter Shade of Ocean Blue for Buttons
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
    color: '#90E0EF', // Soft Ocean Blue for Sign Up Text
  },
  aboutButton: {
    position: 'absolute',
    top: 60,
    right: 16,
    padding: 8,
    backgroundColor: '#48CAE4',
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
  },
  modalContent: {
    backgroundColor: 'white',
    padding: 20,
    borderRadius: 10,
    maxHeight: '80%',
    width: '80%',
  },
  closeButton: {
    backgroundColor: 'white',
    padding: 10,
    borderRadius: 8,
    marginTop: 20,
    alignItems: 'center',
    justifyContent: 'space-around',
    marginBottom: 30,
  },
  closeButtonText: {
    color: '#03045E', // A deep ocean blue for strong contrast
    fontWeight: 'bold', // Make text stand out
    fontSize: 18, // Sufficient size for easy readability
    textAlign: 'center', // Center the text for aesthetics
    padding: 10, // Add some padding for touchability
    backgroundColor: '#90E0EF', // A softer, lighter blue for the button background
    borderRadius: 20, // Rounded corners for a modern, friendly look
    overflow: 'hidden', // Ensure the background doesn't bleed outside the border radius
    marginTop: 20, // Space from the top for better layout
  }
});

export default Welcome;