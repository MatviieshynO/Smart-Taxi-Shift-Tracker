export const AUTH_QUERIES = {
    SELECT_BY_NAME: 'SELECT * FROM drivers WHERE name = ? LIMIT 1',
    INSERT_DRIVER: 'INSERT INTO drivers (name, password) VALUES (?, ?);',
}
