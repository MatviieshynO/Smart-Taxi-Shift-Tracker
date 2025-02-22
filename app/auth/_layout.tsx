import { Stack } from 'expo-router'

export default function AuthLayout() {
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
            <Stack.Screen name="register/index" options={{ title: '' }} />
            <Stack.Screen name="register/password" options={{ title: 'Create a Secure Password' }} />
            <Stack.Screen name="register/confirm-password" options={{ title: 'Confirm Your Password' }} />

            <Stack.Screen name="login/index" options={{ title: '' }} />
            <Stack.Screen name="login/password" options={{ title: 'Enter Your Password' }} />
        </Stack>
    )
}
