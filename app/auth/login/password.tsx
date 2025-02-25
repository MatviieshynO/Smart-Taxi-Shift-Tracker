import { useEffect, useState } from 'react'
import { Text, StyleSheet } from 'react-native'
import { useLocalSearchParams, useRouter } from 'expo-router'
import { CodeField, useBlurOnFulfill, useClearByFocusCell } from 'react-native-confirmation-code-field'
import Toast from 'react-native-toast-message'
import * as SecureStore from 'expo-secure-store'
import { DriverAuthorization } from '@db/services/auth.service'
import { useDriver } from '@contexts/driverContext'
import { LinearGradient } from 'expo-linear-gradient'

export default function LoginPassword() {
    const { driverName } = useLocalSearchParams()
    const [driverPassword, setDriverPassword] = useState('')
    const router = useRouter()
    const { setCurrentDriver } = useDriver()

    const ref = useBlurOnFulfill({ value: driverPassword, cellCount: 4 })
    const [props, getCellOnLayoutHandler] = useClearByFocusCell({ value: driverPassword, setValue: setDriverPassword })

    const handleSubmit = async () => {
        try {
            const response = await DriverAuthorization(String(driverName), String(driverPassword))
            if (!response.success && response.errorMessage) {
                Toast.show({
                    type: 'error',
                    text1: 'Error:!',
                    text2: response.errorMessage,
                })
                setDriverPassword('')
                return
            }
            if (response.success && response.data) {
                await SecureStore.setItemAsync('driverSession', String(response.data?.id))
                setCurrentDriver({ ...response.data, password: '' })
                Toast.show({
                    type: 'success',
                    text1: 'Success:',
                    text2: response.successMessage,
                })
                router.replace('/')
            }
            return
        } catch (error) {
            Toast.show({
                type: 'error',
                text1: 'Oops!',
                text2: 'Authorization error, please try again.',
            })
            router.replace('/auth/login')
        }
    }

    useEffect(() => {
        if (driverPassword.length === 4) {
            handleSubmit()
        }
    }, [driverPassword])

    return (
        <LinearGradient colors={['#1E1E2E', '#03001C', '#301E67', '#F5F5F5', '#5B8FB9', '#80B3FF', '#B8E4FF']} style={styles.constainer}>
            <CodeField
                ref={ref}
                {...props}
                value={driverPassword}
                onChangeText={setDriverPassword}
                cellCount={4}
                keyboardType="number-pad"
                rootStyle={styles.codeFieldRoot}
                textContentType="oneTimeCode"
                renderCell={({ index, symbol, isFocused }) => (
                    <Text
                        key={index}
                        style={[styles.cell, isFocused && styles.focusCell, symbol && styles.filledCell]}
                        onLayout={getCellOnLayoutHandler(index)}
                    >
                        {symbol ? '•' : isFocused ? '|' : ''}
                    </Text>
                )}
            />
        </LinearGradient>
    )
}
const styles = StyleSheet.create({
    constainer: { flex: 1, justifyContent: 'center', backgroundColor: '#1E1E2E' },
    codeFieldRoot: {
        paddingHorizontal: 25,
    },
    cell: {
        width: 70,
        height: 70,
        lineHeight: 65,
        fontSize: 30,
        textAlign: 'center',
        borderWidth: 1,
        borderColor: 'white',
        borderRadius: 10,
        backgroundColor: '#2D2D44',
        color: 'white',
    },
    focusCell: {
        borderColor: 'yellow',
        backgroundColor: '#3A3A52',
    },
    filledCell: {
        color: 'white',
    },
})
