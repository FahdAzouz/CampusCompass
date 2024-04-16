import React, { useState, useEffect } from 'react';
import { View, Text, TextInput, StyleSheet, FlatList, SafeAreaView, TouchableOpacity } from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';

const ShortageList = () => {
  const [medicineData, setMedicineData] = useState([]);
  const [searchQuery, setSearchQuery] = useState('');

  useEffect(() => {
    const rawData = `
      Victor Hugo, Family Issues
      William Shakespeare, Love and Romance
      Charles Dickens, Social Issues
      Mark Twain, Adventure
      Jane Austen, Love and Romance
      Leo Tolstoy, Violence
    `;
    const rows = rawData.trim().split('\n').map(row => row.trim().split(', '));
    const sortedData = rows.sort((a, b) => a[0].localeCompare(b[0]));

    const dataWithStatus = sortedData.map(item => [item[0], item[1], 'Available']);
    setMedicineData(dataWithStatus);
  }, []);

  const filteredData = medicineData.filter(
    item =>
      item[0].toLowerCase().includes(searchQuery.toLowerCase()) ||
      item[1].toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <SafeAreaView>
      <View>
        <Text style={styles.title}>Counselor List</Text>
        <TextInput
          style={styles.searchInput}
          placeholder="Search for Counselor..."
          value={searchQuery}
          onChangeText={text => setSearchQuery(text)}
        />
        <View style={styles.tableHeader}>
          <Text style={styles.tableCell}>Counselor</Text>
          <Text style={styles.tableCell}>Expertise</Text>
          <Text style={styles.tableCell}>Status</Text>
        </View>
        <FlatList
          data={filteredData}
          keyExtractor={(item, index) => index.toString()}
          renderItem={({ item, index }) => (
            <View style={styles.tableRow}>
              <Text style={styles.tableCell}>{item[0]}</Text>
              <Text style={styles.tableCell}>{item[1]}</Text>
              <Text style={styles.tableCell}>{item[2]}</Text>
            </View>
          )}
        />
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  title: {
    fontSize: 20,
    marginTop: 50,
    fontWeight: 'bold',
    textAlign: 'center',
    marginVertical: 10,
  },
  searchInput: {
    height: 40,
    borderWidth: 1,
    borderColor: '#2dbfc5',
    paddingHorizontal: 30,
    paddingVertical: 10,
    borderRadius: 50,
    marginBottom: 10,
  },
  tableHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 8,
    borderTopWidth: 1,
    borderBottomWidth: 1,
    paddingHorizontal: 16,
  },
  tableRow: {
    flexDirection: 'row',
    marginBottom: 8,
    paddingHorizontal: 16,
  },
  tableCell: {
    flex: 1,
    padding: 8,
    textAlign: 'center',
  },
});

export default ShortageList;
