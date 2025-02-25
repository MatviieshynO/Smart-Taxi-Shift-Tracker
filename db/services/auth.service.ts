import db from '@db/db'
import { ERROR_MESSAGES } from '@db/constants/errorMessages'
import { SUCCESS_MESSAGES } from '@db/constants/successMessages'
import { AUTH_QUERIES } from '@db/queries/auth.queries'
import { IDriver, ISafeDriver, IServiceReposponse } from '@db/types'
import * as Crypto from 'expo-crypto'

export async function DriverRegistration(
    driverName: string,
    driverPassword: string,
    driverPasswordConfirm: string
): Promise<IServiceReposponse<void>> {
    try {
        // 1. Checking the driver's name, password and driverPasswordConfirm.
        if (!driverName || typeof driverName !== 'string') {
            return { success: false, errorMessage: ERROR_MESSAGES.AUTH.MISSING_DRIVER_NAME }
        }
        if (!driverPassword || typeof driverPassword !== 'string') {
            return { success: false, errorMessage: ERROR_MESSAGES.AUTH.MISSING_DRIVER_PASSWORD }
        }
        if (!driverPasswordConfirm || typeof driverPasswordConfirm !== 'string') {
            return { success: false, errorMessage: ERROR_MESSAGES.AUTH.MISSING_DRIVER_PASSWORD_CONFIRM }
        }

        // 2. Name length validation
        if (driverName.length < 3) {
            return { success: false, errorMessage: ERROR_MESSAGES.AUTH.SHORT_DRIVER_NAME }
        }

        // 3. Password length validation (4 characters)
        if (driverPassword.length !== 4) {
            return { success: false, errorMessage: ERROR_MESSAGES.AUTH.INVALID_PASSWORD_LENGTH }
        }

        // 4. Validate that the password and confirmation password match
        if (driverPassword !== driverPasswordConfirm) {
            return { success: false, errorMessage: ERROR_MESSAGES.AUTH.PASSWORDS_DO_NOT_MATCH }
        }

        // 5. Сheck if the user exists in the database
        const existingDriver = await db.getFirstAsync(AUTH_QUERIES.SELECT_BY_NAME, [driverName])
        if (existingDriver) {
            return { success: false, errorMessage: ERROR_MESSAGES.AUTH.DRIVER_ALREADY_EXISTS }
        }

        // 6. Hash the password using SHA-256 for security
        const hashedPassword = await Crypto.digestStringAsync(Crypto.CryptoDigestAlgorithm.SHA256, driverPassword)

        // 7. Checking if the driver was created
        const insertResult = await db.runAsync(AUTH_QUERIES.INSERT_DRIVER, [driverName, hashedPassword])
        if (!insertResult || insertResult.changes === 0) {
            return { success: false, errorMessage: ERROR_MESSAGES.AUTH.REGISTRATION_FAILED }
        }

        // 8. Successful server response: User registered
        return { success: true, successMessage: SUCCESS_MESSAGES.AUTH.REGISTRATION_SUCCESS }
    } catch (error) {
        console.error(error)
        return { success: false, errorMessage: ERROR_MESSAGES.SERVER.REGISTRATION_FAILED }
    }
}
export async function DriverAuthorization(driverName: string, driverPassword: string): Promise<IServiceReposponse<ISafeDriver>> {
    try {
        // 1. Checking the driver's name, password and driverPasswordConfirm.
        if (!driverName || typeof driverName !== 'string') {
            return { success: false, errorMessage: ERROR_MESSAGES.AUTH.MISSING_DRIVER_NAME }
        }
        if (!driverPassword || typeof driverPassword !== 'string') {
            return { success: false, errorMessage: ERROR_MESSAGES.AUTH.MISSING_DRIVER_PASSWORD }
        }

        // 2. Сheck if the user exists in the database
        const existingDriver = await db.getFirstAsync<IDriver>(AUTH_QUERIES.SELECT_BY_NAME, [driverName])
        if (!existingDriver) {
            return { success: false, errorMessage: ERROR_MESSAGES.AUTH.DRIVER_NOT_FOUND }
        }

        // 3. Verify the password by comparing the hashed input with the stored hash
        const hashedPassword = await Crypto.digestStringAsync(Crypto.CryptoDigestAlgorithm.SHA256, driverPassword)
        if (hashedPassword !== existingDriver.password) {
            return { success: false, errorMessage: ERROR_MESSAGES.AUTH.INCORRECT_PASSWORD }
        }

        // 4. Remove the password field from the existingDriver object before returning the user data
        const { password, ...safeDriver } = existingDriver

        // 5. Successful server response: User authorized
        return { success: true, successMessage: SUCCESS_MESSAGES.AUTH.AUTHORIZATION_SUCCESS, data: safeDriver }
    } catch (error) {
        console.error(error)
        return { success: false, errorMessage: ERROR_MESSAGES.SERVER.AUTHORIZATION_FAILED }
    }
}
