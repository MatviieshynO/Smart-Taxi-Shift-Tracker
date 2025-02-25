import { openDatabaseSync } from 'expo-sqlite'
import { createCarsTable, createDriversTable } from './tables'
import { ERROR_MESSAGES } from './constants/errorMessages'
import { SUCCESS_MESSAGES } from './constants/successMessages'

const db = openDatabaseSync('taxi_helper.db')

export async function createTables() {
    try {
        await db.execAsync(createDriversTable)
        await db.execAsync(createCarsTable)
        console.log(SUCCESS_MESSAGES.DATABASE.INIT_SUCCESS)
    } catch (error) {
        console.error(ERROR_MESSAGES.DATABASE.INIT_FAILED)
    }
}

export default db
