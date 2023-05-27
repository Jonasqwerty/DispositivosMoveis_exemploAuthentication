import { useNavigation } from '@react-navigation/core'
import React, { useEffect, useState } from 'react'
import { KeyboardAvoidingView, StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native'
import { auth, firestore } from '../firebase'
import { Usuario } from '../model/Usuario'

const RegistroScreen = () => {
    const [formUsuario, setFormUsuario] = useState<Partial<Usuario>>({})

    const navigation = useNavigation()

    useEffect(() => {
        const unsubscribe = auth.onAuthStateChanged(user => {
            if (user) {
                navigation.replace("Home")
            }
        })

        return unsubscribe
    }, [])

    const criarRegistro = () => {
        auth
            .createUserWithEmailAndPassword(formUsuario.email, formUsuario.senha)
            .then((userCredentials) => {
                const user = userCredentials.user;
                const reference = firestore
                    .collection("Usuario")
                    .doc(auth.currentUser.uid);
                reference.set({
                    id: auth.currentUser.uid,
                    email: formUsuario.email,
                    // senha: senha,
                    nome: formUsuario.nome,
                });
                console.log("Registered with:", user.email);
            })
            .catch((error) => alert(error.message));
    };

    const handleLogin = () => {
        auth
            .signInWithEmailAndPassword(email, password)
            .then(userCredentials => {
                const user = userCredentials.user;
                console.log('Logged in with:', user.email);
            })
            .catch(error => alert(error.message))
    }

    const cancelar = () => {
        navigation.replace("Login");
    };

    return (
        <KeyboardAvoidingView
            style={styles.container}
            behavior="padding"
        >
            <View style={styles.inputContainer}>
                <TextInput
                    placeholder="Email"
                    value={formUsuario.email}
                    onChangeText={val => setFormUsuario({ ...formUsuario, email: val })}
                    style={styles.input}
                />
                <TextInput
                    placeholder="Senha"
                    value={formUsuario.senha}
                    onChangeText={val => setFormUsuario({ ...formUsuario, senha: val })}
                    style={styles.input}
                    secureTextEntry
                />
                <TextInput
                    placeholder="Nome"
                    value={formUsuario.nome}
                    onChangeText={val => setFormUsuario({ ...formUsuario, nome: val })}
                    style={styles.input}
                />
            </View>

            <View style={styles.buttonContainer}>
                <TouchableOpacity
                    onPress={criarRegistro}
                    style={styles.button}
                >
                    <Text style={styles.buttonText}>Registrar</Text>
                </TouchableOpacity>
                <TouchableOpacity
                    onPress={cancelar}
                    style={[styles.button, styles.buttonOutline]}
                >
                    <Text style={styles.buttonOutlineText}>Cancelar</Text>
                </TouchableOpacity>
            </View>
        </KeyboardAvoidingView>
    )
}

export default RegistroScreen

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
    inputContainer: {
        width: '80%'
    },
    input: {
        backgroundColor: 'white',
        paddingHorizontal: 15,
        paddingVertical: 10,
        borderRadius: 10,
        marginTop: 5,
    },
    buttonContainer: {
        width: '60%',
        justifyContent: 'center',
        alignItems: 'center',
        marginTop: 40,
    },
    button: {
        backgroundColor: '#0782F9',
        width: '100%',
        padding: 15,
        borderRadius: 10,
        alignItems: 'center',
    },
    buttonOutline: {
        backgroundColor: 'white',
        marginTop: 5,
        borderColor: '#0782F9',
        borderWidth: 2,
    },
    buttonText: {
        color: 'white',
        fontWeight: '700',
        fontSize: 16,
    },
    buttonOutlineText: {
        color: '#0782F9',
        fontWeight: '700',
        fontSize: 16,
    },
})