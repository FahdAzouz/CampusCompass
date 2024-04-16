//Home
import { Button, StyleSheet, Text, View } from 'react-native'
import React from 'react'
import { SafeAreaView } from 'react-native-safe-area-context'
import { FIREBASE_AUTH } from '../firebase'
import { getFirestore, doc, getDoc } from 'firebase/firestore';
import { useEffect, useState } from 'react';
import { getAuth, onAuthStateChanged } from 'firebase/auth';
import Icon from 'react-native-vector-icons/FontAwesome';
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import CounselingHome from './Counselor/CounselingHome';
import ManufacturerHome from './Manufacturer/ManufacturerHome';
import Profile from './Profile';
import EditProfile from './EditProfile'
import OrderHistoryScreen from '../components/Manufacturer/OrderHistoryScreen';
import NotificationsListScreen from '../components/Manufacturer/NotificationsListScreen';
import MedicationsListScreen from '../components/Manufacturer/MedicationsListScreen';
import MakeOrderPage from './Counselor/MakeOrderPage';
import NotificationsList from './Counselor/NotificationsList';
import Search from './Counselor/Search';
import Cart from './Counselor/Cart';
import { TouchableOpacity, ScrollView } from 'react-native';
import AddNewMedicineScreen from './Manufacturer/AddNewMedicineScreen';
import ShortageList from './CounselorList';

const Tab = createBottomTabNavigator()
const TabStudent = createBottomTabNavigator()
const TabCounselor = createBottomTabNavigator()
const screenOptions = {
  tabBarShowLabel: false,
  headerShown: false,
  tabBarStyle: {
    position: 'absolute',
    bottom: 0,
    right: 0,
    left: 0,
    elevation: 0,
    height: 60,
    background: "white"
  }
}

function StudentLayout() {
  return (
    <TabStudent.Navigator screenOptions={screenOptions}>
      <TabStudent.Screen options={{
        tabBarIcon: ({ focused }) => {
          return (
            <View style={{ alignItems: 'center', justifyContent: 'center' }}>
              <Icon name='home' size={24} color={focused ? "#2dbfc5" : "black"} />
            </View>
          )
        }
      }} name="CounselingHome"
        component={CounselingHome} />

      <TabStudent.Screen
        options={{
          tabBarIcon: ({ focused }) => {
            return (
              <View style={{ alignItems: 'center', justifyContent: 'center' }}>
                <Icon name='user' size={24} color={focused ? '#2dbfc5' : 'black'} />
              </View>
            );
          },
        }}
        name='Profile'
        component={Profile}
      />
      <TabStudent.Screen
        options={{
          tabBarIcon: ({ focused }) => {
            return (
              <View style={{ alignItems: 'center', justifyContent: 'center' }}>
                <Icon name='columns' size={24} color={focused ? '#2dbfc5' : 'black'} />
              </View>
            );
          },
        }}
        name='ShortageList'
        component={ShortageList}
      />

      <TabStudent.Screen options={{
        tabBarIcon: ({ focused }) => (
          <View style={{ alignItems: 'center', justifyContent: 'center' }}>
            <Icon name='bars' size={24} color={focused ? '#2dbfc5' : 'black'} />
          </View>
        ),
      }} name='Cart' component={Cart} />
      <TabStudent.Screen options={{
        tabBarIcon: ({ focused }) => (
          <View style={{ alignItems: 'center', justifyContent: 'center' }}>
            <Icon name='bell' size={24} color={focused ? '#2dbfc5' : 'black'} />
          </View>
        ),
      }} name='NotificationsList' component={NotificationsList} />
      <TabStudent.Screen options={{
        tabBarIcon: ({ focused }) => (
          <View style={{ alignItems: 'center', justifyContent: 'center' }}>
            <Icon name='search' size={24} color={focused ? '#2dbfc5' : 'black'} />
          </View>
        ),
      }} name='Search' component={Search} />
      {/* <TabPharmacy.Screen name='MakeOrderPage' component={MakeOrderPage} /> */}
    </TabStudent.Navigator>
  );
}

function CounselorLayout({ navigation }) {
  return (
    <TabCounselor.Navigator screenOptions={screenOptions}>
      <TabCounselor.Screen
        options={{
          tabBarIcon: ({ focused }) => (
            <View style={{ alignItems: 'center', justifyContent: 'center' }}>
              <Icon name='home' size={24} color={focused ? '#2dbfc5' : 'black'} />
            </View>
          ),
        }}
        name='ManufacturerHome'
        component={ManufacturerHome}
      />
      <TabCounselor.Screen
        options={{
          tabBarIcon: ({ focused }) => (
            <View style={{ alignItems: 'center', justifyContent: 'center' }}>
              <Icon name='user' size={24} color={focused ? '#2dbfc5' : 'black'} />
            </View>
          ),
        }}
        name='Profile'
        component={Profile}
      />
      <TabCounselor.Screen
        options={{
          tabBarIcon: ({ focused }) => {
            return (
              <View style={{ alignItems: 'center', justifyContent: 'center' }}>
                <Icon name='columns' size={24} color={focused ? '#2dbfc5' : 'black'} />
              </View>
            );
          },
        }}
        name='ShortageList'
        component={ShortageList}
      />
      <TabCounselor.Screen options={{
        tabBarIcon: ({ focused }) => (
          <View style={{ alignItems: 'center', justifyContent: 'center' }}>
            <Icon name='history' size={24} color={focused ? '#2dbfc5' : 'black'} />
          </View>
        ),
      }} name='OrderHistory' component={OrderHistoryScreen} />
      <TabCounselor.Screen options={{
        tabBarIcon: ({ focused }) => (
          <View style={{ alignItems: 'center', justifyContent: 'center' }}>
            <Icon name='bell' size={24} color={focused ? '#2dbfc5' : 'black'} />
          </View>
        ),
      }} name='NotificationsList' component={NotificationsListScreen} />
      <TabCounselor.Screen options={{
        tabBarIcon: ({ focused }) => (
          <View style={{ alignItems: 'center', justifyContent: 'center' }}>
            <Icon name='bars' size={24} color={focused ? '#2dbfc5' : 'black'} />
          </View>
        ),
      }} name='MedicationsList' component={MedicationsListScreen} />
      <TabCounselor.Screen
        name='AddNewMedicine'
        component={AddNewMedicineScreen}
        options={{
          tabBarIcon: ({ focused }) => (
            <TouchableOpacity
              onPress={() => navigation.navigate('AddNewMedicine')}
              style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}
            >
              <Icon name='plus' size={24} color={focused ? '#2dbfc5' : 'black'} />
            </TouchableOpacity>
          ),
        }}
      />

    </TabCounselor.Navigator>
  );
}


const Home = () => {

  const auth = getAuth()
  const db = getFirestore();
  const [user, setUser] = useState(null);
  const userRole = "";

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (currentUser) => {
      if (currentUser) {
        try {
          const userDocRef = doc(db, 'users', currentUser.uid);
          const userDocSnapshot = await getDoc(userDocRef);

          if (userDocSnapshot.exists()) {
            setUser(userDocSnapshot.data());
          } else {
            console.error('User document not found in Firestore');
          }
        } catch (error) {
          console.error('Error fetching user data:', error.message);
        }
      } else {
        setUser(null);
      }
    });
    return () => unsubscribe();
  }, [auth, db]);


  return (
    <NavigationContainer independent={true}>
      <Tab.Navigator screenOptions={{ tabBarStyle: { display: 'none' } }}>
        {user?.role == "pharmacist" ?
          (<Tab.Screen name="PharmacistLayout" options={{ headerShown: false }} component={StudentLayout} />
          ) : (
            <Tab.Screen name="ManufacturerLayout" options={{ headerShown: false }} component={CounselorLayout} />
          )}
        <Tab.Screen name="EditProfile" options={{ headerShown: false }} component={EditProfile} />
        <Tab.Screen name="MakeOrderPage" options={{ headerShown: false }} component={MakeOrderPage} />
      </Tab.Navigator>
    </NavigationContainer>
  )
}

export default Home

const styles = StyleSheet.create({})