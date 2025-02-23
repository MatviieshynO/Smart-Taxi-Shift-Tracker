import { useState, useEffect, useRef } from 'react'
import { View, Text, TextInput, TouchableOpacity, StyleSheet } from 'react-native'
import { useRouter } from 'expo-router'
import { LinearGradient } from 'expo-linear-gradient'

export default function RegisterUsername() {
    const [username, setUsername] = useState('')
    const router = useRouter()
    const inputRef = useRef<TextInput>(null)

    const handleNext = () => {
        if (!username.trim()) return
        setUsername('')
        router.push({ pathname: '/auth/register/password', params: { username } })
    }

    return (
        <LinearGradient colors={['#1E1E2E', '#03001C', '#301E67', '#5B8FB9', '#80B3FF', '#B8E4FF', '#F5F5F5']} style={styles.container}>
            <Text style={styles.title}>Add driver</Text>
            <Text style={styles.subtitle}>Pick a unique username and let's go!</Text>

            <TextInput
                ref={inputRef}
                style={styles.input}
                placeholder="Enter your name"
                placeholderTextColor="#888"
                value={username}
                onChangeText={(text) => setUsername(text.trim())}
            />
            {username.length < 2 ? <Text style={styles.errorText}>Name must be at least 2 letters</Text> : null}

            <TouchableOpacity
                style={[styles.button, username.length > 1 ? styles.buttonActive : {}]}
                onPress={handleNext}
                disabled={username.length < 2}
            >
                <Text style={styles.buttonText}>Next →</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.signInButton} onPress={() => router.push('/auth/login')}>
                <Text style={styles.signInButtonText}>Back to the drivers list!</Text>
            </TouchableOpacity>
        </LinearGradient>
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
    signInButton: {
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
    signInButtonText: {
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
    errorText: {
        color: 'orange',
        fontSize: 14,
        textAlign: 'left',
    },
})
