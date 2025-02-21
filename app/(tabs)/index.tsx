import { useRouter } from 'expo-router'
import { TouchableOpacity, View, Text } from 'react-native'
import * as SecureStore from 'expo-secure-store'
import { useDriver } from '@contexts/driverContext'

export default function Index() {
    const router = useRouter()
    const { setCurrentDriver } = useDriver()
    return (
        <View
            style={{
                flex: 1,
                justifyContent: 'center',
                alignItems: 'center',
            }}
        >
            <TouchableOpacity
                onPress={async () => {
                    await SecureStore.deleteItemAsync('driverSession')
                    setCurrentDriver(null)
                    router.replace('/auth/login')
                }}
            >
                <Text>LOgout</Text>
            </TouchableOpacity>
        </View>
    )
}
