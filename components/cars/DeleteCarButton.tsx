import { useCar } from '@contexts/carContext'
import { DeleteCarById } from '@db/services/cars.service'
import { Ionicons } from '@expo/vector-icons'
import { TouchableOpacity, StyleSheet, Alert } from 'react-native'
import Toast from 'react-native-toast-message'

interface IDeleteCarButtonProps {
    carId: number
    fetchCars: () => void
}

export function DeleteCarButton({ carId, fetchCars }: IDeleteCarButtonProps) {
    const { currentCar } = useCar()

    const handleDeleteCar = () => {
        Alert.alert('Delete the car?', 'This action cannot be undone!', [
            { text: 'Cancel', style: 'cancel' },
            {
                text: 'Delete',
                style: 'destructive',
                onPress: async () => {
                    try {
                        // 1. Checking if the car ID is provided.
                        if (!carId) {
                            return Toast.show({
                                type: 'error',
                                text1: 'Error',
                                text2: 'Unexpected error while deleting the car',
                            })
                        }
                        // 2. Checking if the deletion was successful.
                        const deletedResult = await DeleteCarById(carId)
                        if (!deletedResult.success && deletedResult.errorMessage) {
                            return Toast.show({
                                type: 'error',
                                text1: 'Error',
                                text2: deletedResult.errorMessage,
                            })
                        }
                        await fetchCars()
                        return Toast.show({
                            type: 'success',
                            text1: 'Success',
                            text2: deletedResult.successMessage || 'You have successfully deleted the car.',
                        })
                    } catch (error) {
                        console.error(error)
                        return Toast.show({
                            type: 'error',
                            text1: 'Error',
                            text2: 'Unexpected error while deleting the car',
                        })
                    }
                },
            },
        ])
    }
    return (
        <>
            <TouchableOpacity
                style={[styles.deleteButton, currentCar?.id === carId ? { backgroundColor: 'grey' } : {}]}
                onPress={handleDeleteCar}
                disabled={currentCar?.id === carId}
            >
                <Ionicons name="trash-outline" size={24} color="#fff" />
            </TouchableOpacity>
        </>
    )
}
const styles = StyleSheet.create({
    deleteButton: {
        backgroundColor: '#ff453a',
        padding: 8,
        borderRadius: 10,
        alignItems: 'center',
        justifyContent: 'center',
        shadowColor: '#ff453a',
        shadowOffset: { width: 0, height: 4 },
        shadowOpacity: 0.5,
        shadowRadius: 6,
        elevation: 5,
    },
})
function useCars() {
    throw new Error('Function not implemented.')
}
