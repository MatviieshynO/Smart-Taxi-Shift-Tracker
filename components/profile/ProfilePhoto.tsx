import { useDriver } from '@contexts/driverContext'
import { UpdateDriverById } from '@db/services/drivers.service'
import { Ionicons } from '@expo/vector-icons'
import { UploadImage } from '@utils/uploadImage'
import { useState } from 'react'
import { View, StyleSheet, Modal, Pressable, Image, Text } from 'react-native'
import Toast from 'react-native-toast-message'

export function ProfilePhoto() {
    const { currentDriver, updateCurrentDriverFields } = useDriver()

    const [isProfilePhotoZoomOpen, setIsProfilePhotoZoomOpen] = useState<boolean>(false)

    const handleUploadProfilePhoto = async () => {
        try {
            // 1. Checking the retrieval of the photo URL.
            const photoUri = await UploadImage()
            if (!photoUri) {
                Toast.show({
                    type: 'error',
                    text1: 'Error',
                    text2: 'Unexpected error while uploading the photo.',
                })
                return
            }
            // 2. Checking if the photo URL was successfully saved to the database.
            const response = await UpdateDriverById(Number(currentDriver?.id), { profile_photo: photoUri })
            if (!response.success && response.errorMessage) {
                Toast.show({
                    type: 'error',
                    text1: 'Error',
                    text2: response.errorMessage || 'Unexpected error while uploading the photo.',
                })
                return
            }

            // 3. Saving the photo URL in the context of the current driver.
            updateCurrentDriverFields({ profile_photo: photoUri })
            Toast.show({
                type: 'success',
                text1: 'Success',
                text2: 'Photo saved successfully.',
            })
        } catch (error) {
            Toast.show({
                type: 'error',
                text1: 'Error',
                text2: 'Unexpected error while uploading the photo.',
            })
        }
    }
    const handleRemoveProfilePhoto = async () => {
        try {
            // 1. Checking if the deletion was successful.
            const deletionResult = await UpdateDriverById(Number(currentDriver?.id), { profile_photo: '' })
            if (!deletionResult.success) {
                Toast.show({
                    type: 'error',
                    text1: 'Error',
                    text2: 'Failed to delete photo.',
                })
                return
            }

            // 2. Deleting the photo URL value from the context.
            updateCurrentDriverFields({ profile_photo: '' })
            Toast.show({
                type: 'success',
                text1: 'Success',
                text2: 'Profile photo has been successfully removed.',
            })
        } catch (error) {
            Toast.show({
                type: 'error',
                text1: 'Error',
                text2: 'Failed to delete.',
            })
            return
        }
    }
    const handleZoomProfilePhoto = () => {
        setIsProfilePhotoZoomOpen((prev) => !prev)
    }
    return (
        <View style={styles.container}>
            {/* Profile image */}
            <View style={styles.photoWrapper}>
                {currentDriver?.profile_photo ? (
                    <Pressable onPress={handleZoomProfilePhoto}>
                        <Image source={{ uri: currentDriver.profile_photo }} style={styles.photo} />
                    </Pressable>
                ) : (
                    <Pressable>
                        <Ionicons name="person-circle-outline" size={160} color="#ccc" />
                    </Pressable>
                )}
            </View>
            {/* Profile image buttons */}
            <View style={styles.photoButtonsWrapper}>
                <Pressable style={styles.photoButtons} onPress={handleUploadProfilePhoto}>
                    <Text style={styles.photoButtonsText}>{currentDriver?.profile_photo ? 'Change photo' : 'Download photo'}</Text>
                </Pressable>
                {currentDriver?.profile_photo ? (
                    <Pressable onPress={handleRemoveProfilePhoto} style={styles.photoButtons}>
                        <Text style={styles.photoButtonsText}>Remove avatar</Text>
                    </Pressable>
                ) : null}
            </View>
            {/* Modal for profilee photo zoom */}
            <Modal visible={isProfilePhotoZoomOpen} transparent={true} animationType="fade">
                <Pressable style={styles.modalPhotoZoomed} onPress={() => setIsProfilePhotoZoomOpen(false)}>
                    <Image source={{ uri: currentDriver?.profile_photo }} style={styles.photoZoomed} />
                </Pressable>
            </Modal>
        </View>
    )
}
const styles = StyleSheet.create({
    container: { alignItems: 'center', marginBottom: 20 },
    photoWrapper: {},
    photo: { width: 160, height: 160, borderRadius: 120 },
    photoButtonsWrapper: {
        width: '100%',
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
        gap: 10,
        marginTop: 10,
    },
    photoButtons: {
        width: '49%',
        marginVertical: 10,
        padding: 15,
        borderWidth: 1,
        borderColor: 'white',
        borderRadius: 5,
    },
    photoButtonsText: { color: 'white', textAlign: 'center' },
    modalPhotoZoomed: {
        flex: 1,
        backgroundColor: 'rgba(0, 0, 0, 0.8)',
        justifyContent: 'center',
        alignItems: 'center',
    },

    photoZoomed: {
        width: '99%',
        height: '60%',
        borderRadius: 20,
        resizeMode: 'contain',
    },
})
