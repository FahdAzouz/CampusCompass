import { Button, StyleSheet, Text, TextInput, FlatList, View, Image, TouchableOpacity } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import React, { useState, useEffect } from 'react'
import Icon from 'react-native-vector-icons/FontAwesome';
import { useNavigation } from '@react-navigation/native';
import { FIREBASE_AUTH, FIREBASE_DB } from '../firebase';
import { getFirestore, collection, getDocs } from 'firebase/firestore'; // Updated import to include collection and getDocs
import { useFocusEffect } from '@react-navigation/native';
import { signOut } from 'firebase/auth';

const CounselorList = () => {
  const [sessionData, setSessionData] = useState([]);
  const [searchQuery, setSearchQuery] = useState('');

  const fetchSessionData = async () => {
    const db = getFirestore();
    const sessionCollectionRef = collection(db, 'sessions'); // Reference to the 'sessions' collection
    try {
      const querySnapshot = await getDocs(sessionCollectionRef);
      const sessions = querySnapshot.docs.map(doc => ({
        id: doc.id,
        ...doc.data()
      }));
      setSessionData(sessions); // Store session data in state
    } catch (error) {
      console.error('Error fetching session data:', error.message);
    }
  };
  useEffect(() => {
    fetchSessionData();
  }, []);

  useFocusEffect(
    React.useCallback(() => {
      fetchSessionData();
    }, [])
  );
  const renderItem = ({ item }) => (
    <View style={styles.row}>
      <Text style={styles.cell}>{item.name}</Text>
      <Text style={styles.cell}>{item.room}</Text>
      <Text style={styles.cell}>{item.status}</Text>
    </View>
  );

  return (
    <SafeAreaView style={styles.container}>
      <Text style={styles.title}>Counselor List</Text>
      <View style={styles.tableHeader}>
        <Text style={styles.headerText}>Counselor Name</Text>
        <Text style={styles.headerText}>Room</Text>
        <Text style={styles.headerText}>Availability</Text>
      </View>
      <FlatList
        data={sessionData}
        keyExtractor={item => item.id}
        renderItem={renderItem}
      />
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 10,
    backgroundColor: '#fff',
  },
  tableHeader: {
    flexDirection: 'row',
    padding: 10,
    backgroundColor: '#f4f4f8',
    borderTopWidth: 1,
    borderBottomWidth: 1,
    borderTopColor: '#ccc',
    borderBottomColor: '#ccc',
  },
  headerText: {
    flex: 1,
    fontWeight: 'bold',
    textTransform: 'uppercase',
    color: '#555',
    fontSize: 16,
    textAlign: 'center',
  },
  row: {
    flexDirection: 'row',
    paddingVertical: 10,
    borderBottomWidth: 1,
    borderBottomColor: '#eee',
  },
  cell: {
    flex: 1,
    fontSize: 16,
    textAlign: 'center',
    color: '#416285',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginTop: 10,
    marginBottom: 30,
    paddingHorizontal: 20,
  },
});


export default CounselorList;
