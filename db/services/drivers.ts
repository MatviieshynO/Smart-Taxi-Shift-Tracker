import db from '@db/db'
import {
    DELETED_FAILED,
    DRIVER_NOT_FOUND,
    MISSING_ID,
    NO_FIELDS_TO_UPDATE,
    SELECT_DRIVER_BY_ID_FAILED,
    SELECT_DRIVER_BY_USERNAME_FAILED,
    UPDATE_FAILED,
} from '@db/errors/drivers'
import { DELET_DRIVER_BY_ID, GET_DRIVER_BY_ID, SELECT_DRIVER_BY_ID, SELECT_DRIVER_BY_USERNAME, UPDATE_DRIVER } from '@db/queries/drivers'
import { Driver } from '@db/types'
export const getAllDrivers = async (): Promise<Driver[]> => {
    try {
        const drivers = await db.getAllAsync<Driver>(`SELECT * FROM drivers`)

        if (!drivers || drivers.length === 0) {
            return []
        }
        return drivers
    } catch (error) {
        return []
    }
}
export const getDriverById = async (userId: string): Promise<Driver> => {
    try {
        const driver = await db.getAllAsync<Driver>(SELECT_DRIVER_BY_ID, [userId])

        if (!driver || driver.length === 0) {
            const error = new Error(DRIVER_NOT_FOUND)
            error.name = 'NotFound'
            throw error
        }
        return driver[0]
    } catch (error: any) {
        if (error.name === 'NotFound') {
            throw error
        }
        throw new Error(SELECT_DRIVER_BY_ID_FAILED)
    }
}
export const getDriverByUserName = async (userName: string): Promise<Driver | null> => {
    try {
        const result = await db.getAllAsync<Driver>(SELECT_DRIVER_BY_USERNAME, [userName])

        if (!result || result.length === 0) {
            return null
        }

        return result[0]
    } catch (error: any) {
        if (error.message === DRIVER_NOT_FOUND) {
            throw error
        }
        console.error('Error in getDriverByUserName:', error)
        throw new Error(SELECT_DRIVER_BY_USERNAME_FAILED)
    }
}
export const updateDriver = async (updateFields: Driver): Promise<void> => {
    try {
        const { id, ...restFields } = updateFields
        const restKeys = Object.keys(restFields)
        const values = Object.values(restFields)

        if (!id) {
            throw new Error(MISSING_ID)
        }

        if (restKeys.length === 0) {
            throw new Error(NO_FIELDS_TO_UPDATE)
        }

        const currentDriver = await db.getAllAsync<Driver>(GET_DRIVER_BY_ID, [Number(id)])

        if (!currentDriver || currentDriver.length === 0) {
            throw new Error(DRIVER_NOT_FOUND)
        }

        const updateQuery = UPDATE_DRIVER(restKeys)
        await db.runAsync(updateQuery, [...values, Number(id)])
    } catch (error) {
        console.error(UPDATE_FAILED, error)
        throw new Error(UPDATE_FAILED)
    }
}
export const deleteDriver = async (driverId: number): Promise<void> => {
    try {
        const result = await db.runAsync(DELET_DRIVER_BY_ID, [driverId])

        if (result.changes === 0) {
            throw new Error('Driver not found')
        }
    } catch (error) {
        console.error(DELETED_FAILED, error)
        throw new Error(DELETED_FAILED)
    }
}
