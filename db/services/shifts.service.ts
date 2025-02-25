import { ERROR_MESSAGES } from '@db/constants/errorMessages'
import { SUCCESS_MESSAGES } from '@db/constants/successMessages'
import db from '@db/db'
import { SHIFTS_QUERIES } from '@db/queries/shifts.queries'
import { IServiceReposponse, IShift } from '@db/types'

export async function CreateNewShift(shiftOptions: IShift): Promise<IServiceReposponse<void>> {
    try {
        // 1. Checking if all required fields are provided
        if (!shiftOptions || typeof shiftOptions !== 'object') {
            return { success: false, errorMessage: ERROR_MESSAGES.SHIFTS.MISSING_SHIFT_OPTIONS }
        }

        // 2. Executing shift addition
        const insertResult = await db.runAsync(SHIFTS_QUERIES.INSERT_NEW_SHIFT, [
            shiftOptions.driver_id,
            shiftOptions.car_id,
            shiftOptions.total_time,
            shiftOptions.total_km,
            shiftOptions.total_earnings,
            shiftOptions.total_expenses,
        ])

        // 4. Checking if the shift was added
        if (insertResult.changes === 0) {
            return { success: false, errorMessage: ERROR_MESSAGES.SERVER.GENERAL_ERROR }
        }

        // 5. Successful server response
        return { success: true, successMessage: SUCCESS_MESSAGES.SHIFTS.ADD_NEW_SHIFT_SUCCESS }
    } catch (error) {
        console.error(error)
        return { success: false, errorMessage: ERROR_MESSAGES.SERVER.GENERAL_ERROR }
    }
}
export async function GetShiftsByDriverId(driverId: number): Promise<IServiceReposponse<IShift[]>> {
    try {
        // 1. Checking the driver's ID
        if (!driverId || typeof driverId !== 'number') {
            return { success: false, errorMessage: ERROR_MESSAGES.SHIFTS.MISSING_DRIVER_ID }
        }
        // 2. Retrieving all cars by driver ID
        const shifts = await db.getAllAsync<IShift>(SHIFTS_QUERIES.SELECT_SHIFTS_BY_DRIVER_ID, [driverId])

        // 3. Successful server response
        return { success: true, data: shifts }
    } catch (error) {
        console.error(error)
        return { success: false, errorMessage: ERROR_MESSAGES.SERVER.GENERAL_ERROR }
    }
}
export async function GetShiftById(shiftId: number): Promise<IServiceReposponse<IShift>> {
    try {
        // 1. Checking the shift's ID
        if (!shiftId || typeof shiftId !== 'number') {
            return { success: false, errorMessage: ERROR_MESSAGES.SHIFTS.MISSING_SHIFT_ID }
        }

        // 2. Checking if a shift with this ID exists
        const existsShift = await db.getFirstAsync<IShift>(SHIFTS_QUERIES.SELECT_SHIFT_BY_ID, [shiftId])
        if (!existsShift) {
            return { success: false, errorMessage: ERROR_MESSAGES.SERVER.GENERAL_ERROR }
        }

        // 3. Successful server response
        return { success: true, data: existsShift }
    } catch (error) {
        console.error(error)
        return { success: false, errorMessage: ERROR_MESSAGES.SERVER.GENERAL_ERROR }
    }
}
export async function UpdateShiftById(shiftId: number, updateFields: IShift): Promise<IServiceReposponse<void>> {
    try {
        // 1. Checking the shift's ID
        if (!shiftId || typeof shiftId !== 'number') {
            return { success: false, errorMessage: ERROR_MESSAGES.SHIFTS.MISSING_DRIVER_ID }
        }

        // 2. Checking if a shift with this ID exists
        const existsShift = await db.getFirstAsync<IShift>(SHIFTS_QUERIES.SELECT_SHIFT_BY_ID, [shiftId])
        if (!existsShift) {
            return { success: false, errorMessage: ERROR_MESSAGES.SERVER.GENERAL_ERROR }
        }

        // 3. Checking if there are any fields to update
        const keys = Object.keys(updateFields)
        const values = Object.values(updateFields)
        if (keys.length === 0 && values.length === 0) {
            return { success: false, errorMessage: ERROR_MESSAGES.SHIFTS.MISSING_SHIFT_UPDATE_FIRLDS }
        }

        // 4. Generating query and updating shift fields
        const updateQuery = SHIFTS_QUERIES.UPDATE_SHIFT_FIELDS(keys)
        const updateResult = await db.runAsync(updateQuery, [...values, shiftId])

        // 5. Checking if changes were applied
        if (updateResult.changes === 0) {
            return { success: false, errorMessage: ERROR_MESSAGES.SERVER.GENERAL_ERROR }
        }

        // 6. Successful server response
        return { success: true, successMessage: SUCCESS_MESSAGES.SHIFTS.SHIFT_UPDATE_SUCCESS }
    } catch (error) {
        console.error(error)
        return { success: false, errorMessage: ERROR_MESSAGES.SERVER.GENERAL_ERROR }
    }
}
export async function DeleteShiftById(shiftId: number): Promise<IServiceReposponse<void>> {
    try {
        // 1. Checking the shift's ID
        if (!shiftId || typeof shiftId !== 'number') {
            return { success: false, errorMessage: ERROR_MESSAGES.SHIFTS.MISSING_SHIFT_ID }
        }
        // 2. Executing deletion
        const result = await db.runAsync(SHIFTS_QUERIES.DELETE_SHIFT_BY_ID, [shiftId])

        // 3. Checking if the shift was deleted
        if (result.changes === 0) {
            return { success: false, errorMessage: ERROR_MESSAGES.SERVER.GENERAL_ERROR }
        }
        // 4. Successful server response
        return { success: true, successMessage: SUCCESS_MESSAGES.SHIFTS.SHIFT_DELETE_SUCCESS }
    } catch (error) {
        console.error(error)
        return { success: false, errorMessage: ERROR_MESSAGES.SERVER.GENERAL_ERROR }
    }
}
