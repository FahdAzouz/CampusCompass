// SearchPage.js
import React, { useState, useEffect } from 'react';
import { View, Text, TextInput, TouchableOpacity, FlatList, Image, StyleSheet } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { getFirestore, collection, query, where, getDocs } from 'firebase/firestore';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useFocusEffect } from '@react-navigation/native';

const SearchPage = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [searchResults, setSearchResults] = useState([]);
  const navigation = useNavigation();

  const searchSessions = async () => {
    if (searchQuery.trim() === '') {
      setSearchResults([]);
      return;
    }
  
    try {
      const db = getFirestore();
      const sessionRef = collection(db, 'sessions');
      const q = query(
        sessionRef,
        where('name_lower', '>=', searchQuery.trim().toLowerCase()),
        where('name_lower', '<=', searchQuery.trim().toLowerCase() + '\uf8ff')
      );
  
      const querySnapshot = await getDocs(q);
      const results = querySnapshot.docs.map(doc => ({
        id: doc.id,
        ...doc.data()
      }));
  
      setSearchResults(results);
    } catch (error) {
      console.error('Error searching sessions:', error.message);
    }
  };

  const handleMakeOrderPage = (medicine) => {
    // Navigate to the MakeOrderPage with the selected medicine details
    navigation.navigate('MakeOrderPage', { medicine });
  };


  useFocusEffect(
    React.useCallback(() => {
      if (searchQuery) searchSessions();
    }, [searchQuery])
  );
  

  return (
    <SafeAreaView style={styles.container}>
      <Image style={styles.image} source={require("../../assets/search.png")} />
      <View>
        <Text style={styles.title}>Search by Counselor Name</Text>
        <TextInput
          style={styles.input}
          placeholder="Enter Counselor Name"
          value={searchQuery}
          onChangeText={(text) => setSearchQuery(text)}
          onSubmitEditing={searchSessions} // Triggers search when "enter" is pressed on the keyboard
        />
        <TouchableOpacity style={styles.searchButton} onPress={searchSessions}>
          <Text style={styles.buttonText}>Search</Text>
        </TouchableOpacity>
      </View>

      <FlatList
        data={searchResults}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <View style={styles.resultRow}>
            <Text style={styles.resultText}>{item.name}</Text>
            <Text style={styles.resultText}>{item.room}</Text>
          </View>
        )}
        ListHeaderComponent={() => (
          <View style={styles.headerRow}>
            <Text style={styles.headerText}>Counselor Name</Text>
            <Text style={styles.headerText}>Office</Text>
          </View>
        )}
      />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'space-around',
    paddingHorizontal: 20,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 40,
    marginTop: 40,
    textAlign: 'center'
  },
  input: {
    height: 40,
    borderColor: 'gray',
    borderWidth: 1,
    borderRadius: 35,
    marginBottom: 20,
    paddingVertical: 10,
    paddingHorizontal: 100,
    width: '100%',
    textAlign: 'center'
  },
  searchButton: {
    backgroundColor: '#416285',
    paddingHorizontal: 30,
    paddingVertical: 10,
    borderRadius: 50
  },
  buttonContainer: {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: "center",
    gap: 10
  },
  buttonText: {
    color: 'white',
    fontWeight: 'bold',
    textAlignVertical: 'center',
    textAlign: 'center'
  },
  resultsContainer: {
    width: '100%',
    height: '100%',
    paddingVertical: 100,
    marginTop: -70
  },
  resultRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    borderBottomWidth: 1,
    borderBottomColor: '#ccc',
    paddingVertical: 18,
  },
  headerRow: {
    flexDirection: 'row',
    //justifyContent: 'space-between',
    borderBottomWidth: 2,
    borderBottomColor: '#416285',
    paddingVertical: 18,
  },
  headerText: {
    flex: 1,
    color: '#416285',
    fontWeight: 'bold',
    justifyContent: 'space-around',
  },
  resultText: {
    flex: 1,
    textAlignVertical: 'center'
  },
  actionsContainer: {
    flexDirection: 'column',
    alignItems: 'flex-end',
    marginTop: 10,
  },
  image: {
    width: 150,
    height: 150,
    resizeMode: 'contain',
    alignSelf: 'center',
    marginTop: 50,
    marginBottom: 0
  },
  makeOrderButton: {
    backgroundColor: '#416285',
    paddingHorizontal: 10,
    paddingVertical: 5,
    borderRadius: 5,
    marginBottom: 10,
    textAlignVertical: 'center'
  },
});

export default SearchPage;
