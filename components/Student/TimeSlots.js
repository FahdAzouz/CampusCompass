import React, { useEffect, useState } from 'react';
import { View, Text, TouchableOpacity, Alert, StyleSheet } from 'react-native';
import { getFirestore, collection, getDocs, query, where, doc, updateDoc, getDoc } from 'firebase/firestore';
import { SafeAreaView } from 'react-native-safe-area-context';
import { FIREBASE_AUTH } from '../../firebase'

const TimeSlotsScreen = ({ route }) => {
    console.log(route.params);
    const sessionId = route.params?.sessionId; // Use optional chaining
    if (!sessionId) {
        console.error('No session ID provided');
        return <Text>No session ID provided</Text>; // Or handle this case appropriately
    }
    const [slots, setSlots] = useState([]);
    const [counselorName, setCounselorName] = useState('');

    useEffect(() => {
        const fetchSlotsAndCounselor = async () => {
            const db = getFirestore();
            const sessionDocRef = doc(db, 'sessions', sessionId);
            const sessionDoc = await getDoc(sessionDocRef);

            if (sessionDoc.exists()) {
                setCounselorName(sessionDoc.data().name); // Assuming 'counselorName' is stored in the session document
                const slotsCollection = collection(db, 'available_time', sessionId, 'slots');
                const q = query(slotsCollection, where("available", "==", true));
                const querySnapshot = await getDocs(q);
                setSlots(querySnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() })));
            } else {
                Alert.alert("Error", "Session data not found.");
            }
        };

        fetchSlotsAndCounselor();
    }, [sessionId]);

    const selectSlot = async (slotId) => {
        const db = getFirestore();
        const slotDocRef = doc(db, 'available_time', sessionId, 'slots', slotId);
        const slotDoc = await getDoc(slotDocRef);
    
        if (slotDoc.exists() && slotDoc.data().available) {
            const studentName = FIREBASE_AUTH.currentUser.fullName || "Unknown Student";
            const counselorId = FIREBASE_AUTH.currentUser.uid;  // Assuming the counselor's ID is the current user's ID
            await updateDoc(slotDocRef, {
                available: false,
                bookedBy: studentName,
                bookedAt: new Date(),
                counselorId: counselorId  // Storing counselor's ID for query
            });
            Alert.alert('Success', 'Time slot booked successfully');
        } else {
            Alert.alert('Error', 'This time slot is no longer available.');
        }
    };

    return (
        <SafeAreaView style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
            <Text style={styles.title}>{counselorName ? `Booking for ${counselorName}` : 'Loading...'}</Text>
            {slots.map(slot => (
                <TouchableOpacity key={slot.id} onPress={() => selectSlot(slot.id)} style={styles.slotButton}>
                    <Text>{slot.time}</Text>
                </TouchableOpacity>
            ))}
        </SafeAreaView>
    );
};

const styles = StyleSheet.create({
    title: {
        fontSize: 20,
        fontWeight: 'bold',
        marginBottom: 20
    },
    slotButton: {
        padding: 10,
        paddingHorizontal: 100,
        margin: 10,
        backgroundColor: '#66bfbf',
        borderRadius: 5
    }
});

export default TimeSlotsScreen;