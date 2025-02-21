export const SELECT_DRIVER_BY_USERNAME_QUERY = 'SELECT id FROM drivers WHERE username = ?'

export const INSERT_DRIVER_QUERY = 'INSERT INTO drivers (username, password) VALUES (?, ?)'

export const SELECT_DRIVER_BY_USERNAME_PASSWORD_QUERY = 'SELECT * FROM drivers WHERE username = ? AND password = ?'