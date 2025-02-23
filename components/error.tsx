import { ExternalPathString, RelativePathString, useRouter } from 'expo-router'
import React from 'react'
import { View, Text, StyleSheet, Pressable } from 'react-native'

interface IErrorScreenProps {
    errorMessage: string
    pathname: RelativePathString | ExternalPathString
}

export default function ErrorScreen({ errorMessage, pathname }: IErrorScreenProps) {
    const router = useRouter()
    return (
        <View style={styles.container}>
            <Text style={styles.title}>Something went wrong</Text>
            <Text style={styles.errorMessage}>{errorMessage || 'An unexpected error occurred.'}</Text>

            <Pressable style={styles.button} onPress={() => router.replace(pathname)}>
                <Text style={styles.buttonText}>Retry</Text>
            </Pressable>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#121212',
        justifyContent: 'center',
        alignItems: 'center',
        paddingHorizontal: 20,
    },
    title: {
        fontSize: 22,
        fontWeight: 'bold',
        color: '#fff',
        marginBottom: 10,
    },
    errorMessage: {
        fontSize: 16,
        color: '#ff5555',
        textAlign: 'center',
        marginBottom: 20,
    },
    button: {
        backgroundColor: '#4CAF50',
        paddingVertical: 12,
        paddingHorizontal: 20,
        borderRadius: 10,
    },
    buttonText: {
        color: '#fff',
        fontSize: 18,
        fontWeight: 'bold',
    },
})
