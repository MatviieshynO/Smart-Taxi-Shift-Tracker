export const SELECT_DRIVER_BY_ID = 'SELECT * FROM drivers WHERE id = ?'

export const GET_DRIVER_BY_ID = 'SELECT * FROM drivers WHERE id = ?'

export const UPDATE_DRIVER = (fields: string[]) => `UPDATE drivers SET ${fields.map((key) => `${key} = ?`).join(', ')} WHERE id = ?`

export const DELET_DRIVER_BY_ID = `DELETE FROM drivers WHERE id = ?`

export const SELECT_DRIVER_BY_USERNAME = 'SELECT * FROM drivers WHERE username = ?'
