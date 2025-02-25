export const CAR_QUERIES = {
    SELECT_CAR_BY_PLATE: 'SELECT id FROM cars WHERE plate = ?',
    INSERT_NEW_CAR:
        'INSERT INTO cars (driver_id, brand, model, plate, fuel_type, fuel_consumption,profile_photo) VALUES (?, ?, ?, ?, ?, ?, ?)',
    SELECT_CARS_BY_DRIVER_ID: 'SELECT * FROM cars WHERE driver_id = ?',
    SELECT_CAR_BY_ID: 'SELECT * FROM cars WHERE id = ?',
    UPDATE_CAR_FIELDS: (fields: string[]) => `UPDATE cars SET ${fields.map((key) => `${key} = ?`).join(', ')} WHERE id = ?`,
    DELETE_CAR_BY_ID: 'DELETE FROM cars WHERE id = ?',
}
