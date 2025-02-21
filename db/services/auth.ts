import db from '@db/db'
import { REGISTRATION_FAILED, USERNAME_TAKEN } from '@db/errors/auth'
import { INSERT_DRIVER_QUERY, SELECT_DRIVER_BY_USERNAME_QUERY } from '@db/queries/auth'
import * as Crypto from 'expo-crypto'

export const registerDriver = async (username: string, password: string): Promise<void> => {
    try {
        const existingUser = await db.getAllAsync(SELECT_DRIVER_BY_USERNAME_QUERY, [username])
        if (existingUser.length > 0) {
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
