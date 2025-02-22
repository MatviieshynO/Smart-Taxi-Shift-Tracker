import { Driver } from '@db/types'
import React, { createContext, useContext, useState } from 'react'

interface DriverContextType {
    currentDriver: Driver | null
    setCurrentDriver: (driver: Driver) => void
    updateFields: (fields: Partial<Driver>) => void
    removeField: (field: string) => void
}

export const DriverContext = createContext<DriverContextType | null>(null)

export function DriverProvider({ children }: { children: React.ReactNode }) {
    const [currentDriver, setCurrentDriver] = useState<Driver | null>(null)

    const updateFields = (fields: Partial<Driver>) => {
        setCurrentDriver((prev) => (prev ? { ...prev, ...fields } : null))
    }
    const removeField = (field: string) => {
        setCurrentDriver((prev) => (prev ? { ...prev, [field]: '' } : null))
    }

    return (
        <DriverContext.Provider value={{ currentDriver, setCurrentDriver, updateFields, removeField }}>{children}</DriverContext.Provider>
    )
}
export const useDriver = () => {
    const context = useContext(DriverContext)
    if (!context) {
        throw new Error('useDriver must be used within a DriverProvider')
    }
    return context
}
