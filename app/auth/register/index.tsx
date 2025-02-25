import { useState } from 'react'
import { Text, TextInput, TouchableOpacity, StyleSheet } from 'react-native'
import { useRouter } from 'expo-router'
import { LinearGradient } from 'expo-linear-gradient'

export default function RegisterUsername() {
    const [driverName, setDriverName] = useState<string>('')

    const router = useRouter()

    const handleNext = () => {
        setDriverName('')
        router.replace({ pathname: '/auth/register/password', params: { driverName } })
    }

    return (
        <LinearGradient colors={['#1E1E2E', '#03001C', '#301E67', '#5B8FB9', '#80B3FF', '#B8E4FF', '#F5F5F5']} style={styles.container}>
            <Text style={styles.title}>Add driver</Text>
            <Text style={styles.subtitle}>Pick a unique username and let's go!</Text>

            <TextInput
                style={styles.input}
                placeholder="Enter your name"
                placeholderTextColor="#888"
                value={driverName}
                onChangeText={(text) => setDriverName(text.trim())}
            />
            {driverName.length < 2 ? <Text style={styles.errorText}>Name must be at least 2 letters</Text> : null}

            <TouchableOpacity
                style={[styles.button, driverName.length > 2 ? styles.buttonActive : {}]}
                onPress={handleNext}
                disabled={driverName.length < 2}
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
    errorText: {
        color: 'orange',
        fontSize: 14,
        textAlign: 'left',
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
})
