import { useState, useEffect, useRef } from 'react'
import { Text, TextInput, TouchableOpacity, StyleSheet } from 'react-native'
import { LinearGradient } from 'expo-linear-gradient'
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
        <LinearGradient colors={['#1E1E2E', '#03001C', '#301E67', '#5B8FB9', '#80B3FF', '#B8E4FF', '#F5F5F5']} style={styles.container}>
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
                <LinearGradient
                    colors={username.length > 1 ? ['#005C5C', '#008F8F', '#00BFBF', '#00FFFF'] : ['#4A4A4A', '#2D2D2D']}
                    style={styles.gradient}
                >
                    <Text style={styles.buttonText}>Next →</Text>
                </LinearGradient>
            </TouchableOpacity>
            <TouchableOpacity style={styles.signUpButton} onPress={() => router.push('/auth/register')}>
                <LinearGradient colors={['#4A4A6A', '#2D2D44']} style={styles.gradient}>
                    <Text style={styles.signUpButtonText}>Don't have an account?</Text>
                </LinearGradient>
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
    gradient: {
        height: '100%',
        width: '100%',
        justifyContent: 'center',
        alignItems: 'center',
    },
})
