import { createTables } from '@db/db'
import { Slot, useRouter } from 'expo-router'
import { useEffect } from 'react'
import Toast from 'react-native-toast-message'
import * as Updates from 'expo-updates'
import { StatusBar } from 'react-native'
import { toastConfig } from 'config/toastConfig'
import { AppProvider } from '@contexts/appProvider'
import * as SecureStore from 'expo-secure-store'
import { useDriver } from '@contexts/driverContext'
import { getDriverById } from '@db/services/drivers'

export default function RootLayout() {
    return (
        <AppProvider>
            <RootContent />
        </AppProvider>
    )
}

function RootContent() {
    const { setCurrentDriver } = useDriver()
    const router = useRouter()

    useEffect(() => {
        async function initDB() {
            try {
                await createTables()
            } catch (error) {
                await Updates.reloadAsync()
            }
        }
        initDB()
    }, [])

    useEffect(() => {
        async function checkSession() {
            try {
                const driverId = await SecureStore.getItemAsync('driverSession')
                if (!driverId) {
                    setCurrentDriver({})
                    router.replace('/auth/login')
                }
                const currentDriver = await getDriverById(String(driverId))
                if (!currentDriver) {
                    setCurrentDriver({})
                    router.replace('/auth/login')
                }
                setCurrentDriver(currentDriver)
                router.replace('/')
            } catch (error) {
                await SecureStore.deleteItemAsync('driverSessin')
                setCurrentDriver({})
                router.replace('/auth/login')
            }
        }
        checkSession()
    }, [])

    return (
        <>
            <StatusBar backgroundColor="#1E1E2E" barStyle="light-content" />
            <Slot />
            <Toast config={toastConfig} />
        </>
    )
}
