import { useDriver } from '@contexts/driverContext'
import { UpdateDriverById } from '@db/services/drivers.service'
import { Ionicons } from '@expo/vector-icons'
import { useState } from 'react'
import { Modal, Pressable, View, Text, TextInput, StyleSheet, Alert } from 'react-native'
import Toast from 'react-native-toast-message'
import * as Crypto from 'expo-crypto'

export function DriverPasswordEditor() {
    const { currentDriver } = useDriver()
    const [isModalOpen, setIsModalOpen] = useState<boolean>(false)
    const [newPassword, setNewPassword] = useState<string>('')
    const [newPasswordConfirm, setNewPasswordConfirm] = useState<string>('')

    const handleChangeDriverPassword = async () => {
        try {
            // 1. Checking if the driver has entered data.
            if (!newPassword) {
                setNewPassword('')
                setNewPasswordConfirm('')
                return Alert.alert('Please fill in the new password field.')
            }

            // 2. Checking if the passwords match.
            if (newPassword !== newPasswordConfirm) {
                setNewPassword('')
                setNewPasswordConfirm('')
                return Alert.alert('Passwords do not match.')
            }

            // 3. Hashing the new password.
            const hashNewPassword = await hashPassword(newPassword)

            // 4. Checking if the new password has been updated in the database.
            const updateResult = await UpdateDriverById(Number(currentDriver?.id), { password: hashNewPassword })
            if (!updateResult.success) {
                setNewPassword('')
                setNewPasswordConfirm('')
                return Alert.alert('Oops, an unexpected error occurred.')
            }

            setIsModalOpen(false)
            Toast.show({
                type: 'success',
                text1: 'Success',
                text2: 'Password updated successfully.',
            })
        } catch (error) {
            setNewPassword('')
            setNewPasswordConfirm('')
            return Alert.alert('Oops, an unexpected error occurred.')
        }
    }
    const hashPassword = async (password: string) => {
        return await Crypto.digestStringAsync(Crypto.CryptoDigestAlgorithm.SHA256, password)
    }
    return (
        <>
            {/* Field password for editing */}
            <Pressable style={styles.field} onPress={() => setIsModalOpen(true)}>
                <Text style={styles.label}>Change your password</Text>
                <View style={styles.valueContainer}>
                    <Text style={styles.value}>******</Text>
                    <Ionicons name="chevron-forward" size={20} color="#aaa" />
                </View>
            </Pressable>

            {/* Modal for change password */}
            <Modal visible={isModalOpen} transparent animationType="slide">
                <View style={styles.modalBackground}>
                    <View style={styles.modalContainer}>
                        <Text style={{ color: 'white', fontSize: 12, padding: 5 }}>Enter your new password</Text>
                        <TextInput
                            style={styles.input}
                            value={newPassword}
                            onChangeText={(text) => setNewPassword(text.trim())}
                            secureTextEntry={true}
                            autoCapitalize="none"
                            autoCorrect={false}
                            keyboardType="numeric"
                            maxLength={4}
                        />
                        <Text style={{ color: 'white', fontSize: 12, padding: 5 }}>Please confirm your new password</Text>
                        <TextInput
                            style={styles.input}
                            value={newPasswordConfirm}
                            onChangeText={(text) => setNewPasswordConfirm(text.trim())}
                            secureTextEntry={true}
                            autoCapitalize="none"
                            autoCorrect={false}
                            keyboardType="numeric"
                            maxLength={4}
                        />
                        {newPassword !== newPasswordConfirm && newPassword && newPasswordConfirm.length === 4 ? (
                            <Text style={{ color: 'orange', padding: 5 }}>Passwords do not match.</Text>
                        ) : null}

                        <View style={styles.modalButtons}>
                            <Pressable
                                style={[
                                    styles.button,
                                    styles.modalButton,
                                    newPassword !== newPasswordConfirm || !newPassword || !newPasswordConfirm
                                        ? { backgroundColor: 'grey' }
                                        : {},
                                ]}
                                onPress={handleChangeDriverPassword}
                                disabled={newPassword !== newPasswordConfirm}
                            >
                                <Text style={styles.buttonText}>Save</Text>
                            </Pressable>
                            <Pressable style={[styles.button, styles.modalCancel]} onPress={() => setIsModalOpen(false)}>
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
