export const ERROR_MESSAGES = {
    DATABASE: {
        INIT_FAILED: 'Database initialization failed.',
    },
    AUTH: {
        // Registration
        REGISTRATION_FAILED: 'Registration failed. Please try again.',
        MISSING_DRIVER_NAME: 'Driver name is required.',
        MISSING_DRIVER_PASSWORD: 'Driver password is required.',
        MISSING_DRIVER_PASSWORD_CONFIRM: 'Driver password confirm is required.',
        SHORT_DRIVER_NAME: 'Driver name must be at least 3 characters long.',
        INVALID_PASSWORD_LENGTH: 'Password must be exactly 4 characters long.',
        PASSWORDS_DO_NOT_MATCH: 'Password and confirmation password do not match.',
        DRIVER_ALREADY_EXISTS: 'A driver with this name already exists.',

        // Authorization
        DRIVER_NOT_FOUND: 'Driver not found.',
        INCORRECT_PASSWORD: 'Incorrect password.',
    },
    DRIVERS: {
        MISSING_DRIVER_ID: 'Driver ID is required.',
        MISSING_DRIVER_NAME: 'Driver name is required.',
        MISSING_DRIVER_UPDATE_FIRLDS: 'Update fields are required',
    },
    CARS: {
        MISSING_CAR_OPTIONS: 'Car options is required',
        CAR_ALREADY_EXISTS: 'A car with this plate already exists.',
        MISSING_DRIVER_ID: 'Driver ID is required.',
        MISSING_CAR_ID: 'Car ID is required.',
        MISSING_CAR_UPDATE_FIRLDS: 'Update fields are required',
    },
    SHIFTS: {
        MISSING_SHIFT_OPTIONS: 'Shift options is required',
        MISSING_DRIVER_ID: 'Driver ID is required.',
        MISSING_SHIFT_ID: 'Shift ID is required.',
        MISSING_SHIFT_UPDATE_FIRLDS: 'Update fields are required',
    },
    SERVER: {
        GENERAL_ERROR: 'An unexpected server error occurred.',
        REGISTRATION_FAILED: 'Server error: Registration failed',
        AUTHORIZATION_FAILED: 'Server error: Authorization failed',
    },
}
