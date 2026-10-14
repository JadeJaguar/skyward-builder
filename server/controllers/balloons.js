import { pool } from '../config/database.js'
import { BASE_PRICE, getComboErrors } from '../utilities/validation.js'

const FEATURES = ['balloon', 'sky', 'basket', 'passengers', 'extra']

// checks a balloon sent by the client and works out its price from the options table
// returns { error } if something is wrong, or { balloon } ready to save
const checkBalloon = async (body) => {
    const name = typeof body.name === 'string' ? body.name.trim() : ''
    if (!name) {
        return { error: 'Please give your balloon a name.' }
    }

    const results = await pool.query('SELECT feature, name, price FROM options')
    const options = results.rows

    let total = BASE_PRICE
    for (const feature of FEATURES) {
        const choice = String(body[feature] ?? '')
        const option = options.find((o) => o.feature === feature && o.name === choice)
        if (!option) {
            return { error: `Please pick a valid ${feature}.` }
        }
        total += option.price
    }

    const balloon = {
        name,
        balloon: body.balloon,
        sky: body.sky,
        basket: body.basket,
        passengers: parseInt(body.passengers),
        extra: body.extra,
        total_price: total
    }

    const comboErrors = getComboErrors(balloon)
    if (comboErrors.length > 0) {
        return { error: comboErrors[0] }
    }

    return { balloon }
}

const getBalloons = async (req, res) => {
    try {
        const results = await pool.query('SELECT * FROM balloons ORDER BY created_at DESC')
        res.status(200).json(results.rows)
    } catch (error) {
        res.status(500).json({ error: error.message })
    }
}

const getBalloonById = async (req, res) => {
    try {
        const id = parseInt(req.params.id)
        const results = await pool.query('SELECT * FROM balloons WHERE id = $1', [id])
        if (results.rows.length === 0) {
            return res.status(404).json({ error: 'Balloon not found.' })
        }
        res.status(200).json(results.rows[0])
    } catch (error) {
        res.status(500).json({ error: error.message })
    }
}

const createBalloon = async (req, res) => {
    try {
        const { error, balloon } = await checkBalloon(req.body)
        if (error) {
            return res.status(400).json({ error })
        }

        const results = await pool.query(`
            INSERT INTO balloons (name, balloon, sky, basket, passengers, extra, total_price)
            VALUES ($1, $2, $3, $4, $5, $6, $7)
            RETURNING *`,
            [balloon.name, balloon.balloon, balloon.sky, balloon.basket, balloon.passengers, balloon.extra, balloon.total_price]
        )
        res.status(201).json(results.rows[0])
    } catch (error) {
        res.status(500).json({ error: error.message })
    }
}

const updateBalloon = async (req, res) => {
    try {
        const id = parseInt(req.params.id)
        const { error, balloon } = await checkBalloon(req.body)
        if (error) {
            return res.status(400).json({ error })
        }

        const results = await pool.query(`
            UPDATE balloons
            SET name = $1, balloon = $2, sky = $3, basket = $4, passengers = $5, extra = $6, total_price = $7
            WHERE id = $8
            RETURNING *`,
            [balloon.name, balloon.balloon, balloon.sky, balloon.basket, balloon.passengers, balloon.extra, balloon.total_price, id]
        )
        if (results.rows.length === 0) {
            return res.status(404).json({ error: 'Balloon not found.' })
        }
        res.status(200).json(results.rows[0])
    } catch (error) {
        res.status(500).json({ error: error.message })
    }
}

const deleteBalloon = async (req, res) => {
    try {
        const id = parseInt(req.params.id)
        const results = await pool.query('DELETE FROM balloons WHERE id = $1 RETURNING *', [id])
        if (results.rows.length === 0) {
            return res.status(404).json({ error: 'Balloon not found.' })
        }
        res.status(200).json(results.rows[0])
    } catch (error) {
        res.status(500).json({ error: error.message })
    }
}

export default {
    getBalloons,
    getBalloonById,
    createBalloon,
    updateBalloon,
    deleteBalloon
}
