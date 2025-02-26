import React, { useEffect } from 'react'
import { DriverProvider } from '@contexts/driverContext'
import { CarProvider } from './carContext'
import { ShiftProvider } from './shiftContext'
import { createTables } from '@db/db'
import * as Updates from 'expo-updates'

export function AppProvider({ children }: { children: React.ReactNode }) {
    useEffect(() => {
        async function initDB() {
            try {
                // Init DB
                await createTables()
            } catch (error) {
                // Restart aplication
                await Updates.reloadAsync()
            }
        }
        initDB()
    }, [])

    return (
        <ShiftProvider>
            <CarProvider>
                <DriverProvider>{children}</DriverProvider>
            </CarProvider>
        </ShiftProvider>
    )
}
