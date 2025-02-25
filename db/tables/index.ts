export const createDriversTable = `
            CREATE TABLE IF NOT EXISTS drivers (
                id INTEGER PRIMARY KEY AUTOINCREMENT,
                name TEXT UNIQUE NOT NULL,  
                password TEXT NOT NULL,         
                profile_photo TEXT,             
                created_at DATETIME DEFAULT CURRENT_TIMESTAMP, 
                updated_at DATETIME DEFAULT CURRENT_TIMESTAMP 
            );
        
            CREATE TRIGGER IF NOT EXISTS update_driver_timestamp
            AFTER UPDATE ON drivers
            FOR EACH ROW
            BEGIN
                UPDATE drivers SET updated_at = CURRENT_TIMESTAMP WHERE id = OLD.id;
            END;
        `
export const createCarsTable = `
            CREATE TABLE IF NOT EXISTS cars (
                id INTEGER PRIMARY KEY AUTOINCREMENT,
                driver_id INTEGER NOT NULL,
                brand TEXT NOT NULL,
                model TEXT NOT NULL,
                plate TEXT NOT NULL UNIQUE,
                fuel_type TEXT NOT NULL,
                fuel_consumption REAL NOT NULL CHECK (fuel_consumption >= 0),
                profile_photo TEXT,
                created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
                updated_at DATETIME DEFAULT CURRENT_TIMESTAMP,
                FOREIGN KEY (driver_id) REFERENCES drivers(id) ON DELETE CASCADE
            );
        
            CREATE TRIGGER IF NOT EXISTS update_car_timestamp
            AFTER UPDATE ON cars
            FOR EACH ROW
            BEGIN
                UPDATE cars SET updated_at = CURRENT_TIMESTAMP WHERE id = OLD.id;
            END;
        `
