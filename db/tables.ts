export const createDriversTable = `
            CREATE TABLE IF NOT EXISTS drivers (
                id INTEGER PRIMARY KEY AUTOINCREMENT,
                username TEXT UNIQUE NOT NULL,  
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
