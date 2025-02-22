import { Tabs } from 'expo-router'
import { Ionicons } from '@expo/vector-icons'

export default function TabsLayout() {
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
