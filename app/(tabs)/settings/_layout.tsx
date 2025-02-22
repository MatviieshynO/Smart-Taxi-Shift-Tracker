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
            <Stack.Screen name="index" options={{ title: '' }} />
            <Stack.Screen name="profile" options={{ title: '' }} />
        </Stack>
    )
}
