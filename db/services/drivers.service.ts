import db from '@db/db'
import { ERROR_MESSAGES } from '@db/constants/errorMessages'
import { SUCCESS_MESSAGES } from '@db/constants/successMessages'
import { DRIVERS_QUERIES } from '@db/queries/drivers.queries'
import { IDriver, ISafeDriver, IServiceReposponse } from '@db/types'

export async function GetAllDrivers(): Promise<IServiceReposponse<IDriver[]>> {
    try {
        const drivers = await db.getAllAsync<IDriver>(DRIVERS_QUERIES.SELECT_ALL_USERS)
        return { success: true, data: drivers }
    } catch (error) {
        console.error(error)
        return { success: false }
    }
}
export async function GetDriverById(driverId: number): Promise<IServiceReposponse<ISafeDriver>> {
    try {
        // 1. Checking the driver's ID
        if (!driverId || typeof driverId !== 'number') {
            return { success: false, errorMessage: ERROR_MESSAGES.DRIVERS.MISSING_DRIVER_ID }
        }
        // 2. Checking if a driver with this ID exists
        const existsDriver = await db.getFirstAsync<IDriver>(DRIVERS_QUERIES.SELECT_DRIVER_BY_ID, [driverId])
        if (!existsDriver) {
            return { success: false, errorMessage: ERROR_MESSAGES.SERVER.GENERAL_ERROR }
        }

        const { password, ...safeDriver } = existsDriver

        // 3. Successful server response
        return { success: true, data: safeDriver }
    } catch (error) {
        console.error(error)
        return { success: false, errorMessage: ERROR_MESSAGES.SERVER.GENERAL_ERROR }
    }
}
export async function GetDriverByName(driverName: string): Promise<IServiceReposponse<ISafeDriver>> {
    try {
        // 1. Checking the driver's name
        if (!driverName || typeof driverName !== 'string') {
            return { success: false, errorMessage: ERROR_MESSAGES.DRIVERS.MISSING_DRIVER_NAME }
        }
        // 2. Checking if a driver with this name exists
        const existsDriver = await db.getFirstAsync<IDriver>(DRIVERS_QUERIES.SELECT_DRIVER_BY_NAME, [driverName])
        if (!existsDriver) {
            return { success: false, errorMessage: ERROR_MESSAGES.SERVER.GENERAL_ERROR }
        }

        const { password, ...safeDriver } = existsDriver

        // 3. Successful server response
        return { success: true, data: safeDriver }
    } catch (error) {
        console.error(error)
        return { success: false, errorMessage: ERROR_MESSAGES.SERVER.GENERAL_ERROR }
    }
}
export async function UpdateDriverById(driverId: number, updateFields: Partial<IDriver>): Promise<IServiceReposponse<void>> {
    try {
        // 1. Checking the driver's ID
        if (!driverId || typeof driverId !== 'number') {
            return { success: false, errorMessage: ERROR_MESSAGES.DRIVERS.MISSING_DRIVER_ID }
        }
        // 2. Checking if a driver with this ID exists
        const existsDriver = await db.getFirstAsync<IDriver>(DRIVERS_QUERIES.SELECT_DRIVER_BY_ID, [driverId])
        if (!existsDriver) {
            return { success: false, errorMessage: ERROR_MESSAGES.SERVER.GENERAL_ERROR }
        }

        // 3. Checking if there are any fields to update
        const keys = Object.keys(updateFields)
        const values = Object.values(updateFields)
        if (keys.length === 0 && values.length === 0) {
            return { success: false, errorMessage: ERROR_MESSAGES.DRIVERS.MISSING_DRIVER_UPDATE_FIRLDS }
        }
        // 4. Generating query and updating driver fields
        const updateQuery = DRIVERS_QUERIES.UPDATE_DRIVER_FIELDS(keys)
        const updateResult = await db.runAsync(updateQuery, [...values, driverId])

        // 5. Checking if changes were applied
        if (updateResult.changes === 0) {
            return { success: false, errorMessage: ERROR_MESSAGES.SERVER.GENERAL_ERROR }
        }
        // 6. Successful server response
        return { success: true, successMessage: SUCCESS_MESSAGES.DRIVERS.DRIVER_UPDATE_SUCCESS }
    } catch (error) {
        console.error(error)
        return { success: false, errorMessage: ERROR_MESSAGES.SERVER.GENERAL_ERROR }
    }
}
export async function DeleteDriverById(driverId: number): Promise<IServiceReposponse<void>> {
    try {
        // 1. Checking the driver's ID
        if (!driverId || typeof driverId !== 'number') {
            return { success: false, errorMessage: ERROR_MESSAGES.DRIVERS.MISSING_DRIVER_ID }
        }
        // 2. Executing deletion
        const result = await db.runAsync(DRIVERS_QUERIES.DELETE_DRIVER_BY_ID, [driverId])

        // 3. Checking if the driver was deleted
        if (result.changes === 0) {
            return { success: false, errorMessage: ERROR_MESSAGES.SERVER.GENERAL_ERROR }
        }
        // 4. Successful server response
        return { success: true, successMessage: SUCCESS_MESSAGES.DRIVERS.DRIVER_DELETE_SUCCESS }
    } catch (error) {
        console.error(error)
        return { success: false, errorMessage: ERROR_MESSAGES.SERVER.GENERAL_ERROR }
    }
}
