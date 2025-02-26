import { Slot } from 'expo-router'
import Toast from 'react-native-toast-message'
import { StatusBar } from 'react-native'
import { toastConfig } from 'config/toastConfig'
import { AppProvider } from '@contexts/appProvider'

export default function RootLayout() {
    return (
        <AppProvider>
            <StatusBar backgroundColor="#1E1E2E" barStyle="light-content" />
            <Slot />
            <Toast config={toastConfig} />
        </AppProvider>
    )
}
