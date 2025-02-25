import { Text, TouchableOpacity, StyleSheet, View } from 'react-native'
import { useRouter } from 'expo-router'
import { LinearGradient } from 'expo-linear-gradient'
import { useDriver } from '@contexts/driverContext'
import * as SecureStore from 'expo-secure-store'
import { useCar } from '@contexts/carContext'

export default function SettingsScreen() {
    const { setCurrentDriver } = useDriver()
    const { setCurrentCar } = useCar()
    const router = useRouter()

    const handleLogout = async () => {
        setCurrentDriver(null)
        setCurrentCar(null)
        await SecureStore.deleteItemAsync('driverSession')
        await SecureStore.deleteItemAsync('currentCar')
        router.replace('/auth/login')
    }

    return (
        <LinearGradient colors={['#1C1F26', '#0F1014']} style={styles.container}>
            <View style={styles.content}>
                <TouchableOpacity style={styles.item} onPress={() => router.push('/(tabs)/settings/profile')} activeOpacity={0.85}>
                    <LinearGradient colors={['#2A2D34', '#23272E']} style={styles.gradient}>
                        <Text style={styles.itemText}>Profile</Text>
                    </LinearGradient>
                </TouchableOpacity>

                <TouchableOpacity style={styles.item} onPress={() => router.push('/(tabs)/settings/cars')} activeOpacity={0.85}>
                    <LinearGradient colors={['#2A2D34', '#23272E']} style={styles.gradient}>
                        <Text style={styles.itemText}>My Cars</Text>
                    </LinearGradient>
                </TouchableOpacity>

                <TouchableOpacity style={[styles.item, styles.logout]} onPress={handleLogout} activeOpacity={0.85}>
                    <LinearGradient colors={['#FF4B2B', '#FF416C']} style={styles.gradient}>
                        <Text style={[styles.itemText, styles.logoutText]}>Logout</Text>
                    </LinearGradient>
                </TouchableOpacity>
            </View>
        </LinearGradient>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        paddingHorizontal: 24,
    },
    content: {
        width: '100%',
    },
    item: {
        borderRadius: 12,
        overflow: 'hidden',
        marginBottom: 14,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 6 },
        shadowOpacity: 0.3,
        shadowRadius: 8,
        elevation: 6,
    },
    gradient: {
        paddingVertical: 18,
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: 12,
    },
    itemText: {
        color: '#FFF',
        fontSize: 18,
        fontWeight: '600',
        textTransform: 'uppercase',
        letterSpacing: 1.2,
    },
    logout: {
        marginTop: 40,
        shadowColor: '#FF4B2B',
        shadowOffset: { width: 0, height: 8 },
        shadowOpacity: 0.6,
        shadowRadius: 12,
        elevation: 8,
    },
    logoutText: {
        fontWeight: '700',
    },
})
