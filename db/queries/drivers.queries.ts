export const DRIVERS_QUERIES = {
    SELECT_ALL_USERS: 'SELECT * FROM drivers',
    SELECT_DRIVER_BY_ID: 'SELECT * FROM drivers WHERE id = ?',
    SELECT_DRIVER_BY_NAME: 'SELECT * FROM drivers WHERE name = ?',
    UPDATE_DRIVER_FIELDS: (fields: string[]) => `UPDATE drivers SET ${fields.map((key) => `${key} = ?`).join(', ')} WHERE id = ?`,
    DELETE_DRIVER_BY_ID: 'DELETE FROM drivers WHERE id = ?',
}
