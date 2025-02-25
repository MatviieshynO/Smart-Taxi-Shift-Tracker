import React from 'react'
import { DriverProvider } from '@contexts/driverContext'
import { CarProvider } from './carContext'
import { ShiftProvider } from './shiftContext'

export function AppProvider({ children }: { children: React.ReactNode }) {
    return (
        <ShiftProvider>
            <CarProvider>
                <DriverProvider>{children}</DriverProvider>
            </CarProvider>
        </ShiftProvider>
    )
}
