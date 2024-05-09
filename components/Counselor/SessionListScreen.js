//SessionListScreen.js
import React, { useState, useEffect } from 'react';
import { View, Text, FlatList, StyleSheet, TouchableOpacity, ScrollView, Alert } from 'react-native';
import { getFirestore, collection, query, where, getDocs, doc, deleteDoc } from 'firebase/firestore';
import { SafeAreaView } from 'react-native-safe-area-context';
import Icon from 'react-native-vector-icons/FontAwesome';
import { useNavigation } from '@react-navigation/native';
import { FIREBASE_AUTH } from '../../firebase';
import { useFocusEffect } from '@react-navigation/native';

const SessionListScreen = () => {
  const [bookedSlots, setBookedSlots] = useState([]); 
  const navigation = useNavigation();

  const fetchBookedSlots = async () => {
    const db = getFirestore();
    const counselorId = FIREBASE_AUTH.currentUser.uid;
    const slotsCollectionPath = `available_time/${counselorId}/slots`;
    try {
        const querySnapshot = await getDocs(collection(db, slotsCollectionPath));
        console.log(querySnapshot);  // Fetch all documents from the slots subcollection
        const slotsData = querySnapshot.docs.map(doc => ({
            ...doc.data(),
            id: doc.id,
            bookedAt: doc.data().bookedAt?.toDate().toLocaleString(),
            bookedBy: doc.data().bookedBy,
            time: doc.data().time
        }));
        console.log("Fetched slots data:", slotsData);
        setBookedSlots(slotsData);
    } catch (error) {
        console.error("Error fetching slots:", error);
    }
  };


  useEffect(() => {
    fetchBookedSlots();
  }, []);

  return (
    <SafeAreaView style={styles.container}>
      <Text style={styles.title}>Your Current Sessions</Text>
      <FlatList
        style={styles.list}
        data={bookedSlots}  // Now using the correct state variable
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
            <View style={styles.tableRow}>
                <Text style={styles.tableCell}>{item.bookedBy}</Text>
                <Text style={styles.tableCell}>{item.bookedAt}</Text>
                <Text style={styles.tableCell}>{item.time}</Text>
            </View>
        )}
      />
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  title: {
    fontSize: 22,
    fontWeight: 'bold',
    textAlign: 'center',
    marginVertical: 20,
  },
  list: {
    flex: 1,
    paddingHorizontal: 10,
  },
  tableRow: {
    flexDirection: 'row',
    paddingVertical: 12,
    paddingHorizontal: 10,
    borderBottomWidth: 1,
    borderBottomColor: '#EFCD52', // Yellow line separator for each item
    backgroundColor: 'white', // Background for the row for better readability
    marginVertical: 2,
    borderRadius: 5, // Slight rounding of corners
  },
  tableCell: {
    flex: 1,
    fontSize: 16,
    color: '#4756ca', // Deep blue text inside each cell
    paddingHorizontal: 8, // Padding for the text
  },
  addButton: {
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 20,
    backgroundColor: '#EFCD52', // Button with yellow background
    alignSelf: 'center',
    marginVertical: 10,
    shadowColor: '#000', // Shadow for a subtle elevation effect
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 4,
  },
  addButtonText: {
    color: 'white', // White text for buttons
    fontWeight: 'bold',
    textAlign: 'center',
  }
});


export default SessionListScreen;