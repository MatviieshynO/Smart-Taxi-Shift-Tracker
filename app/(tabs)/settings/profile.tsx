import React, { useState } from 'react'
import { Alert, ScrollView, StyleSheet, View, Text, Pressable, Image, Modal, TextInput } from 'react-native'
import { Ionicons } from '@expo/vector-icons'
import * as ImagePicker from 'expo-image-picker'
import { useDriver } from '@contexts/driverContext'
import { updateDriver, deleteDriver, getDriverByUserName } from '@db/services/drivers'
import Toast from 'react-native-toast-message'
import * as Crypto from 'expo-crypto'
import { useRouter } from 'expo-router'
import * as SecureStore from 'expo-secure-store'

export default function ProfileScreen() {
    const { currentDriver, updateFields, removeField, setCurrentDriver } = useDriver()

    const [isAvatarZoomModalOpen, setIsAvatarZoomModalOpen] = useState<boolean>(false)

    const [isEditDriverNameModalOpen, setIsEditDriverNameModalOpen] = useState<boolean>(false)
    const [editDriverNameData, setEditDriverNameData] = useState<string>()

    const [isChangeDriverPasswordModalOpen, setIsChangeDriverPasswordModalOpen] = useState<boolean>(false)
    const [newPassword, setNewPassword] = useState<string>('')
    const [passwordConfirm, setPasswordConfirm] = useState<string>('')

    const router = useRouter()

    const handlePickAvatar = async () => {
        const permisionResult = await ImagePicker.requestMediaLibraryPermissionsAsync()
        if (permisionResult.status !== 'granted') {
            Toast.show({
                type: 'error',
                text1: 'Error',
                text2: 'Access to the gallery is denied.',
            })
            return
        }

        const result = await ImagePicker.launchImageLibraryAsync({
            mediaTypes: ['images'],
            allowsEditing: true,
            aspect: [1, 1],
            quality: 0.8,
        })

        if (!result.canceled && result.assets.length > 0) {
            const selectedImage = result.assets[0].uri
            updateFields({ profile_photo: selectedImage })
            await updateDriver({ profile_photo: selectedImage, id: currentDriver?.id })
        }
    }
    const handleRemoveAvatar = async () => {
        try {
            removeField('profile_photo')
            await updateDriver({ profile_photo: '', id: currentDriver?.id })
            Toast.show({
                type: 'success',
                text1: 'Success',
                text2: 'Profile photo has been successfully removed.',
            })
            return
        } catch (error) {
            Toast.show({
                type: 'error',
                text1: 'Error',
                text2: 'Failed to delete.',
            })
            return
        }
    }
    const handleZoomAvatar = () => {
        setIsAvatarZoomModalOpen((prev) => !prev)
    }
    const handleEditDriverName = async () => {
        try {
            if (!editDriverNameData) {
                Toast.show({
                    type: 'error',
                    text1: 'Error',
                    text2: 'Changing the name is not possible at this time.',
                })
                return
            }

            const existsDriver = await getDriverByUserName(editDriverNameData)

            if (existsDriver) {
                Toast.show({
                    type: 'error',
                    text1: 'Error',
                    text2: 'This name is already taken.',
                })
                setEditDriverNameData('')
                return
            }

            await updateDriver({ username: editDriverNameData, id: currentDriver?.id })
            updateFields({ username: editDriverNameData })

            Toast.show({
                type: 'success',
                text1: 'Success',
                text2: 'Name field has been successfully updated.',
            })

            setIsEditDriverNameModalOpen(false)
        } catch (error) {
            console.log(error)
            Toast.show({
                type: 'error',
                text1: 'Error',
                text2: 'Failed to update the name field.',
            })
        }
    }
    const handleChangeDriverPassword = async () => {
        try {
            const hashedNewPassword = await hashPassword(newPassword)
            await updateDriver({ password: hashedNewPassword, id: currentDriver?.id })
            setIsChangeDriverPasswordModalOpen(false)
            Toast.show({
                type: 'success',
                text1: 'Success',
                text2: 'Password has been changed successfully',
            })
            return
        } catch (error) {
            Toast.show({
                type: 'error',
                text1: 'Error',
                text2: 'Password change failed. Try again.',
            })
            return
        }
    }
    const handleDeleteAccount = async () => {
        Alert.alert('Delete account?', 'This action cannot be undone!', [
            { text: 'Cancel', style: 'cancel' },
            {
                text: 'Видалити',
                style: 'destructive',
                onPress: async () => {
                    try {
                        if (!currentDriver?.id) {
                            Toast.show({
                                type: 'error',
                                text1: 'Error',
                                text2: 'At the moment, it is not possible to delete the account.',
                            })
                            return
                        }
                        await deleteDriver(currentDriver?.id)
                        await SecureStore.deleteItemAsync('driverSession')
                        setCurrentDriver({})
                        await router.replace('/auth/register')
                        Toast.show({
                            type: 'success',
                            text1: 'Success',
                            text2: 'You have successfully deleted your account.',
                        })
                    } catch (error) {
                        Toast.show({
                            type: 'error',
                            text1: 'Error',
                            text2: 'At the moment, it is not possible to delete the account.',
                        })
                        return
                    }
                },
            },
        ])
    }
    const hashPassword = async (password: string) => {
        const hashedPassword = await Crypto.digestStringAsync(Crypto.CryptoDigestAlgorithm.SHA256, password)
        return hashedPassword
    }
    return (
        <ScrollView style={styles.scrollContainer}>
            <View style={styles.avatarContainer}>
                {currentDriver?.profile_photo ? (
                    <Pressable onPress={handleZoomAvatar}>
                        <Image source={{ uri: currentDriver.profile_photo }} style={styles.avatarImage} />
                    </Pressable>
                ) : (
                    <Pressable onPress={handlePickAvatar}>
                        <Ionicons name="person-circle-outline" size={160} color="#ccc" />
                    </Pressable>
                )}
                <View style={styles.avatarButtonsWrapper}>
                    <Pressable onPress={handlePickAvatar} style={styles.avatarButtons}>
                        <Text style={styles.avatarButtonsText}>{currentDriver?.profile_photo ? 'Change avatar' : 'Download avatar'}</Text>
                    </Pressable>
                    {currentDriver?.profile_photo ? (
                        <Pressable onPress={handleRemoveAvatar} style={styles.avatarButtons}>
                            <Text style={styles.avatarButtonsText}>Remove avatar</Text>
                        </Pressable>
                    ) : null}
                </View>
            </View>
            {/* Modal for avatar zoom */}
            <Modal visible={isAvatarZoomModalOpen} transparent={true} animationType="fade">
                <Pressable style={styles.modalAvatarZoomed} onPress={() => setIsAvatarZoomModalOpen(false)}>
                    <Image source={{ uri: currentDriver?.profile_photo }} style={styles.avatarImageZoomed} />
                </Pressable>
            </Modal>
            {/*  */}
            {/* Field username for editing */}
            <Pressable style={styles.field} onPress={() => setIsEditDriverNameModalOpen(true)}>
                <Text style={styles.label}>Edit name</Text>
                <View style={styles.valueContainer}>
                    <Text style={styles.value}>{currentDriver?.username}</Text>
                    <Ionicons name="chevron-forward" size={20} color="#aaa" />
                </View>
            </Pressable>
            {/* Modal for editing username */}
            <Modal visible={isEditDriverNameModalOpen} transparent animationType="slide">
                <View style={styles.modalBackground}>
                    <View style={styles.modalContainer}>
                        <Text style={styles.modalTitle}>Enter your new name</Text>
                        <TextInput style={styles.input} value={editDriverNameData} onChangeText={setEditDriverNameData} autoFocus />

                        <View style={styles.modalButtons}>
                            <Pressable style={[styles.button, styles.modalButton]} onPress={handleEditDriverName}>
                                <Text style={styles.buttonText}>Зберегти</Text>
                            </Pressable>
                            <Pressable style={[styles.button, styles.modalCancel]} onPress={() => setIsEditDriverNameModalOpen(false)}>
                                <Text style={styles.buttonText}>Скасувати</Text>
                            </Pressable>
                        </View>
                    </View>
                </View>
            </Modal>
            {/* Field password for editing */}
            <Pressable style={styles.field} onPress={() => setIsChangeDriverPasswordModalOpen(true)}>
                <Text style={styles.label}>Change your password</Text>
                <View style={styles.valueContainer}>
                    <Text style={styles.value}>******</Text>
                    <Ionicons name="chevron-forward" size={20} color="#aaa" />
                </View>
            </Pressable>
            {/* Modal for change password */}
            <Modal visible={isChangeDriverPasswordModalOpen} transparent animationType="slide">
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
                            value={passwordConfirm}
                            onChangeText={(text) => setPasswordConfirm(text.trim())}
                            secureTextEntry={true}
                            autoCapitalize="none"
                            autoCorrect={false}
                            keyboardType="numeric"
                            maxLength={4}
                        />
                        {newPassword !== passwordConfirm && newPassword && passwordConfirm.length === 4 ? (
                            <Text style={{ color: 'orange', padding: 5 }}>Passwords do not match.</Text>
                        ) : null}

                        <View style={styles.modalButtons}>
                            <Pressable
                                style={[
                                    styles.button,
                                    styles.modalButton,
                                    newPassword !== passwordConfirm || !newPassword || !passwordConfirm ? { backgroundColor: 'grey' } : {},
                                ]}
                                onPress={handleChangeDriverPassword}
                                disabled={newPassword !== passwordConfirm}
                            >
                                <Text style={styles.buttonText}>Зберегти</Text>
                            </Pressable>
                            <Pressable
                                style={[styles.button, styles.modalCancel]}
                                onPress={() => setIsChangeDriverPasswordModalOpen(false)}
                            >
                                <Text style={styles.buttonText}>Скасувати</Text>
                            </Pressable>
                        </View>
                    </View>
                </View>
            </Modal>
            <Pressable style={[styles.deleteButton]} onPress={handleDeleteAccount}>
                <Text style={[styles.deleteButtonText]}>Delete account</Text>
            </Pressable>
        </ScrollView>
    )
}
const styles = StyleSheet.create({
    scrollContainer: {
        flex: 1,
        backgroundColor: '#121212',
        padding: 20,
    },
    avatarContainer: { alignItems: 'center', marginBottom: 20 },
    avatarImage: { width: 160, height: 160, borderRadius: 120 },
    avatarImageZoomed: {
        width: '99%',
        height: '60%',
        borderRadius: 20,
        resizeMode: 'contain',
    },
    modalAvatarZoomed: {
        flex: 1,
        backgroundColor: 'rgba(0, 0, 0, 0.8)',
        justifyContent: 'center',
        alignItems: 'center',
    },
    avatarButtonsWrapper: {
        width: '100%',
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
        gap: 10,
        marginTop: 10,
    },
    avatarButtons: {
        width: '49%',
        marginVertical: 10,
        padding: 15,
        borderWidth: 1,
        borderColor: 'white',
        borderRadius: 5,
    },
    avatarButtonsText: { color: 'white', textAlign: 'center' },
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
    deleteButton: {
        shadowColor: '#ff3b30',
        marginTop: 20,
        marginBottom: 10,
    },
    deleteButtonText: {
        fontSize: 18,
        color: 'orange',
        textAlign: 'center',
        paddingBottom: 25,
        borderBottomWidth: 1,
        borderBottomColor: 'white',
    },
})
