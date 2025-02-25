import { useState } from 'react'
import { StyleSheet, TouchableOpacity, Image, Modal, Pressable } from 'react-native'

interface IImageCarViewerProps {
    uri: string
}

export function ImageCarViewer({ uri }: IImageCarViewerProps) {
    const [isCarPhotoZoomOpen, setIsCarPhotoZoomOpen] = useState<boolean>(false)

    const handleZoomCarPhoto = () => {
        setIsCarPhotoZoomOpen((prev) => !prev)
    }
    return (
        <>
            <TouchableOpacity style={styles.imageContainer} onPress={handleZoomCarPhoto}>
                <Image source={{ uri }} style={styles.carImage} />
            </TouchableOpacity>
            <Modal visible={isCarPhotoZoomOpen} transparent={true} animationType="fade">
                <Pressable style={styles.modalPhotoZoomed} onPress={() => setIsCarPhotoZoomOpen(false)}>
                    <Image source={{ uri }} style={styles.photoZoomed} />
                </Pressable>
            </Modal>
        </>
    )
}
const styles = StyleSheet.create({
    imageContainer: {
        overflow: 'hidden',
        marginRight: 15,
        width: 160,
        height: 150,
        alignItems: 'center',
        justifyContent: 'center',
        shadowColor: '#000',
        shadowOffset: { width: 3, height: 3 },
        shadowOpacity: 0.5,
        shadowRadius: 8,
    },
    carImage: {
        width: '100%',
        height: '100%',
        borderRadius: 5,
    },
    photoZoomed: {
        width: '99%',
        height: '60%',
        borderRadius: 20,
        resizeMode: 'contain',
    },
    modalPhotoZoomed: {
        flex: 1,
        backgroundColor: 'rgba(0, 0, 0, 0.8)',
        justifyContent: 'center',
        alignItems: 'center',
    },
})
