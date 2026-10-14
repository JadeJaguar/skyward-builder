// impossible combo rules
// this mirrors client/src/utilities/validation.js, so keep the two files the same

export const BASE_PRICE = 500

export const BASKET_CAPACITY = {
    'Cozy': 2,
    'Classic': 4,
    'Grand': 6
}

export const RULES = [
    {
        check: (b) => b.basket === 'Cozy' && Number(b.passengers) > 2,
        message: 'The Cozy basket only fits 2 people.'
    },
    {
        check: (b) => b.basket === 'Classic' && Number(b.passengers) > 4,
        message: 'The Classic basket only fits 4 people.'
    },
    {
        check: (b) => b.balloon === 'Aurora Glow' && b.sky !== 'Starry Night',
        message: 'Aurora Glow only shines at night.'
    },
    {
        check: (b) => b.extra === 'Fireworks' && b.sky !== 'Starry Night',
        message: 'Fireworks only show up at night.'
    },
    {
        check: (b) => b.extra === 'Floating Lanterns' && b.sky !== 'Golden Sunset' && b.sky !== 'Starry Night',
        message: 'Lanterns only glow in the evening or at night.'
    },
    {
        check: (b) => b.extra === 'Flock of Birds' && b.sky === 'Starry Night',
        message: 'The birds are asleep at night.'
    }
]

// returns a list of error messages, empty if the combo is fine
export const getComboErrors = (balloon) =>
    RULES.filter((rule) => rule.check(balloon)).map((rule) => rule.message)
