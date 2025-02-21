import db from '@db/db'
import { DRIVER_NOT_FOUND, SELECT_DRIVER_BY_ID_FAILED } from '@db/errors/drivers'
import { SELECT_DRIVER_BY_ID } from '@db/queries/drivers'
import { Driver } from '@db/types'

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
