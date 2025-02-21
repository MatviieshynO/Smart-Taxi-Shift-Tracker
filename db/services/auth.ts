import db from '@db/db'
import { LOGIN_FAILED, REGISTRATION_FAILED, UNAUTHORIZET, USERNAME_TAKEN } from '@db/errors/auth'
import { INSERT_DRIVER_QUERY, SELECT_DRIVER_BY_USERNAME_PASSWORD_QUERY, SELECT_DRIVER_BY_USERNAME_QUERY } from '@db/queries/auth'
import { Driver } from '@db/types'
import * as Crypto from 'expo-crypto'

export const registerDriver = async (username: string, password: string): Promise<void> => {
    try {
        const existingDriver = await db.getAllAsync(SELECT_DRIVER_BY_USERNAME_QUERY, [username])
        if (existingDriver[0]) {
            const error = new Error(USERNAME_TAKEN)
            error.name = 'UserAlreadyExists'
            throw error
        }
        const hashedPassword = await Crypto.digestStringAsync(Crypto.CryptoDigestAlgorithm.SHA256, password)
        await db.runAsync(INSERT_DRIVER_QUERY, [username, hashedPassword])
    } catch (error: any) {
        if (error.name === 'UserAlreadyExists') {
            throw error
        }
        throw new Error(REGISTRATION_FAILED)
    }
}
export const login = async (username: string, password: string): Promise<Driver> => {
    try {
        const hashedPassword = await Crypto.digestStringAsync(Crypto.CryptoDigestAlgorithm.SHA256, password)

        const driver = await db.getAllAsync<Driver>(SELECT_DRIVER_BY_USERNAME_PASSWORD_QUERY, [username, hashedPassword])
        if (!driver[0] || (Array.isArray(driver) && driver.length === 0)) {
            const error = new Error(UNAUTHORIZET)
            error.name = 'Unauthorized'
            throw error
        }
        const currentDriver = driver[0]
        return currentDriver
    } catch (error: any) {
        if (error.name === 'Unauthorized') {
            throw error
        }
        throw new Error(LOGIN_FAILED)
    }
}
