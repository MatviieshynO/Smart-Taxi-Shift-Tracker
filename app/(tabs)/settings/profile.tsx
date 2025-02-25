import { ScrollView, StyleSheet } from 'react-native'
import { ProfilePhoto } from '@components/profile/ProfilePhoto'
import { DriverNameEditor } from '@components/profile/DriverNameEditor'
import { DriverPasswordEditor } from '@components/profile/DriverPasswordEditor'
import { DeleteAccountButton } from '@components/profile/DeleteAccountButton'

export default function ProfileScreen() {
    return (
        <ScrollView style={styles.scrollContainer}>
            <ProfilePhoto />
            <DriverNameEditor />
            <DriverPasswordEditor />
            <DeleteAccountButton />
        </ScrollView>
    )
}
const styles = StyleSheet.create({
    scrollContainer: {
        flex: 1,
        backgroundColor: '#121212',
        padding: 20,
    },
})
