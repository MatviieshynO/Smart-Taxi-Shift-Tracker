import { useRouter, useLocalSearchParams } from 'expo-router'
import React from 'react'
import { View, Text, StyleSheet, Pressable } from 'react-native'

export default function ErrorScreen() {
    const router = useRouter()
    const { errorMessage } = useLocalSearchParams() // Отримуємо помилку, якщо вона передана

    return (
        <View style={styles.container}>
            <Text style={styles.title}>Oops! Something went wrong</Text>
            <Text style={styles.errorMessage}>{errorMessage ? errorMessage : 'An unexpected error occurred.'}</Text>

            <Pressable
                style={({ pressed }) => [styles.secondaryButton, pressed && styles.buttonPressed]}
                onPress={() => router.replace('/')}
            >
                <Text style={styles.secondaryButtonText}>Go to Home</Text>
            </Pressable>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#1E1E2E',
        justifyContent: 'center',
        alignItems: 'center',
        paddingHorizontal: 20,
    },
    title: {
        fontSize: 24,
        fontWeight: 'bold',
        color: '#fff',
        marginBottom: 10,
    },
    errorMessage: {
        fontSize: 16,
        color: '#ff5555',
        textAlign: 'center',
        marginBottom: 20,
        paddingHorizontal: 10,
    },
    button: {
        backgroundColor: '#4CAF50',
        paddingVertical: 12,
        paddingHorizontal: 20,
        borderRadius: 10,
        marginBottom: 10,
    },
    buttonPressed: {
        opacity: 0.8,
    },
    buttonText: {
        color: '#fff',
        fontSize: 18,
        fontWeight: 'bold',
    },
    secondaryButton: {
        backgroundColor: '#555',
        paddingVertical: 10,
        paddingHorizontal: 20,
        borderRadius: 10,
    },
    secondaryButtonText: {
        color: '#fff',
        fontSize: 16,
    },
})
