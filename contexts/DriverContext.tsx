import { GetDriverById } from '@db/services/drivers.service'
import { IDriver, ISafeDriver } from '@db/types'
import { useRouter } from 'expo-router'
import * as SecureStore from 'expo-secure-store'
import React, { createContext, useContext, useEffect, useState } from 'react'

interface DriverContextType {
    currentDriver: IDriver | null | ISafeDriver
    setCurrentDriver: (driver: IDriver | null) => void
    updateCurrentDriverFields: (fields: Partial<IDriver>) => void
    removeCurrentDriverField: (field: string) => void
}

export const DriverContext = createContext<DriverContextType | null>(null)

export function DriverProvider({ children }: { children: React.ReactNode }) {
    const [currentDriver, setCurrentDriver] = useState<IDriver | null | ISafeDriver>(null)

    const router = useRouter()

    useEffect(() => {
        async function checkSession() {
            try {
                // 1. Checking if session data exists
                const driverId = await SecureStore.getItemAsync('driverSession')
                if (!driverId) {
                    return router.replace('/auth/login')
                }

                // 2. Checking if the driver was successfully retrieved by ID
                const currentDriver = await GetDriverById(Number(driverId))
                if (!currentDriver.success) {
                    await SecureStore.deleteItemAsync('driverSession')
                    return router.replace('/auth/login')
                }

                if (!currentDriver?.data) return

                // 3. Refresh context (hiding password)
                setCurrentDriver(currentDriver?.data)

                return router.replace('/')
            } catch (error) {
                await SecureStore.deleteItemAsync('driverSession')
                router.replace('/auth/login')
            }
        }

        checkSession()
    }, [])


    const updateCurrentDriverFields = (fields: Partial<IDriver>) => {
        setCurrentDriver((prev) => (prev ? { ...prev, ...fields } : null))
    }
    const removeCurrentDriverField = (field: string) => {
        setCurrentDriver((prev) => (prev ? { ...prev, [field]: '' } : null))
    }

    return (
        <DriverContext.Provider value={{ currentDriver, setCurrentDriver, updateCurrentDriverFields, removeCurrentDriverField }}>
            {children}
        </DriverContext.Provider>
    )
}
export const useDriver = () => {
    const context = useContext(DriverContext)
    if (!context) {
        throw new Error('useDriver must be used within a DriverProvider')
    }
    return context
}
