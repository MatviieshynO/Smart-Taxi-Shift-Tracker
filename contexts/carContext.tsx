import { GetCarById } from '@db/services/cars.service'
import { ICar } from '@db/types'
import * as SecureStore from 'expo-secure-store'
import React, { createContext, useContext, useEffect, useState } from 'react'

interface CarContextType {
    currentCar: ICar | null
    setCurrentCar: (car: ICar | null) => void
    updateFields: (fields: Partial<ICar>) => void
    removeField: (field: string) => void
}

export const CarContext = createContext<CarContextType | null>(null)

export function CarProvider({ children }: { children: React.ReactNode }) {
    const [currentCar, setCurrentCar] = useState<ICar | null>(null)

    useEffect(() => {
        async function restoreSelectedCar() {
            try {
                // 1. Retrieving car ID from SecureStore.
                const carId = await SecureStore.getItemAsync('currentCar')
                if (!carId) return

                // 2. Checking if a car with this ID exists.
                const response = await GetCarById(Number(carId))
                if (!response.success || !response.data) {
                    return await SecureStore.deleteItemAsync('currentCar')
                }

                // 3. Saving car data to context.
                setCurrentCar(response.data)
            } catch (error) {
                console.error('Error setting current car:', error)
            }
        }

        restoreSelectedCar()
    }, [])

    const updateFields = (fields: Partial<ICar>) => {
        setCurrentCar((prev) => (prev ? { ...prev, ...fields } : null))
    }
    const removeField = (field: string) => {
        setCurrentCar((prev) => (prev ? { ...prev, [field]: '' } : null))
    }

    return <CarContext.Provider value={{ updateFields, removeField, currentCar, setCurrentCar }}>{children}</CarContext.Provider>
}
export const useCar = () => {
    const context = useContext(CarContext)
    if (!context) {
        throw new Error('useCar must be used within a CarProvider')
    }
    return context
}
