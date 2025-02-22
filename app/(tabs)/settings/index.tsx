import { Text, TouchableOpacity, StyleSheet } from 'react-native'
import { useRouter } from 'expo-router'
import { LinearGradient } from 'expo-linear-gradient'

export default function SettingsScreen() {
    const router = useRouter()

    return (
        <LinearGradient colors={['#1E1E2E', '#12121C']} style={styles.container}>
            <Text style={styles.title}> Settings</Text>

            <TouchableOpacity style={styles.item} onPress={() => router.push('/(tabs)/settings/profile')}>
                <LinearGradient colors={['white', 'black', 'black', 'white']} style={styles.gradient}>
                    <Text style={styles.itemText}>Profile</Text>
                </LinearGradient>
            </TouchableOpacity>
        </LinearGradient>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 20,
    },
    title: {
        fontSize: 28,
        fontWeight: 'bold',
        color: '#FFF',
        marginBottom: 30,
        textAlign: 'center',
        textTransform: 'uppercase',
        letterSpacing: 1.2,
    },
    item: {
        borderRadius: 5,
        overflow: 'hidden',
        marginBottom: 12,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 4 },
        shadowOpacity: 0.3,
        shadowRadius: 6,
        elevation: 5,
        borderWidth: 2,
        borderColor: 'black',
    },
    gradient: {
        padding: 18,
        justifyContent: 'center',
        alignItems: 'center',
    },
    itemText: {
        color: '#FFF',
        fontSize: 18,
        fontWeight: '600',
        textTransform: 'uppercase',
        letterSpacing: 0.8,
    },
})
