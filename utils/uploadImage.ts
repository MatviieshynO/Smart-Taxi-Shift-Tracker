import * as ImagePicker from 'expo-image-picker'
import { Alert, Linking } from 'react-native'

export async function UploadImage(): Promise<string | null | void> {
    try {
        // 1. Checking if permission has already been granted.
        let { status } = await ImagePicker.getMediaLibraryPermissionsAsync()

        // 2. If permission is not granted, request permission.
        if (status !== 'granted') {
            const { status: newStatus } = await ImagePicker.requestMediaLibraryPermissionsAsync()

            // 3. If the driver denies permission again, show an Alert.
            if (newStatus !== 'granted') {
                Alert.alert(
                    'Access to the gallery is not granted.',
                    'We cannot upload the photo without permission. You can change this in the settings.',
                    [
                        { text: 'Cancel', style: 'cancel' },
                        {
                            text: 'Open settings',
                            onPress: () => {
                                Linking.openSettings()
                            },
                        },
                    ]
                )
            }
        }

        // 4. Permission granted – opening the gallery.
        const result = await ImagePicker.launchImageLibraryAsync({
            mediaTypes: ['images'],
            allowsEditing: true,
            aspect: [1, 1],
            quality: 1,
        })

        // 5. If the user closed the gallery.
        if (result.canceled) return null

        // 6. Retrieving the URL of the selected photo.
        return result.assets[0].uri
    } catch (error) {
        console.error('Photo selection error.:', error)
    }
}
