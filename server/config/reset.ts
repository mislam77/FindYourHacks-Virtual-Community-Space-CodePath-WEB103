import { pool } from './database';
import './dotenv';

const resetDatabase = async () => {
    try {
        await pool.query('DROP TABLE IF EXISTS fixtures');
        await pool.query('DROP TABLE IF EXISTS leagues');

        await pool.query(`
            CREATE TABLE leagues (
                id SERIAL PRIMARY KEY,
                name VARCHAR(255) NOT NULL,
                country VARCHAR(255) NOT NULL,
                logo VARCHAR(255)
            )
        `);

        await pool.query(`
            CREATE TABLE fixtures (
                id SERIAL PRIMARY KEY,
                league_id INTEGER REFERENCES leagues(id),
                home_team VARCHAR(255) NOT NULL,
                away_team VARCHAR(255) NOT NULL,
                date TIMESTAMP NOT NULL,
                home_score INTEGER,
                away_score INTEGER,
                venue_name VARCHAR(255),
                venue_city VARCHAR(255)
            )
        `);

        console.log('Database reset successfully');
    } catch (error) {
        console.error('Error resetting database:', error);
    } finally {
        pool.end();
    }
};

resetDatabase();