import React, { useEffect, useState } from 'react';
import { View, Text, FlatList, StyleSheet, TouchableOpacity, Alert } from 'react-native';
import { getFirestore, collection, getDocs, query, where, updateDoc, doc } from 'firebase/firestore';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useNavigation } from '@react-navigation/native';

const TimeSlotsScreen = ({ route }) => {
    const { sessionId } = route.params;
    const [slots, setSlots] = useState([]);

    useEffect(() => {
        const fetchSlots = async () => {
            const db = getFirestore();
            const slotsCollection = collection(db, 'available_time', sessionId, 'slots');
            const q = query(slotsCollection, where("available", "==", true));
            const querySnapshot = await getDocs(q);
            setSlots(querySnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() })));
        };

        fetchSlots();
    }, [sessionId]);

    const selectSlot = async (slotId) => {
        const db = getFirestore();
        const slotDocRef = doc(db, 'available_time', sessionId, 'slots', slotId);
        await updateDoc(slotDocRef, { available: false });

        // Optionally navigate back or update UI
        Alert.alert('Success', 'Time slot booked successfully');
    };

    return (
        <SafeAreaView style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
            {slots.length > 0 ? (
                slots.map(slot => (
                    <TouchableOpacity key={slot.id} onPress={() => selectSlot(slot.id)} style={{ padding: 10, margin: 5, backgroundColor: 'lightgray' }}>
                        <Text>{slot.time}</Text>
                    </TouchableOpacity>
                ))
            ) : (
                <Text>No available time slots</Text>
            )}
        </SafeAreaView>
    );
};

export default TimeSlotsScreen;
