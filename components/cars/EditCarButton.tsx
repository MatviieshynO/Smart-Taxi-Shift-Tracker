import { Ionicons } from '@expo/vector-icons'
import { Alert, StyleSheet, TouchableOpacity } from 'react-native'
import { AddOrEditCarForm } from './forms/AddOrEditCarForm'
import { useDriver } from '@contexts/driverContext'
import { useState } from 'react'
import { ICar } from '@db/types'
import { UpdateCarById } from '@db/services/cars.service'
import Toast from 'react-native-toast-message'
import { UploadImage } from '@utils/uploadImage'
import { useCar } from '@contexts/carContext'

interface IEditCarButtonProps {
    fetchCars: () => void
    car: ICar
}

export function EditCarButton({ fetchCars, car }: IEditCarButtonProps) {
    const [isOpenModal, setIsOpenModal] = useState<boolean>(false)
    const [selectCarData, setSelectCarData] = useState<ICar>(car)

    const { currentDriver } = useDriver()
    const { currentCar } = useCar()

    const handleSubmit = async () => {
        try {
            // 1. Checking for empty fields.
            const emptyFields = Object.entries(selectCarData)
                .filter(([_, value]) => value === '' || value === undefined)
                .map(([key]) => key)
            if (emptyFields.length > 0) {
                return Alert.alert(`The ${emptyFields[0]} is empty.`)
            }

            // 2. Checking if car data has been updated
            const response = await UpdateCarById(Number(selectCarData?.id), { ...selectCarData, driver_id: Number(currentDriver?.id) })
            if (!response.success && response.errorMessage) {
                setSelectCarData(selectCarData)
                return Alert.alert(response.errorMessage)
            }

            //3. Returning a message about the successful addition of the car.
            setIsOpenModal(false)
            setSelectCarData(selectCarData)
            Toast.show({
                type: 'success',
                text1: 'Success',
                text2: 'Car changed successfully.',
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
            setSelectCarData((prev) => ({ ...prev, profile_photo: String(photoUri) }))
        } catch (error) {
            Alert.alert('Error: Unexpected error while uploading the photo.')
        }
    }

    return (
        <>
            <TouchableOpacity
                style={[styles.editButton, currentCar?.id === car.id ? { backgroundColor: 'grey' } : {}]}
                onPress={() => setIsOpenModal(true)}
                disabled={currentCar?.id === car.id}
            >
                <Ionicons name="pencil-outline" size={24} color="#fff" />
            </TouchableOpacity>
            <AddOrEditCarForm
                handleSubmit={handleSubmit}
                handleUploadImage={handleUploadCarImage}
                setData={setSelectCarData}
                data={selectCarData}
                setIsOpenModal={setIsOpenModal}
                isOpenModal={isOpenModal}
            />
        </>
    )
}
const styles = StyleSheet.create({
    editButton: {
        backgroundColor: '#ffcc00',
        padding: 8,
        borderRadius: 10,
        marginRight: 6,
        alignItems: 'center',
        justifyContent: 'center',
        shadowColor: '#ffcc00',
        shadowOffset: { width: 0, height: 4 },
        shadowOpacity: 0.5,
        shadowRadius: 6,
        elevation: 5,
    },
})
