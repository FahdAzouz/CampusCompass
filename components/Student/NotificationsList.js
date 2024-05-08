// NotificationsList.js
import React, { useEffect, useState } from 'react';
import { View, Text, FlatList, StyleSheet, TouchableOpacity } from 'react-native';
import { getFirestore, collection, getDocs, query, deleteDoc, doc } from 'firebase/firestore';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useNavigation } from '@react-navigation/native';

const NotificationsList = () => {
  const [cartItems, setCartItems] = useState([]);
  const navigation = useNavigation();

  useEffect(() => {
    fetchSessions();
  }, []);

  const fetchSessions = async () => {
    const db = getFirestore();
    const sessionRef = collection(db, 'sessions');
    try {
      const q = query(sessionRef);
      const querySnapshot = await getDocs(q);
      const sessions = querySnapshot.docs.map(doc => ({
        id: doc.id,
        ...doc.data(),
        isAccepted: false  // Add a flag to track if a notification is accepted
      }));
      setCartItems(sessions);
    } catch (error) {
      console.error('Error fetching sessions:', error.message);
    }
  };
  

  const handleDelete = async (id) => {
    // Implement deletion logic here
    const db = getFirestore();
    const docRef = doc(db, 'sessions', id);
    await deleteDoc(docRef);
    setCartItems(prevItems => prevItems.filter(item => item.id !== id));
  };

  const handleAccept = (id) => {
    // Update local state to mark the item as accepted
    navigation.navigate('TimeSlotsScreen', { sessionId: id });
    setCartItems(prevItems => prevItems.map(item => {
      if (item.id === id) {
        return { ...item, isAccepted: true };
      }
      return item;
    }));
  };

  const getStyleForValue = (status) => {
    switch(status.toLowerCase()) {
      case 'available':
        return styles.available;
      case 'unavailable':
        return styles.unavailable;
      default:
        return {};
    }
  };

  const renderItem = ({ item }) => (
    <View style={[styles.cartItem, getStyleForValue(item.status)]}>
      <View style={styles.itemInfo}>
        <Text style={styles.itemText}>Name: {item.name}</Text>
        <Text style={styles.itemText}>Room: {item.room}</Text>
        <Text style={styles.itemText}>Status: {item.status}</Text>
      </View>
      {!item.isAccepted && (
        <View style={styles.actions}>
          <TouchableOpacity style={styles.buttonAccept} onPress={() => handleAccept(item.id)}>
            <Text style={styles.buttonText}>Accept</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.buttonDelete} onPress={() => handleDelete(item.id)}>
            <Text style={styles.buttonText}>Delete</Text>
          </TouchableOpacity>
        </View>
      )}
    </View>
  );

  return (
    <SafeAreaView style={styles.container}>
      <Text style={styles.title}>Notifications</Text>
      <FlatList
        data={cartItems}
        keyExtractor={(item) => item.id}
        renderItem={renderItem}
      />
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'flex-start',
    paddingHorizontal: 20,
    paddingTop: 20,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
  },
  cartItem: {
    flexDirection: 'column',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 10,
    marginVertical: 8,
    borderWidth: 1,
    borderRadius: 10,
    borderColor: '#ccc',
    backgroundColor: '#f9f9f9',
  },
  itemInfo: {
    flex: 3,
  },
  actions: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  itemText: {
    fontSize: 16,
  },
  buttonAccept: {
    backgroundColor: '#EFCD52',
    padding: 10,
    borderRadius: 5,
    marginHorizontal: 5,
    marginTop: 10,
  },
  buttonDelete: {
    backgroundColor: 'red',
    padding: 10,
    borderRadius: 5,
    marginHorizontal: 5,
    marginTop: 10,
  },
  buttonText: {
    color: 'white',
    marginLeft: 'auto',
  },
  available: {
    backgroundColor: '#e8f5e9', // light green
  },
  unavailable: {
    backgroundColor: '#ffebee', // light red
  },
});

export default NotificationsList;
