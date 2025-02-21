import { createTables } from '@db/db'
import { Slot } from 'expo-router'
import { useEffect } from 'react'
import Toast from 'react-native-toast-message'
import * as Updates from 'expo-updates'
import { StatusBar } from 'react-native'
import { toastConfig } from 'config/toastConfig'
import { AppProvider } from '@contexts/AppProvider'

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
