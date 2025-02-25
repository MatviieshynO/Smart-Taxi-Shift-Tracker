import { BaseToast, ErrorToast, ToastConfigParams } from 'react-native-toast-message'
import { StyleSheet } from 'react-native'

const styles = StyleSheet.create({
    toastContainer: {
        borderLeftWidth: 5,
        height: 70,
        backgroundColor: '#2D2D44',
        borderRadius: 10,
        padding: 10,
        zIndex: 9999,
    },
    contentContainer: {
        paddingHorizontal: 15,
    },
    text1: {
        fontSize: 18,
        fontWeight: 'bold',
        color: '#fff',
    },
    text2: {
        fontSize: 14,
        color: '#fff',
    },
})

export const toastConfig = {
    success: (props: ToastConfigParams<any>) => (
        <BaseToast
            {...props}
            style={[styles.toastContainer, { borderLeftColor: '#4CAF50' }]}
            contentContainerStyle={styles.contentContainer}
            text1Style={styles.text1}
            text2Style={styles.text2}
        />
    ),
    error: (props: ToastConfigParams<any>) => (
        <ErrorToast
            {...props}
            style={[styles.toastContainer, { borderLeftColor: '#FF3B30' }]}
            text1Style={styles.text1}
            text2Style={styles.text2}
        />
    ),
    info: (props: ToastConfigParams<any>) => (
        <BaseToast
            {...props}
            style={[styles.toastContainer, { borderLeftColor: '#007AFF' }]}
            text1Style={styles.text1}
            text2Style={styles.text2}
        />
    ),
}
