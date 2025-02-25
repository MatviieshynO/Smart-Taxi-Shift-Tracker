import { useDriver } from '@contexts/driverContext'
import { DeleteDriverById } from '@db/services/drivers.service'
import { Pressable, Text, StyleSheet, Alert } from 'react-native'
import Toast from 'react-native-toast-message'
import * as SecureStore from 'expo-secure-store'
import { useRouter } from 'expo-router'

export function DeleteAccountButton() {
    const { currentDriver, setCurrentDriver } = useDriver()
    const router = useRouter()

    const handleDeleteAccount = async () => {
        Alert.alert('Delete account?', 'This action cannot be undone!', [
            { text: 'Cancel', style: 'cancel' },
            {
                text: 'Видалити',
                style: 'destructive',
                onPress: async () => {
                    try {
                        // 1. Checking if the user ID exists.
                        if (!currentDriver?.id) {
                            return Toast.show({
                                type: 'error',
                                text1: 'Error',
                                text2: 'Deletion is not possible at this moment.',
                            })
                        }
                        // 2. Checking if the driver's account was successfully deleted.
                        const deleteResult = await DeleteDriverById(currentDriver?.id)
                        if (!deleteResult.success) {
                            return Toast.show({
                                type: 'error',
                                text1: 'Error',
                                text2: 'Deletion is not possible at this moment.',
                            })
                        }
                        // 3. Deleting the session and clearing the context.
                        await SecureStore.deleteItemAsync('driverSession')
                        setCurrentDriver(null)

                        // 4. Account successfully deleted.
                        router.replace('/auth/register')
                        Toast.show({
                            type: 'success',
                            text1: 'Success',
                            text2: 'You have successfully deleted your account.',
                        })
                    } catch (error) {
                        Toast.show({
                            type: 'error',
                            text1: 'Error',
                            text2: 'Deletion is not possible at this moment.',
                        })
                        return
                    }
                },
            },
        ])
    }
    return (
        <Pressable style={[styles.deleteButton]} onPress={handleDeleteAccount}>
            <Text style={[styles.deleteButtonText]}>Delete account</Text>
        </Pressable>
    )
}
const styles = StyleSheet.create({
    deleteButton: {
        shadowColor: '#ff3b30',
        marginTop: 20,
        marginBottom: 10,
    },
    deleteButtonText: {
        fontSize: 18,
        color: 'orange',
        textAlign: 'center',
        paddingBottom: 25,
        borderBottomWidth: 1,
        borderBottomColor: 'white',
    },
})
