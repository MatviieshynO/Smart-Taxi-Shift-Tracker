export const SHIFTS_QUERIES = {
    INSERT_NEW_SHIFT:
        'INSERT INTO shifts (driver_id, car_id, total_time, total_km, total_earnings, total_expenses) VALUES (?, ?, ?, ?, ?, ?)',
    SELECT_SHIFTS_BY_DRIVER_ID: 'SELECT * FROM shifts WHERE driver_id = ?',
    SELECT_SHIFT_BY_ID: 'SELECT * FROM shift WHERE id = ?',
    UPDATE_SHIFT_FIELDS: (fields: string[]) => `UPDATE shifts SET ${fields.map((key) => `${key} = ?`).join(', ')} WHERE id = ?`,
    DELETE_SHIFT_BY_ID: 'DELETE FROM shifts WHERE id = ?',
}
