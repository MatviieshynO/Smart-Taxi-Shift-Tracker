import { Stack } from 'expo-router'

export default function AuthLayout() {
    return (
        <Stack
            screenOptions={{
                headerStyle: { backgroundColor: '#1E1E2E' }, // 🔹 Темний фон
                headerTintColor: '#FFFFFF', // 🔹 Білий текст
                headerTitleAlign: 'center', // 🔹 Вирівнювання тексту по центру
                headerTitleStyle: { fontSize: 20, fontWeight: 'bold' }, // 🔹 Стиль тексту заголовка
                headerShadowVisible: false, // 🔹 Вимкнення тіні під заголовком для чистого вигляду
            }}
        >
            {/* 🔹 Реєстрація */}
            <Stack.Screen name="register/index" options={{ title: '' }} />
            <Stack.Screen name="register/password" options={{ title: 'Create a Secure Password' }} />
            <Stack.Screen name="register/confirm-password" options={{ title: 'Confirm Your Password' }} />

            {/* 🔹 Вхід */}
            <Stack.Screen name="login/index" options={{ title: '' }} />
            <Stack.Screen name="login/password" options={{ title: 'Enter Your Password' }} />
        </Stack>
    )
}
