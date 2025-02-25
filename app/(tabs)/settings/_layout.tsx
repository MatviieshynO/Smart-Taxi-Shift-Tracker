import { Stack } from 'expo-router'

export default function SettingsLayout() {
    return (
        <Stack
            screenOptions={{
                headerStyle: { backgroundColor: '#1E1E2E' },
                headerTintColor: '#FFFFFF',
                headerTitleAlign: 'center',
                headerTitleStyle: { fontSize: 20, fontWeight: 'bold' },
                headerShadowVisible: false,
            }}
        >
            <Stack.Screen name="index" options={{ title: 'SETTINGS' }} />
            <Stack.Screen name="profile" options={{ title: 'Profile settings', animation: 'slide_from_right' }} />
            <Stack.Screen name="cars" options={{ title: 'LIST OF MY CARS.', animation: 'slide_from_right' }} />
        </Stack>
    )
}
