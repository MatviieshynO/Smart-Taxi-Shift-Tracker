import { useEffect, useState } from 'react'
import { Text, StyleSheet } from 'react-native'
import { useLocalSearchParams, useRouter } from 'expo-router'
import { CodeField, useBlurOnFulfill, useClearByFocusCell } from 'react-native-confirmation-code-field'
import Toast from 'react-native-toast-message'
import { DriverRegistration } from '@db/services/auth.service'
import { LinearGradient } from 'expo-linear-gradient'

export default function ConfirmPassword() {
    const { driverName, driverPassword } = useLocalSearchParams()
    const [driverPasswordConfirm, setDriverPasswordConfirm] = useState<string>('')
    const router = useRouter()
    const ref = useBlurOnFulfill({ value: driverPasswordConfirm, cellCount: 4 })
    const [props, getCellOnLayoutHandler] = useClearByFocusCell({ value: driverPasswordConfirm, setValue: setDriverPasswordConfirm })
    const handleSubmit = async () => {
        try {
            const response = await DriverRegistration(String(driverName), String(driverPassword), driverPasswordConfirm)
            if (!response.success && response.errorMessage) {
                Toast.show({
                    type: 'error',
                    text1: 'Error:!',
                    text2: response.errorMessage,
                })
                return router.replace('/auth/register')
            }
            Toast.show({
                type: 'success',
                text1: 'Success:!',
                text2: response.successMessage,
            })
            router.replace('/auth/login')
        } catch (error) {
            Toast.show({
                type: 'error',
                text1: 'Oops!',
                text2: 'Registration error, please try again.',
            })
            return router.replace('/auth/register')
        }
    }

    useEffect(() => {
        if (driverPasswordConfirm.length === 4) {
            handleSubmit()
        }
    }, [driverPasswordConfirm])

    return (
        <LinearGradient colors={['#1E1E2E', '#03001C', '#301E67', '#F5F5F5', '#5B8FB9', '#80B3FF', '#B8E4FF']} style={styles.constainer}>
            <CodeField
                ref={ref}
                {...props}
                value={driverPasswordConfirm}
                onChangeText={(password) => setDriverPasswordConfirm(password.trim())}
                cellCount={4}
                keyboardType="number-pad"
                rootStyle={styles.codeFieldRoot}
                textContentType="oneTimeCode"
                renderCell={({ index, symbol, isFocused }) => (
                    <Text
                        key={index}
                        style={[styles.cell, isFocused && styles.focusCell, symbol && styles.filledCell]}
                        onLayout={() => getCellOnLayoutHandler(index)}
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
    codeFieldRoot: {
        paddingHorizontal: 25,
    },
    focusCell: {
        borderColor: 'yellow',
        backgroundColor: '#3A3A52',
    },
    filledCell: {
        color: 'white',
    },
})
