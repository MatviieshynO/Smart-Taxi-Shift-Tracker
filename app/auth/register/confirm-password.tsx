import { useEffect, useState } from 'react'
import { View, Text, StyleSheet, Alert } from 'react-native'
import { useLocalSearchParams, useRouter } from 'expo-router'
import { CodeField, useBlurOnFulfill, useClearByFocusCell } from 'react-native-confirmation-code-field'
import Toast from 'react-native-toast-message'
import { registerDriver } from '@db/services/auth'

export default function ConfirmPin() {
    const { username, pin } = useLocalSearchParams()
    const [confirmPin, setConfirmPin] = useState('')
    const router = useRouter()

    const ref = useBlurOnFulfill({ value: confirmPin, cellCount: 4 })
    const [props, getCellOnLayoutHandler] = useClearByFocusCell({ value: confirmPin, setValue: setConfirmPin })

    const handleSubmit = async () => {
        try {
            await registerDriver(String(username), String(pin))
            Toast.show({
                type: 'success',
                text1: 'yeeep!',
                text2: 'Driver successfully added.',
            })
            router.replace('/')
        } catch (error: any) {
            Toast.show({
                type: 'error',
                text1: 'Oops!',
                text2: String(error.message),
            })
            router.replace('/auth/register')
        }
    }

    useEffect(() => {
        if (confirmPin.length === 4 && confirmPin !== pin) {
            setConfirmPin('')
            ref?.current?.focus()
            Toast.show({
                type: 'error',
                text1: 'Oops!',
                text2: 'Passwords do not match.',
            })
        } else if (confirmPin.length === 4 && confirmPin === pin) {
            handleSubmit()
        }
    }, [confirmPin])

    return (
        <View style={styles.constainer}>
            <Text style={styles.title}>Confirm your password </Text>
            <CodeField
                ref={ref}
                {...props}
                value={confirmPin}
                onChangeText={setConfirmPin}
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
        </View>
    )
}
const styles = StyleSheet.create({
    constainer: { flex: 1, justifyContent: 'center', backgroundColor: '#1E1E2E' },
    title: { marginBottom: 50, fontSize: 30, color: 'white', textAlign: 'center' },
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
    codeFieldRoot: {
        paddingHorizontal: 25,
    },
})
