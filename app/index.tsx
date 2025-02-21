import { useRouter } from 'expo-router'
import { TouchableOpacity, View, Text } from 'react-native'

export default function Index() {
    const router = useRouter()
    return (
        <View
            style={{
                flex: 1,
                justifyContent: 'center',
                alignItems: 'center',
            }}
        >
            <TouchableOpacity onPress={() => router.replace('/auth/register')}>
                <Text>Registration</Text>
            </TouchableOpacity>
        </View>
    )
}
