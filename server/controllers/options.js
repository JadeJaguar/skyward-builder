import { pool } from '../config/database.js'

const getOptions = async (req, res) => {
    try {
        const results = await pool.query('SELECT * FROM options ORDER BY id ASC')
        res.status(200).json(results.rows)
    } catch (error) {
        res.status(500).json({ error: error.message })
    }
}

export default {
    getOptions
}
