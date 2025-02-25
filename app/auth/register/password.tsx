import { useState } from 'react'
import { Text, StyleSheet } from 'react-native'
import { useLocalSearchParams, useRouter } from 'expo-router'
import { CodeField, useBlurOnFulfill, useClearByFocusCell } from 'react-native-confirmation-code-field'
import { LinearGradient } from 'expo-linear-gradient'

export default function RegisterPassword() {
    const { driverName } = useLocalSearchParams()
    const [driverPassword, setDriverPassword] = useState<string>('')
    const router = useRouter()

    const ref = useBlurOnFulfill({ value: driverPassword, cellCount: 4 })
    const [props, getCellOnLayoutHandler] = useClearByFocusCell({ value: driverPassword, setValue: setDriverPassword })

    const handleNext = (driverPassword: string) => {
        setDriverPassword(driverPassword)
        if (driverPassword.length === 4) {
            setDriverPassword('')
            router.replace({ pathname: '/auth/register/confirm-password', params: { driverName, driverPassword } })
        }
    }

    return (
        <LinearGradient colors={['#1E1E2E', '#03001C', '#301E67', '#F5F5F5', '#5B8FB9', '#80B3FF', '#B8E4FF']} style={styles.container}>
            <CodeField
                ref={ref}
                {...props}
                value={driverPassword}
                onChangeText={(password) => handleNext(password.trim())}
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
    container: { flex: 1, justifyContent: 'center', alignItems: 'center', backgroundColor: '#1E1E2E' },
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
        margin: 5,
    },
    focusCell: {
        borderColor: 'yellow',
        backgroundColor: '#3A3A52',
    },
    filledCell: {
        color: 'white',
    },
    codeFieldRoot: {
        padding: 10,
    },
})
