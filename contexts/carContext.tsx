import { ICar } from '@db/types'
import React, { createContext, useContext, useState } from 'react'

interface CarContextType {
    currentCar: ICar | null
    setCurrentCar: (car: ICar | null) => void
    updateFields: (fields: Partial<ICar>) => void
    removeField: (field: string) => void
}

export const CarContext = createContext<CarContextType | null>(null)

export function CarProvider({ children }: { children: React.ReactNode }) {
    const [currentCar, setCurrentCar] = useState<ICar | null>(null)

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
