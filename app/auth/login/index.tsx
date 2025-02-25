import { useState, useEffect } from 'react'
import { Text, Image, TouchableOpacity, StyleSheet, View, FlatList } from 'react-native'
import { LinearGradient } from 'expo-linear-gradient'
import { useRouter } from 'expo-router'
import { GetAllDrivers } from '@db/services/drivers.service'
import { Ionicons } from '@expo/vector-icons'
import LottieView from 'lottie-react-native'
import { IDriver } from '@db/types'

export default function LoginUsername() {
    const [driverName, setDriverName] = useState<string>('')
    const [drivers, setDrivers] = useState<IDriver[]>([])

    const router = useRouter()

    const handleNext = () => {
        setDriverName('')
        router.push({ pathname: '/auth/login/password', params: { driverName } })
    }

    const fetchDrivers = async () => {
        try {
            const response = await GetAllDrivers()
            if (!response.success) {
                return router.push('/error')
            }
            setDrivers(response.data || [])
        } catch (error) {
            console.error(error)
            return router.push('/error')
        }
    }
    useEffect(() => {
        fetchDrivers()
    }, [])
    return (
        <LinearGradient colors={['#1E1E2E', '#03001C', '#301E67', '#5B8FB9', '#80B3FF', '#B8E4FF', '#F5F5F5']} style={styles.container}>
            {drivers?.length ? (
                <View style={styles.infoBox}>
                    <View style={styles.gradientLine} />
                    <Ionicons name="shield-checkmark-outline" size={32} color="#80B3FF" />
                    <View style={styles.titleContainer}>
                        <Text style={styles.title}>Secure Driver Selection</Text>
                        <Text style={styles.subtitle}>Pick your driver and continue safely.</Text>
                    </View>
                </View>
            ) : (
                <>
                    <Text style={styles.emptyTitle}>No registered drivers</Text>
                    <Text style={styles.emptySubtitle}>Add a new driver to start your journey.</Text>
                </>
            )}

            <FlatList
                data={drivers}
                keyExtractor={(item) => String(item.id)}
                renderItem={({ item }) => (
                    <TouchableOpacity
                        style={[styles.driverItem, driverName === item.name ? { backgroundColor: 'red' } : {}]}
                        onPress={() => setDriverName(String(item.name))}
                    >
                        {item.profile_photo ? (
                            <Image source={{ uri: item.profile_photo }} style={styles.profilePhoto} />
                        ) : (
                            <Ionicons name="person-circle-outline" size={50} color="#ccc" />
                        )}
                        <Text style={styles.driverName}>{item.name}</Text>
                    </TouchableOpacity>
                )}
                ListEmptyComponent={
                    <View style={styles.emptyContainer}>
                        <LottieView source={require('../../../assets/animations/login-anime.json')} autoPlay loop style={styles.lottie} />
                    </View>
                }
                style={styles.flatListContainer}
                showsVerticalScrollIndicator={false}
                showsHorizontalScrollIndicator={false}
            />

            {drivers?.length ? (
                <TouchableOpacity
                    style={[styles.button, driverName.length > 1 ? styles.buttonActive : {}]}
                    onPress={handleNext}
                    disabled={driverName.length < 2}
                >
                    <LinearGradient
                        colors={driverName.length > 1 ? ['#005C5C', '#008F8F', '#00BFBF', '#00FFFF'] : ['#4A4A4A', '#2D2D2D']}
                        style={styles.gradient}
                    >
                        <Text style={styles.buttonText}>Next →</Text>
                    </LinearGradient>
                </TouchableOpacity>
            ) : null}
            <TouchableOpacity style={styles.signUpButton} onPress={() => router.push('/auth/register')}>
                <LinearGradient colors={['#4A4A6A', '#2D2D44']} style={styles.gradient}>
                    <Text style={styles.signUpButtonText}>Add a driver</Text>
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
    infoBox: {
        flexDirection: 'row',
        alignItems: 'center',
        backgroundColor: '#1E1E2E',
        padding: 15,
        borderRadius: 12,
        borderWidth: 1,
        borderColor: '#333',
        marginBottom: 15,
        shadowColor: '#000',
        shadowOpacity: 0.2,
        shadowRadius: 6,
        shadowOffset: { width: 0, height: 3 },
    },
    gradientLine: {
        width: 5,
        height: '100%',
        backgroundColor: 'linear-gradient(180deg, #80B3FF, #5B8FB9)',
        borderRadius: 2,
        marginRight: 10,
    },
    titleContainer: {
        marginLeft: 12,
        flex: 1,
    },
    title: {
        fontSize: 18,
        fontWeight: 'bold',
        color: '#fff',
    },
    subtitle: {
        fontSize: 14,
        color: '#aaa',
        marginTop: 2,
    },
    emptyTitle: {
        textAlign: 'center',
        fontSize: 20,
        fontWeight: 'bold',
        color: '#fff',
        marginTop: 10,
    },
    emptySubtitle: {
        fontSize: 14,
        color: '#aaa',
        textAlign: 'center',
        marginTop: 5,
        paddingHorizontal: 20,
    },
    driverItem: {
        flexDirection: 'row',
        alignItems: 'center',
        padding: 10,
        backgroundColor: '#1e1e1e',
        marginBottom: 10,
        borderRadius: 5,
        shadowColor: '#000',
        shadowOpacity: 0.2,
        shadowRadius: 5,
        elevation: 5,
    },
    profilePhoto: {
        width: 50,
        height: 50,
        borderRadius: 5,
        marginRight: 15,
    },
    driverName: {
        fontSize: 22,
        color: '#fff',
    },
    emptyContainer: {
        alignItems: 'center',
        justifyContent: 'center',
        padding: 20,
        marginTop: 50,
    },
    lottie: {
        width: '100%',
        height: 400,
        backgroundColor: 'transparent',
    },
    flatListContainer: {
        marginVertical: 15,
        backgroundColor: 'transparent',
        borderRadius: 10,
    },
    button: {
        width: '100%',
        height: 50,
        borderRadius: 5,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#444',
        marginTop: 10,
        borderWidth: 1,
        borderColor: 'grey',
    },
    buttonActive: {
        backgroundColor: '#5c9743',
        borderWidth: 1,
        borderColor: 'white',
    },
    gradient: {
        height: '100%',
        width: '100%',
        justifyContent: 'center',
        alignItems: 'center',
    },
    buttonText: {
        fontSize: 18,
        fontWeight: 'bold',
        color: '#fff',
    },
    signUpButton: {
        width: '100%',
        height: 50,
        borderRadius: 5,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#1E1E2E',
        marginVertical: 15,
        borderWidth: 1,
        borderColor: 'grey',
    },
    signUpButtonText: {
        fontSize: 18,
        color: '#fff',
    },
})
