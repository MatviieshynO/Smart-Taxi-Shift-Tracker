import db from '@db/db'
import { ERROR_MESSAGES } from '@db/constants/errorMessages'
import { SUCCESS_MESSAGES } from '@db/constants/successMessages'
import { CAR_QUERIES } from '@db/queries/cars.queries'
import { ICar, IServiceReposponse } from '@db/types'

export async function AddNewCar(carOptions: ICar): Promise<IServiceReposponse<void>> {
    try {
        // 1. Checking if all required fields are provided
        if (!carOptions || typeof carOptions !== 'object') {
            return { success: false, errorMessage: ERROR_MESSAGES.CARS.MISSING_CAR_OPTIONS }
        }

        // 2. Checking if the car exists
        const existingCar = await db.getFirstAsync(CAR_QUERIES.SELECT_CAR_BY_PLATE, [carOptions.plate])
        if (existingCar) {
            return { success: false, errorMessage: ERROR_MESSAGES.CARS.CAR_ALREADY_EXISTS }
        }

        // 3. Executing car addition
        const insertResult = await db.runAsync(CAR_QUERIES.INSERT_NEW_CAR, [
            carOptions.driver_id,
            carOptions.brand,
            carOptions.model,
            carOptions.plate,
            carOptions.fuel_type,
            carOptions.fuel_consumption,
            carOptions.profile_photo,
        ])

        // 4. Checking if the car was added
        if (insertResult.changes === 0) {
            return { success: false, errorMessage: ERROR_MESSAGES.SERVER.GENERAL_ERROR }
        }

        // 5. Successful server response
        return { success: true, successMessage: SUCCESS_MESSAGES.CARS.ADD_NEW_CAR_SUCCESS }
    } catch (error: any) {
        console.error(error)
        return { success: false, errorMessage: ERROR_MESSAGES.SERVER.GENERAL_ERROR }
    }
}
export async function GetCarsByDriverId(driverId: number): Promise<IServiceReposponse<ICar[]>> {
    try {
        // 1. Checking the driver's ID
        if (!driverId || typeof driverId !== 'number') {
            return { success: false, errorMessage: ERROR_MESSAGES.CARS.MISSING_DRIVER_ID }
        }
        // 2. Retrieving all cars by driver ID
        const cars = await db.getAllAsync<ICar>(CAR_QUERIES.SELECT_CARS_BY_DRIVER_ID, [driverId])

        // 3. Successful server response
        return { success: true, data: cars }
    } catch (error) {
        console.error(error)
        return { success: false, errorMessage: ERROR_MESSAGES.SERVER.GENERAL_ERROR }
    }
}
export async function UpdateCarById(carId: number, updateFields: ICar): Promise<IServiceReposponse<void>> {
    try {
        // 1. Checking the car's ID
        if (!carId || typeof carId !== 'number') {
            return { success: false, errorMessage: ERROR_MESSAGES.CARS.MISSING_DRIVER_ID }
        }

        // 2. Checking if a car with this ID exists
        const existsCar = await db.getFirstAsync<ICar>(CAR_QUERIES.SELECT_CAR_BY_ID, [carId])
        if (!existsCar) {
            return { success: false, errorMessage: ERROR_MESSAGES.SERVER.GENERAL_ERROR }
        }

        // 3. Checking if there are any fields to update
        const keys = Object.keys(updateFields)
        const values = Object.values(updateFields)
        if (keys.length === 0 && values.length === 0) {
            return { success: false, errorMessage: ERROR_MESSAGES.CARS.MISSING_CAR_UPDATE_FIRLDS }
        }

        // 4. Generating query and updating driver fields
        const updateQuery = CAR_QUERIES.UPDATE_CAR_FIELDS(keys)
        const updateResult = await db.runAsync(updateQuery, [...values, carId])

        // 5. Checking if changes were applied
        if (updateResult.changes === 0) {
            return { success: false, errorMessage: ERROR_MESSAGES.SERVER.GENERAL_ERROR }
        }

        // 6. Successful server response
        return { success: true, successMessage: SUCCESS_MESSAGES.CARS.CAR_UPDATE_SUCCESS }
    } catch (error) {
        console.error(error)
        return { success: false, errorMessage: ERROR_MESSAGES.SERVER.GENERAL_ERROR }
    }
}
export async function DeleteCarById(carId: number): Promise<IServiceReposponse<void>> {
    try {
        // 1. Checking the car's ID
        if (!carId || typeof carId !== 'number') {
            return { success: false, errorMessage: ERROR_MESSAGES.CARS.MISSING_DRIVER_ID }
        }
        // 2. Executing deletion
        const result = await db.runAsync(CAR_QUERIES.DELETE_CAR_BY_ID, [carId])

        // 3. Checking if the car was deleted
        if (result.changes === 0) {
            return { success: false, errorMessage: ERROR_MESSAGES.SERVER.GENERAL_ERROR }
        }
        // 4. Successful server response
        return { success: true, successMessage: SUCCESS_MESSAGES.CARS.CAR_DELETE_SUCCESS }
    } catch (error) {
        console.error(error)
        return { success: false, errorMessage: ERROR_MESSAGES.SERVER.GENERAL_ERROR }
    }
}
export async function GetCarById(carId: number): Promise<IServiceReposponse<ICar>> {
    try {
        // 1. Checking the car's ID
        if (!carId || typeof carId !== 'number') {
            return { success: false, errorMessage: ERROR_MESSAGES.CARS.MISSING_CAR_ID }
        }

        // 2. Checking if a car with this ID exists
        const existsCar = await db.getFirstAsync<ICar>(CAR_QUERIES.SELECT_CAR_BY_ID, [carId])
        if (!existsCar) {
            return { success: false, errorMessage: ERROR_MESSAGES.SERVER.GENERAL_ERROR }
        }

        // 3. Successful server response
        return { success: true, data: existsCar }
    } catch (error) {
        console.error(error)
        return { success: false, errorMessage: ERROR_MESSAGES.SERVER.GENERAL_ERROR }
    }
}
