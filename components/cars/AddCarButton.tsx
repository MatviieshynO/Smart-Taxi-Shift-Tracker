import { useDriver } from '@contexts/driverContext'
import { AddNewCar } from '@db/services/cars.service'
import { ICar } from '@db/types'
import { Ionicons } from '@expo/vector-icons'
import { UploadImage } from '@utils/uploadImage'
import { LinearGradient } from 'expo-linear-gradient'
import { useState } from 'react'
import { Text, StyleSheet, Alert, TouchableOpacity } from 'react-native'
import Toast from 'react-native-toast-message'
import { AddOrEditCarForm } from './forms/AddOrEditCarForm'

interface IAddCarButtonProps {
    fetchCars: () => void
}

export function AddCarButtron({ fetchCars }: IAddCarButtonProps) {
    const [isOpenModal, setIsOpenModal] = useState<boolean>(false)
    const { currentDriver } = useDriver()

    const initialCarData: ICar = {
        driver_id: Number(currentDriver?.id),
        brand: '',
        model: '',
        plate: '',
        fuel_type: '',
        fuel_consumption: '',
        profile_photo: '',
    }
    const [newCarData, setNewCarData] = useState<ICar>(initialCarData)

    const handleSubmit = async () => {
        try {
            // 1. Checking for empty fields.
            const emptyFields = Object.entries(newCarData)
                .filter(([_, value]) => value === '' || value === undefined)
                .map(([key]) => key)
            if (emptyFields.length > 0) {
                return Alert.alert(`The ${emptyFields[0]} is empty.`)
            }

            // 2. Checking if the new car was created successfully.
            const response = await AddNewCar({ ...newCarData, driver_id: Number(currentDriver?.id) })
            if (!response.success && response.errorMessage) {
                setNewCarData(initialCarData)
                return Alert.alert(response.errorMessage)
            }

            //3. Returning a message about the successful addition of the car.
            setIsOpenModal(false)
            setNewCarData(initialCarData)
            Toast.show({
                type: 'success',
                text1: 'Success',
                text2: 'Car added successfully.',
            })
            await fetchCars()
        } catch (error) {}
    }

    const handleUploadCarImage = async () => {
        try {
            // 1. Checking the retrieval of the photo URL.
            const photoUri = await UploadImage()
            if (!photoUri) {
                return
            }
            // 2. Saving the URL in the local state
            setNewCarData((prev) => ({ ...prev, profile_photo: String(photoUri) }))
        } catch (error) {
            Alert.alert('Error: Unexpected error while uploading the photo.')
        }
    }
    return (
        <>
            <TouchableOpacity style={styles.addButton} onPress={() => setIsOpenModal(true)}>
                <LinearGradient colors={['#007bff', '#0056b3']} style={styles.addButtonGradient}>
                    <Ionicons name="add-circle-outline" size={24} color="#fff" />
                    <Text style={styles.addButtonText}>Додати авто</Text>
                </LinearGradient>
            </TouchableOpacity>
            <AddOrEditCarForm
                handleSubmit={handleSubmit}
                handleUploadImage={handleUploadCarImage}
                setData={setNewCarData}
                data={newCarData}
                setIsOpenModal={setIsOpenModal}
                isOpenModal={isOpenModal}
            />
        </>
    )
}
const styles = StyleSheet.create({
    addButton: {
        flexDirection: 'row',
        paddingVertical: 14,
        paddingHorizontal: 20,
        borderRadius: 12,
        alignItems: 'center',
        justifyContent: 'center',
        marginTop: 20,
        overflow: 'hidden',
    },
    addButtonGradient: {
        flex: 1,
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: 12,
        paddingVertical: 14,
    },
    addButtonText: {
        fontSize: 18,
        fontWeight: 'bold',
        color: '#fff',
        marginLeft: 10,
        textTransform: 'uppercase',
    },
})
