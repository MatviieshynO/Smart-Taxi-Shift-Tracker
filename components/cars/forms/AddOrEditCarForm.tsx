import { ICar } from '@db/types'
import { Ionicons } from '@expo/vector-icons'
import { Modal, Pressable, TextInput, View, Text, StyleSheet, Image } from 'react-native'

interface IAddOrEditCarFormProps {
    isOpenModal: boolean
    data: ICar
    setIsOpenModal: (isOpen: boolean) => void
    setData: (car: ICar) => void
    handleUploadImage: () => void
    handleSubmit: () => void
}

export function AddOrEditCarForm({ isOpenModal, setIsOpenModal, handleUploadImage, setData, data, handleSubmit }: IAddOrEditCarFormProps) {
    return (
        <Modal visible={isOpenModal} transparent animationType="slide">
            <View style={styles.modalBackground}>
                <View style={styles.modalContainer}>
                    <Pressable onPress={handleUploadImage} style={styles.imagePicker}>
                        {data?.profile_photo ? (
                            <Image source={{ uri: data.profile_photo }} style={styles.carImage} />
                        ) : (
                            <Ionicons name="camera-outline" size={50} color="#fff" />
                        )}
                        <Text style={styles.imageText}>{data?.profile_photo ? 'Change photo' : 'Add photo'}</Text>
                    </Pressable>

                    <TextInput
                        style={styles.input}
                        placeholder="Brand"
                        placeholderTextColor="#aaa"
                        value={data?.brand || ''}
                        onChangeText={(text) => setData({ ...data, brand: text.trim() })}
                    />
                    <TextInput
                        style={styles.input}
                        placeholder="Model"
                        placeholderTextColor="#aaa"
                        value={data?.model}
                        onChangeText={(text) => setData({ ...data, model: text.trim() })}
                    />
                    <TextInput
                        style={styles.input}
                        placeholder="License Plate"
                        placeholderTextColor="#aaa"
                        value={data?.plate || ''}
                        onChangeText={(text) => setData({ ...data, plate: text.trim() })}
                    />
                    <TextInput
                        style={styles.input}
                        placeholder="Fuel Type"
                        placeholderTextColor="#aaa"
                        value={data?.fuel_type || ''}
                        onChangeText={(text) => setData({ ...data, fuel_type: text.trim() })}
                    />
                    <TextInput
                        style={styles.input}
                        placeholder="Fuel Consumption (L/100km)"
                        placeholderTextColor="#aaa"
                        value={data?.fuel_consumption ? String(data.fuel_consumption) : ''}
                        onChangeText={(text) => setData({ ...data, fuel_consumption: text.trim() })}
                        keyboardType="numeric"
                    />

                    {/* Кнопки дій */}
                    <View style={styles.modalButtons}>
                        <Pressable style={[styles.button, styles.modalButton]} onPress={handleSubmit}>
                            <Text style={styles.buttonText}>Save</Text>
                        </Pressable>
                        <Pressable style={[styles.button, styles.modalCancel]} onPress={() => setIsOpenModal(false)}>
                            <Text style={styles.buttonText}>Back</Text>
                        </Pressable>
                    </View>
                </View>
            </View>
        </Modal>
    )
}

const styles = StyleSheet.create({
    modalBackground: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: 'rgba(0, 0, 0, 0.8)',
    },
    modalContainer: {
        width: '90%',
        backgroundColor: '#1e1e1e',
        padding: 24,
        borderRadius: 14,
        shadowColor: '#000',
        shadowOpacity: 0.4,
        shadowRadius: 10,
        elevation: 6,
    },
    imagePicker: {
        alignItems: 'center',
        marginBottom: 16,
    },
    carImage: {
        width: 100,
        height: 100,
        borderRadius: 50,
        borderWidth: 2,
        borderColor: '#007bff',
    },
    imageText: {
        color: '#aaa',
        marginTop: 6,
        fontSize: 14,
    },
    input: {
        backgroundColor: '#2e2e2e',
        color: '#fff',
        padding: 14,
        borderRadius: 10,
        fontSize: 16,
        marginBottom: 12,
        borderWidth: 1,
        borderColor: '#444',
    },
    modalButtons: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginTop: 20,
    },
    modalButton: {
        flex: 1,
        paddingVertical: 14,
        borderRadius: 12,
        alignItems: 'center',
        marginHorizontal: 5,
        shadowColor: '#007bff',
        shadowOpacity: 0.5,
        shadowRadius: 8,
        elevation: 5,
    },
    modalCancel: {
        backgroundColor: '#555',
        padding: 20,
    },
    buttonText: {
        fontSize: 18,
        fontWeight: 'bold',
        color: '#fff',
    },
    button: {
        backgroundColor: '#007bff',
        paddingVertical: 12,
        borderRadius: 12,
        alignItems: 'center',
        marginVertical: 10,
        shadowColor: '#007bff',
        shadowOpacity: 0.4,
        shadowRadius: 8,
        elevation: 5,
        marginTop: 30,
    },
})
