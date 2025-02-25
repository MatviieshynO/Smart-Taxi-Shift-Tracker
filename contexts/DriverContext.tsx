import { IDriver } from '@db/types'
import React, { createContext, useContext, useState } from 'react'

interface DriverContextType {
    currentDriver: IDriver | null
    setCurrentDriver: (driver: IDriver | null) => void
    updateCurrentDriverFields: (fields: Partial<IDriver>) => void
    removeCurrentDriverField: (field: string) => void
}

export const DriverContext = createContext<DriverContextType | null>(null)

export function DriverProvider({ children }: { children: React.ReactNode }) {
    const [currentDriver, setCurrentDriver] = useState<IDriver | null>(null)

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
