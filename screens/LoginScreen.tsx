import { KeyboardAvoidingView, StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native';
import React, { useEffect, useState } from 'react';
import { auth } from '../firebase';  
import { createUserWithEmailAndPassword, signInWithEmailAndPassword, fetchSignInMethodsForEmail } from 'firebase/auth';
import { useNavigation } from '@react-navigation/native';
import { doc, setDoc, getDoc } from 'firebase/firestore';  
import { db } from '../firebase';  
import { FirebaseError } from 'firebase/app';
import Toast from 'react-native-toast-message';

const LoginScreen = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [emailError, setEmailError] = useState('');
    const [passwordError, setPasswordError] = useState('');
    const [emailInUseError, setEmailInUseError] = useState('');

    const navigation = useNavigation<any>();

    useEffect(() => {
        const unsubscribe = auth.onAuthStateChanged(user => {
            if (user) {
                navigation.replace("Home");
            }
        });
        return unsubscribe;
    }, []);

    const handleSignUp = async () => {
    // Limpiar errores previos
    setEmailError('');
    setPasswordError('');
    setEmailInUseError('');

    // Validar formato de correo
    const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
    if (!emailRegex.test(email)) {
        setEmailError('Por favor, ingresa un correo electrónico válido.');
        return;
    }

    // Validar contraseña (mínimo 6 caracteres, al menos una letra y un número)
   const passwordRegex = /^(?=.*[A-Za-z])(?=.*\d).{6,}$/;
if (typeof password !== 'string' || !passwordRegex.test(password)) {
    setPasswordError('La contraseña debe tener al menos una letra, un número y mínimo 6 caracteres.');
    return;
}

try {
    const methods = await fetchSignInMethodsForEmail(auth, email);
    if (methods.length > 0) {
        setEmailInUseError('Este correo electrónico ya está registrado.');
        return;
    }

    const userCredential = await createUserWithEmailAndPassword(auth, email, password);
    const user = userCredential.user;
    console.log('Usuario registrado:', user.email);
    navigation.replace('Home');

} catch (error) {
    const firebaseError = error as FirebaseError;
    console.error('Error en el registro:', firebaseError);

    if (firebaseError.code === 'auth/email-already-in-use') {
        setEmailInUseError('Este correo ya está en uso.');
    } else if (firebaseError.code === 'auth/network-request-failed') {
        Toast.show({
            type: 'error',
            text1: 'Sin conexión a internet',
            text2: 'Verifica tu conexión y vuelve a intentarlo',
            position: 'bottom',
        });
    } else {
        alert(firebaseError.message);
    }
}

};


    // Función para iniciar sesión e insertar el documento en Firestore si no existe
    const handleLogin = () => {
        signInWithEmailAndPassword(auth, email, password)
            .then(userCredentials => {
                const user = userCredentials.user;
                console.log('Usuario logueado:', user.email);

                // Comprobar si el documento del usuario existe en Firestore
                const userRef = doc(db, 'usuarios', user.uid);
                getDoc(userRef)
                    .then(docSnapshot => {
                        if (!docSnapshot.exists()) {
                            // Si el documento no existe, lo creamos
                            setDoc(userRef, {
                                nombre: '',         // Puede dejarse vacío al principio
                                apellido: '',       // Puede dejarse vacío al principio
                                comidaFavorita: ''  // Puede dejarse vacío al principio
                            })
                                .then(() => {
                                    console.log('Perfil de usuario creado en Firestore');
                                    navigation.replace('Home');
                                })
                                .catch(error => {
                                    console.error('Error al crear documento en Firestore:', error);
                                    alert('Error al crear perfil en Firestore');
                                });
                        } else {
                            // Si el documento ya existe, solo navega a la página de inicio
                            console.log('Perfil ya existe en Firestore');
                            navigation.replace('Home');
                        }
                    })
                    .catch(error => {
                        console.error('Error al verificar documento de Firestore:', error);
                        alert('Error al verificar perfil en Firestore');
                    });
            })
            .catch(error => {
    console.error('Error al iniciar sesión:', error);

    if (error.code === 'auth/network-request-failed') {
        Toast.show({
            type: 'error',
            text1: 'Sin conexión a internet',
            text2: 'Verifica tu conexión y vuelve a intentarlo',
            position: 'bottom',
        });
    } else {
        Toast.show({
            type: 'error',
            text1: 'Error al iniciar sesión',
            text2: error.message,
            position: 'bottom',
        });
    }
});

    };

    return (
        <View style={styles.container}>
            <TextInput
                style={styles.input}
                placeholder="Correo electrónico"
                value={email}
                onChangeText={setEmail}
            />
            {emailError ? <Text style={styles.errorText}>{emailError}</Text> : null}
            {emailInUseError ? <Text style={styles.errorText}>{emailInUseError}</Text> : null}

            <TextInput
                style={styles.input}
                placeholder="Contraseña"
                value={password}
                onChangeText={setPassword}
                secureTextEntry
            />
            {passwordError ? <Text style={styles.errorText}>{passwordError}</Text> : null}

            <TouchableOpacity style={styles.button} onPress={handleLogin}>
                <Text style={styles.buttonText}>Iniciar sesión</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.button} onPress={handleSignUp}>
                <Text style={styles.buttonText}>Registrarse</Text>
            </TouchableOpacity>
            
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        padding: 20,
    },
    input: {
        width: '100%',
        height: 40,
        borderColor: '#ccc',
        borderWidth: 1,
        marginBottom: 10,
        paddingLeft: 10,
        borderRadius: 5,
    },
    button: {
        width: '100%',
        padding: 15,
        backgroundColor: '#1E90FF',
        borderRadius: 5,
        marginBottom: 10,
        alignItems: 'center',
    },
    buttonText: {
        color: 'white',
        fontSize: 16,
    },
    errorText: {
        color: 'red',
        fontSize: 12,
        marginBottom: 10,
    },
});

export default LoginScreen;