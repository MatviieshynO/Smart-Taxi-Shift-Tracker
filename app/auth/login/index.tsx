import { useState, useEffect, useRef } from 'react'
import { View, Text, TextInput, TouchableOpacity, StyleSheet } from 'react-native'
import { useRouter } from 'expo-router'

export default function LoginUsername() {
    const [username, setUsername] = useState('')
    const router = useRouter()
    const inputRef = useRef<TextInput>(null)

    const handleNext = () => {
        if (!username.trim()) return
        setUsername('')
        router.push({ pathname: '/auth/login/password', params: { username } })
    }

    return (
        <View style={styles.container}>
            <Text style={styles.title}> Authorization</Text>
            <Text style={styles.subtitle}>Welcome back! Glad to see you again!</Text>

            <TextInput
                ref={inputRef}
                style={styles.input}
                placeholder="Enter your name"
                placeholderTextColor="#888"
                value={username}
                onChangeText={(text) => setUsername(text.trim())}
            />

            <TouchableOpacity
                style={[styles.button, username.length > 1 ? styles.buttonActive : {}]}
                onPress={handleNext}
                disabled={username.length < 2}
            >
                <Text style={styles.buttonText}>Next →</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.signUpButton} onPress={() => router.push('/auth/register')}>
                <Text style={styles.signUpButtonText}>Don't have an account?</Text>
            </TouchableOpacity>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        backgroundColor: '#1E1E2E',
        paddingHorizontal: 20,
    },
    title: {
        textAlign: 'center',
        fontSize: 28,
        fontWeight: 'bold',
        color: '#fff',
        marginBottom: 5,
    },
    subtitle: {
        fontSize: 16,
        color: '#BBB',
        marginBottom: 5,
        textAlign: 'center',
    },
    input: {
        width: '100%',
        height: 60,
        paddingHorizontal: 30,
        fontSize: 22,
        color: '#fff',
        backgroundColor: '#2D2D44',
        marginTop: 30,
        marginBottom: 5,
        borderWidth: 1,
        borderColor: 'white',
        borderRadius: 5,
    },
    button: {
        width: '100%',
        height: 50,
        borderRadius: 5,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#444',
        marginTop: 45,
        borderWidth: 1,
        borderColor: 'grey',
    },
    signUpButton: {
        width: '100%',
        height: 50,
        borderRadius: 5,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#1E1E2E',
        marginTop: 15,
        borderWidth: 1,
        borderColor: 'grey',
    },
    signUpButtonText: {
        fontSize: 18,
        color: '#fff',
    },
    buttonActive: {
        backgroundColor: '#5c9743',
        borderWidth: 1,
        borderColor: 'white',
    },
    buttonText: {
        fontSize: 18,
        fontWeight: 'bold',
        color: '#fff',
    },
})
