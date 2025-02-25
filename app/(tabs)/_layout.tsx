import { Tabs, useRouter } from 'expo-router'
import { Ionicons } from '@expo/vector-icons'
import { useEffect } from 'react'
import { useDriver } from '@contexts/driverContext'
import { useCar } from '@contexts/carContext'
import * as SecureStore from 'expo-secure-store'
import { GetDriverById } from '@db/services/drivers.service'
import { GetCarById } from '@db/services/cars.service'

export default function TabsLayout() {
    const { updateCurrentDriverFields } = useDriver()
    const { setCurrentCar } = useCar()
    const router = useRouter()

    useEffect(() => {
        async function checkSession() {
            try {
                // 1. Retrieve driver ID from local storage
                const driverId = await SecureStore.getItemAsync('driverSession')

                // 2. If driverId is missing → remove state and redirect to login
                if (!driverId) {
                    return router.replace('/error')
                }
                // 3. Fetch driver data from the database
                const currentDriver = await GetDriverById(Number(driverId))

                // 4. If driver data is not found → remove session and redirect to login
                if (!currentDriver.success || !currentDriver.data?.id) {
                    await SecureStore.deleteItemAsync('driverSession')
                    return router.replace('/auth/login')
                }

                // 5. Update driver data, hiding the password
                updateCurrentDriverFields({ ...currentDriver.data, password: '' })
                return router.replace('/')
            } catch (error) {
                console.error('Session check error:', error)
                // 7. If an error occurs → remove session and redirect to login
                await SecureStore.deleteItemAsync('driverSession')
                router.replace('/auth/login')
            }
        }

        checkSession()
    }, [])
    useEffect(() => {
        async function setCurrentDriverCar() {
            try {
                // 1. Retrieving car ID from SecureStore.
                const carId = await SecureStore.getItemAsync('currentCar')
                if (!carId) return

                // 2. Checking if a car with this ID exists.
                const response = await GetCarById(Number(carId))
                if (!response.success || !response.data) {
                    return await SecureStore.deleteItemAsync('currentCar')
                }

                // 3. Saving car data to context.
                setCurrentCar(response.data)
            } catch (error) {
                console.error('Error setting current car:', error)
            }
        }

        setCurrentDriverCar()
    }, [])

    return (
        <Tabs
            screenOptions={{
                tabBarStyle: {
                    backgroundColor: '#1E1E2E',
                    borderTopWidth: 0,
                    height: 60,
                    paddingBottom: 10,
                },
                tabBarActiveTintColor: '#FFF',
                tabBarInactiveTintColor: '#888',
                headerShown: false,
                tabBarLabelStyle: {
                    fontSize: 12,
                    fontWeight: '500',
                    letterSpacing: 0.5,
                },
            }}
        >
            <Tabs.Screen
                name="index"
                options={{
                    title: 'Home',
                    tabBarIcon: ({ color, size }) => <Ionicons name="home-outline" size={size} color={color} />,
                }}
            />
            <Tabs.Screen
                name="shift"
                options={{
                    title: 'Shift',
                    tabBarIcon: ({ color, size }) => <Ionicons name="time-outline" size={size} color={color} />,
                }}
            />
            <Tabs.Screen
                name="settings"
                options={{
                    title: 'Settings',
                    tabBarIcon: ({ color, size }) => <Ionicons name="settings-outline" size={size} color={color} />,
                }}
            />
        </Tabs>
    )
}
