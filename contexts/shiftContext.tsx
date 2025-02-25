import { IShift } from '@db/types'
import React, { createContext, useContext, useState } from 'react'

interface ShiftContextType {
    currentShift: IShift | null
    setCurrentShift: (shift: IShift | null) => void
}

const ShiftContext = createContext<ShiftContextType | undefined>(undefined)

export const ShiftProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
    const [currentShift, setCurrentShift] = useState<IShift | null>(null)

    return <ShiftContext.Provider value={{ currentShift, setCurrentShift }}>{children}</ShiftContext.Provider>
}

export const useShift = () => {
    const context = useContext(ShiftContext)
    if (!context) {
        throw new Error('useShift must be used within a ShiftProvider')
    }
    return context
}
