import { useDriver } from '@contexts/driverContext'
import { GetDriverByName, UpdateDriverById } from '@db/services/drivers.service'
import { Ionicons } from '@expo/vector-icons'
import { useState } from 'react'
import { Modal, Pressable, View, Text, TextInput, StyleSheet, Alert } from 'react-native'
import Toast from 'react-native-toast-message'

export function DriverNameEditor() {
    const { currentDriver, updateCurrentDriverFields } = useDriver()

    const [isOpenModal, setIsOpenModal] = useState<boolean>(false)
    const [newName, setNewName] = useState<string>(currentDriver?.name || '')

    const handleEditDriverName = async () => {
        try {
            // 1. Checking if the driver has entered data.
            if (!newName) {
                setNewName('')
                return Alert.alert('Please fill in the name field.')
            }
            // 2. Checking if the user did not enter their old name.
            if (newName === currentDriver?.name) {
                return Alert.alert('You entered your old name.')
            }
            // 3. Checking if a driver with this name already exists.
            const existsDriver = await GetDriverByName(newName)
            if (existsDriver.success) {
                setNewName('')
                return Alert.alert('The name is already taken by another driver.')
            }

            // 4. Checking if the update was successful.
            const updateResult = await UpdateDriverById(Number(currentDriver?.id), { name: newName })
            if (!updateResult.success) {
                setNewName('')
                return Alert.alert('Oops, an unexpected error occurred.')
            }
            // 5. Updating the name field in the context and closing modal .
            updateCurrentDriverFields({ name: newName })
            setIsOpenModal(false)
            Toast.show({
                type: 'success',
                text1: 'Success',
                text2: 'Name changed successfully.',
            })
        } catch (error) {
            setNewName('')
            return Alert.alert('Oops, an unexpected error occurred.')
        }
    }
    return (
        <>
            <Pressable style={styles.field} onPress={() => setIsOpenModal(true)}>
                <Text style={styles.label}>Edit name</Text>
                <View style={styles.valueContainer}>
                    <Text style={styles.value}>{currentDriver?.name}</Text>
                    <Ionicons name="chevron-forward" size={20} color="#aaa" />
                </View>
            </Pressable>

            {/* Modal for editing username */}
            <Modal visible={isOpenModal} transparent animationType="slide">
                <View style={styles.modalBackground}>
                    <View style={styles.modalContainer}>
                        <Text style={styles.modalTitle}>Enter your new name</Text>
                        <TextInput style={styles.input} value={newName} onChangeText={(text) => setNewName(text.trim())} autoFocus />

                        <View style={styles.modalButtons}>
                            <Pressable
                                style={[
                                    styles.button,
                                    styles.modalButton,
                                    currentDriver?.name === newName ? { backgroundColor: 'grey' } : {},
                                ]}
                                onPress={handleEditDriverName}
                                disabled={currentDriver?.name === newName}
                            >
                                <Text style={styles.buttonText}>Change</Text>
                            </Pressable>
                            <Pressable style={[styles.button, styles.modalCancel]} onPress={() => setIsOpenModal(false)}>
                                <Text style={styles.buttonText}>Cancel</Text>
                            </Pressable>
                        </View>
                    </View>
                </View>
            </Modal>
        </>
    )
}
const styles = StyleSheet.create({
    field: {
        paddingVertical: 15,
        borderBottomWidth: 1,
        borderBottomColor: '#333',
    },
    label: {
        fontSize: 11,
        color: '#aaa',
    },
    valueContainer: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
    },
    value: {
        fontSize: 22,
        fontWeight: 'bold',
        color: '#fff',
    },
    modalBackground: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: 'rgba(0,0,0,0.7)',
    },
    modalContainer: {
        width: '80%',
        backgroundColor: '#1e1e1e',
        padding: 20,
        borderRadius: 10,
    },
    modalTitle: {
        fontSize: 20,
        fontWeight: 'bold',
        color: '#fff',
        marginBottom: 10,
    },
    input: {
        backgroundColor: '#2e2e2e',
        color: '#fff',
        padding: 12,
        borderRadius: 8,
        fontSize: 16,
        marginBottom: 15,
    },
    modalButtons: {
        flexDirection: 'row',
        justifyContent: 'space-between',
    },
    modalButton: {
        flex: 1,
        marginRight: 10,
    },
    modalCancel: {
        backgroundColor: '#555',
        flex: 1,
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
    buttonText: {
        fontSize: 18,
        fontWeight: 'bold',
        color: '#fff',
    },
})
