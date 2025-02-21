import { useEffect, useState } from 'react'
import { View, Text, StyleSheet, Alert } from 'react-native'
import { useLocalSearchParams, useRouter } from 'expo-router'
import { CodeField, useBlurOnFulfill, useClearByFocusCell } from 'react-native-confirmation-code-field'
import Toast from 'react-native-toast-message'
import * as SecureStore from 'expo-secure-store'
import { login } from '@db/services/auth'
import { useDriver } from '@contexts/DriverContext'

export default function LoginPassword() {
    const { username } = useLocalSearchParams()
    const [pass, setPass] = useState('')
    const router = useRouter()
    const { setCurrentDriver } = useDriver()

    const ref = useBlurOnFulfill({ value: pass, cellCount: 4 })
    const [props, getCellOnLayoutHandler] = useClearByFocusCell({ value: pass, setValue: setPass })

    const handleSubmit = async () => {
        try {
            const driver = await login(String(username), String(pass))
            await SecureStore.setItemAsync('userSession', String(driver.id))
            const { password, ...rest } = driver
            setCurrentDriver(rest)
            Toast.show({
                type: 'success',
                text1: 'goood!',
                text2: 'You logged in.',
            })
            router.replace('/')
        } catch (error: any) {
            Toast.show({
                type: 'error',
                text1: 'Oops!',
                text2: String(error.message),
            })
            router.replace('/auth/login')
        }
    }

    useEffect(() => {
        if (pass.length === 4) {
            handleSubmit()
        }
    }, [pass])

    return (
        <View style={styles.constainer}>
            <Text style={styles.title}>Confirm your password </Text>
            <CodeField
                ref={ref}
                {...props}
                value={pass}
                onChangeText={setPass}
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
