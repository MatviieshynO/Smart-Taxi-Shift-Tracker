import { Driver } from '@db/types'
import React, { createContext, useContext, useState } from 'react'

interface DriverContextType {
    currentDriver: Driver | null
    setCurrentDriver: (driver: Driver | null) => void
}

export const DriverContext = createContext<DriverContextType | null>(null)

export function DriverProvider({ children }: { children: React.ReactNode }) {
    const [currentDriver, setCurrentDriver] = useState<Driver | null>(null)
    return <DriverContext.Provider value={{ currentDriver, setCurrentDriver }}>{children}</DriverContext.Provider>
}
export const useDriver = () => {
    const context = useContext(DriverContext)
    if (!context) {
        throw new Error('useDriver must be used within a DriverProvider')
    }
    return context
}
