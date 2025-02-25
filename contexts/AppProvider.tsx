import React from 'react'
import { DriverProvider } from '@contexts/driverContext'
import { CarProvider } from './carContext'

export function AppProvider({ children }: { children: React.ReactNode }) {
    return (
        <CarProvider>
            <DriverProvider>{children}</DriverProvider>
        </CarProvider>
    )
}
