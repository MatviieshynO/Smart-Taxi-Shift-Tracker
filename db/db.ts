import { openDatabaseSync } from 'expo-sqlite'
import { createDriversTable } from './tables'

const db = openDatabaseSync('taxi_helper.db')

export async function createTables() {
    try {
        await db.execAsync(createDriversTable)
    } catch (error) {
        throw new Error('Database initialization failed.')
    }
}

export default db
