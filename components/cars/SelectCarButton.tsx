import { useCar } from '@contexts/carContext'
import { GetCarById } from '@db/services/cars.service'
import { Ionicons } from '@expo/vector-icons'
import { TouchableOpacity, Text, StyleSheet } from 'react-native'
import Toast from 'react-native-toast-message'
import * as SecureStore from 'expo-secure-store'

interface ISelectCarButtonProps {
    carId: number
}

export function SelectCarButton({ carId }: ISelectCarButtonProps) {
    const { setCurrentCar, currentCar } = useCar()
    const handleSelectCar = async () => {
        try {
            // 1. Checking if the car ID is provided.
            if (!carId) {
                return Toast.show({
                    type: 'error',
                    text1: 'Error',
                    text2: 'Unexpected error while deleting the car',
                })
            }
            // 2. Checking if the car was retrieved by ID.
            const response = await GetCarById(carId)
            if (!response.success && response.errorMessage) {
                return Toast.show({
                    type: 'error',
                    text1: 'Error',
                    text2: response.errorMessage,
                })
            }

            // 3. Saving car data to context and Secure Storage.
            if (response.success && response.data && response.data.id) {
                setCurrentCar(response.data)
                await SecureStore.setItem('currentCar', String(response.data.id))
            }

            Toast.show({
                type: 'success',
                text1: 'Success',
                text2: `You have selected the car ${response.data?.brand} ${response.data?.model}`,
            })
        } catch (error) {}
    }
    return (
        <>
            <TouchableOpacity
                style={[
                    styles.selectButton,
                    carId === currentCar?.id ? { backgroundColor: 'green', flexDirection: 'row', justifyContent: 'center', gap: 10 } : {},
                ]}
                onPress={handleSelectCar}
                disabled={currentCar?.id === carId}
            >
                {carId === currentCar?.id ? (
                    <>
                        <Text style={styles.buttonText}>Selected</Text>
                        <Ionicons name="checkmark-circle" size={24} color="white" />
                    </>
                ) : (
                    <Text style={styles.buttonText}>Selected</Text>
                )}
            </TouchableOpacity>
        </>
    )
}
const styles = StyleSheet.create({
    selectButton: {
        backgroundColor: '#0a84ff',
        paddingVertical: 10,
        borderRadius: 10,
        flex: 1,
        alignItems: 'center',
        marginRight: 6,
        shadowColor: '#0a84ff',
        shadowOffset: { width: 0, height: 4 },
        shadowOpacity: 0.5,
        shadowRadius: 6,
        elevation: 5,
    },
    buttonText: {
        color: '#fff',
        fontWeight: 'bold',
        fontSize: 14,
    },
})
