// NotificationsListScreen.js
import React, { useEffect, useState } from 'react';
import { View, Text, FlatList, StyleSheet, TouchableOpacity } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { getFirestore, collection, getDocs, query, where, updateDoc, doc } from 'firebase/firestore';
import { SafeAreaView } from 'react-native-safe-area-context';
import { FIREBASE_AUTH, FIREBASE_DB } from '../../firebase';
import { useFocusEffect } from '@react-navigation/native';
import Icon from 'react-native-vector-icons/FontAwesome';

const NotificationsListScreen = () => {
  const [cartItems, setCartItems] = useState([]);
  const navigation = useNavigation();

  useEffect(() => {
    fetchSessions();
  }, []);
  
  useFocusEffect(
    React.useCallback(() => {
      fetchSessions();
    }, [])
  );

  const fetchSessions = async () => {
    const db = getFirestore();
    const sessionRef = collection(db, 'sessions');
    try {
      const q = query(sessionRef, where('userId', '==', FIREBASE_AUTH.currentUser.uid));
      const querySnapshot = await getDocs(q);
      const sessions = querySnapshot.docs.map(doc => ({
        id: doc.id,
        ...doc.data()
      }));
      setCartItems(sessions);
    } catch (error) {
      console.error('Error fetching sessions:', error.message);
    }
  };

  const getStyleForValue = (value) => {
    let textStyle;
  
    switch(value.toLowerCase()) {
      case 'available':
        textStyle = styles.styleForValue1;
        break;
      case 'not available':
        textStyle = styles.styleForValue0;
        break;
      default:
        textStyle = styles.styleForValue2;
    }
  
    return textStyle;
  };

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.container}>
        <Text style={styles.title}>Notifications</Text>
        {cartItems.length > 0 ? (
          <View style={{ flex: 1 }}>
            <FlatList
            data={cartItems}
            keyExtractor={(item) => item.id}
            renderItem={({ item }) => (
              <View style={[styles.cartItem, getStyleForValue(item.status)]}>
                <Text style={{ fontWeight: 'bold' }}>Name: {item.name}</Text>
                <Text style={{ fontWeight: 'bold' }}>Room: {item.room}</Text>
                <Text>Status: {item.status}</Text>
              </View>
            )}
          />
          </View>
        ) : (
          <Text style={styles.emptyText}>There is no notification</Text>
        )}

      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',  // Adjust alignment to 'center'
    justifyContent: 'flex-start',  // Start items from the top of the screen
    paddingHorizontal: 20,
    paddingTop: 20,  // Provide some padding at the top
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,  // Increase bottom margin to separate title from list
  },
  cartItem: {
    width: "100%",
    borderWidth: 1,
    borderRadius: 10,  // Adjusted for aesthetic preference
    borderColor: '#ccc',  // Make border color consistent
    padding: 15,
    marginVertical: 8,
    flexDirection: 'row',
    justifyContent: 'space-between',  // Distribute space between items
  },
  styleForValue0: {
    backgroundColor: '#ffebee',  // Light red background for clarity
    borderWidth: 1,
    borderColor: 'red',
  },
  styleForValue1: {
    backgroundColor: '#e8f5e9',  // Light green background for clarity
    borderWidth: 1,
    borderColor: 'green',
  },
  styleForValue2: {
    backgroundColor: '#fff3e0',  // Light orange background for clarity
    borderWidth: 1,
    borderColor: 'orange',
  },
  emptyText: {
    fontSize: 18,
    color: 'gray',
    marginTop: 50,  // Center this text more in the view
  },
});

export default NotificationsListScreen;
