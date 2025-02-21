import React from 'react'
import { DriverProvider } from '@contexts/DriverContext'

export function AppProvider({ children }: { children: React.ReactNode }) {
    return <DriverProvider>{children}</DriverProvider>
}
