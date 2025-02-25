import { View, StyleSheet, FlatList, TouchableOpacity, Text, Image } from 'react-native'
import { AddCarButtron } from '@components/cars/AddCarButton'
import { useEffect, useState } from 'react'
import { ICar } from '@db/types'
import { GetCarsByDriverId } from '@db/services/cars.service'
import { useDriver } from '@contexts/driverContext'
import { useRouter } from 'expo-router'
import { Ionicons } from '@expo/vector-icons'
import { DeleteCarButton } from '@components/cars/DeleteCarButton'
import { SelectCarButton } from '@components/cars/SelectCarButton'
import { useCar } from '@contexts/carContext'
import { EditCarButton } from '@components/cars/EditCarButton'
import { ImageCarViewer } from '@components/cars/ImageCarViewer'

export default function CarsScreen() {
    const [carsData, setCarsData] = useState<ICar[]>([])
    const { currentDriver } = useDriver()
    const { currentCar } = useCar()
    const router = useRouter()

    const fetchCars = async () => {
        const response = await GetCarsByDriverId(Number(currentDriver?.id))
        if (!response.success) {
            return router.replace('/error')
        }
        setCarsData(response?.data || [])
    }

    useEffect(() => {
        fetchCars()
    }, [])
    return (
        <View style={styles.container}>
            <FlatList
                data={carsData}
                keyExtractor={(item) => item.id?.toString() || Math.random().toString()}
                renderItem={({ item }) => (
                    <View
                        style={[
                            styles.carCardContainer,
                            currentCar?.id && currentCar?.id === item.id ? { borderWidth: 1, borderColor: 'green' } : {},
                        ]}
                    >
                        <View style={styles.carCard}>
                            {/* Car image */}
                            <ImageCarViewer uri={item.profile_photo} />
                            {/* Car details */}
                            <View style={styles.carDetails}>
                                <Text style={styles.carName}>
                                    {item.brand} {item.model}
                                </Text>
                                <Text style={styles.carText}> {item.plate.toLocaleUpperCase()}</Text>
                                <Text style={styles.carText}> {item.fuel_type}</Text>
                                <Text style={styles.carText}> {item.fuel_consumption} L/100</Text>
                            </View>
                        </View>
                        {/* Car Buttons */}
                        <View style={styles.buttonRow}>
                            <SelectCarButton carId={Number(item?.id)} />
                            <EditCarButton car={item} fetchCars={fetchCars} />
                            <DeleteCarButton carId={Number(item?.id)} fetchCars={fetchCars} />
                        </View>
                    </View>
                )}
                ListEmptyComponent={<Text style={styles.noCars}>You have no cars yet</Text>}
            />
            <AddCarButtron fetchCars={fetchCars} />
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#10141a',
        padding: 15,
    },
    carCardContainer: {
        backgroundColor: '#1c1f26',
        borderRadius: 16,
        padding: 12,
        marginVertical: 10,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 4 },
        shadowOpacity: 0.4,
        shadowRadius: 8,
        elevation: 6,
        borderWidth: 1,
        borderColor: 'rgba(255,255,255,0.1)',
    },
    carCard: {
        flexDirection: 'row',
        alignItems: 'center',
        paddingBottom: 10,
    },

    carDetails: {
        flex: 1,
        justifyContent: 'center',
    },

    carName: {
        fontSize: 20,
        fontWeight: 'bold',
        color: '#ffffff',
        textTransform: 'uppercase',
        letterSpacing: 1.1,
        marginBottom: 5,
    },
    carText: {
        fontSize: 14,
        color: '#d1d1d1',
        marginBottom: 3,
        fontWeight: '500',
        opacity: 0.9,
    },
    buttonRow: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        paddingTop: 10,
        borderTopWidth: 1,
        borderColor: 'rgba(255,255,255,0.1)',
    },
    noCars: {
        fontSize: 16,
        color: '#aaa',
        textAlign: 'center',
        marginTop: 20,
    },
})
