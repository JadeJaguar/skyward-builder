import './dotenv.js'
import { pool } from './database.js'
import optionData from '../data/options.js'

const createTables = async () => {
    const createTablesQuery = `
        DROP TABLE IF EXISTS balloons;
        DROP TABLE IF EXISTS options;

        CREATE TABLE IF NOT EXISTS options (
            id SERIAL PRIMARY KEY,
            feature TEXT NOT NULL,
            name TEXT NOT NULL,
            price INTEGER NOT NULL,
            image TEXT
        );

        CREATE TABLE IF NOT EXISTS balloons (
            id SERIAL PRIMARY KEY,
            name TEXT NOT NULL,
            balloon TEXT,
            sky TEXT,
            basket TEXT,
            passengers INTEGER,
            extra TEXT,
            total_price INTEGER,
            created_at TIMESTAMP DEFAULT NOW()
        );
    `

    await pool.query(createTablesQuery)
    console.log('🎉 options and balloons tables created successfully')
}

const seedOptionsTable = async () => {
    for (const option of optionData) {
        const insertQuery = {
            text: 'INSERT INTO options (feature, name, price, image) VALUES ($1, $2, $3, $4)',
            values: [option.feature, option.name, option.price, option.image]
        }

        await pool.query(insertQuery)
        console.log(`✅ ${option.feature}: ${option.name} added successfully`)
    }
}

const reset = async () => {
    try {
        await createTables()
        await seedOptionsTable()
    } catch (err) {
        console.error('⚠️ error resetting the database', err)
    } finally {
        await pool.end()
    }
}

reset()
