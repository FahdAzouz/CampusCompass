//login
import { KeyboardAvoidingView, StyleSheet, Text, TextInput, TouchableOpacity, View, Image, Dimensions } from 'react-native'
import React, { useState } from 'react'
import { useNavigation } from '@react-navigation/native'
import { FIREBASE_AUTH } from '../firebase'
import { signInWithEmailAndPassword } from 'firebase/auth'
import Toast from 'react-native-toast-message';

const window = Dimensions.get("window");

const Login = () => {
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const navigation = useNavigation()
    const auth = FIREBASE_AUTH

    const signIn = async () => {
        try {
            const response = await signInWithEmailAndPassword(auth, email, password)
            ToastAndroid.show('Welcome back!', ToastAndroid.SHORT);
            console.log(response);
        } catch (error) {
            ToastAndroid.show(error.message, ToastAndroid.SHORT);
        }
    }

    return (
        <KeyboardAvoidingView behavior="padding" style={styles.Allcontainer}>
            <Toast ref={(ref) => Toast.setRef(ref)} />
            <Image style={styles.logo} source={require("../assets/login.png")} />
            <View style={styles.container}>
                <TextInput value={email} onChangeText={setEmail} placeholder='Email' style={styles.input} />
                <TextInput value={password} onChangeText={setPassword} placeholder='Password' secureTextEntry style={styles.input} />
                <TouchableOpacity onPress={signIn} style={styles.button}>
                    <Text style={styles.buttonText}>Login</Text>
                </TouchableOpacity>
                <TouchableOpacity onPress={() => navigation.navigate('Register')} style={styles.buttonOutline}>
                    <Text style={styles.buttonTextOutline}>Register</Text>
                </TouchableOpacity>
            </View>
        </KeyboardAvoidingView>
    )
}

export default Login

const styles = StyleSheet.create({
    Allcontainer: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: 'white', // Soft background color
    },
    logo: {
        width: window.width * 0.3, // Responsive width
        height: window.width * 0.3, // Responsive height, maintain aspect ratio
        marginBottom: 50,
    },
    container: {
        width: '80%',
        alignItems: 'center',
    },
    input: {
        backgroundColor: "white",
        width: '100%',
        marginVertical: 10,
        paddingHorizontal: 15,
        paddingVertical: 10,
        borderRadius: 25,
        borderWidth: 1,
        borderColor: '#416285', // Soft border color
    },
    button: {
        backgroundColor: '#EFCD52', // Blue button color
        width: '100%',
        padding: 15,
        borderRadius: 25,
        alignItems: 'center',
        marginTop: 20,
    },
    buttonText: {
        color: "white",
        fontWeight: "bold",
    },
    buttonOutline: {
        backgroundColor: "white",
        width: '100%',
        padding: 15,
        borderRadius: 25,
        borderColor: '#DBB8AA',
        borderWidth: 1,
        alignItems: 'center',
        marginTop: 10,
    },
    buttonTextOutline: {
        color: "#DBB8AA",
    },
});
