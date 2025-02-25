import { createTables } from '@db/db'
import { Slot, useRouter, useSegments } from 'expo-router'
import { useEffect } from 'react'
import Toast from 'react-native-toast-message'
import * as Updates from 'expo-updates'
import { StatusBar, View } from 'react-native'
import { toastConfig } from 'config/toastConfig'
import { AppProvider } from '@contexts/appProvider'
import * as SecureStore from 'expo-secure-store'
import { useDriver } from '@contexts/driverContext'
import { GetDriverById } from '@db/services/drivers.service'
import { GetCarById } from '@db/services/cars.service'
import { useCar } from '@contexts/carContext'

export default function RootLayout() {
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
    return (
        <AppProvider>
            <StatusBar backgroundColor="#1E1E2E" barStyle="light-content" />
            <Slot />
            <Toast config={toastConfig} />
        </AppProvider>
    )
}
