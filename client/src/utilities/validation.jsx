// impossible combo rules
// the server checks the same rules in server/utilities/validation.js, so change both together

export const BASKET_CAPACITY = {
    'Cozy': 2,
    'Classic': 4,
    'Grand': 6
}

export const DEFAULT_CHOICES = {
    balloon: 'Sunset Stripes',
    sky: 'Morning Meadow',
    basket: 'Cozy',
    passengers: '2',
    extra: 'None'
}

const isNight = (c) => c.sky === 'Starry Night'

// target: the choice that gets locked or reset when the rule is broken
// note: the short text shown on a locked option card
export const RULES = [
    {
        target: 'passengers',
        check: (c) => c.basket === 'Cozy' && Number(c.passengers) > 2,
        message: 'The Cozy basket only fits 2 people.',
        note: 'Cozy fits 2'
    },
    {
        target: 'passengers',
        check: (c) => c.basket === 'Classic' && Number(c.passengers) > 4,
        message: 'The Classic basket only fits 4 people.',
        note: 'Classic fits 4'
    },
    {
        target: 'balloon',
        check: (c) => c.balloon === 'Aurora Glow' && !isNight(c),
        message: 'Aurora Glow only shines at night.',
        note: 'Only at night'
    },
    {
        target: 'extra',
        check: (c) => c.extra === 'Fireworks' && !isNight(c),
        message: 'Fireworks only show up at night.',
        note: 'Only at night'
    },
    {
        target: 'extra',
        check: (c) => c.extra === 'Floating Lanterns' && c.sky !== 'Golden Sunset' && !isNight(c),
        message: 'Lanterns only glow in the evening or at night.',
        note: 'Evening or night'
    },
    {
        target: 'extra',
        check: (c) => c.extra === 'Flock of Birds' && isNight(c),
        message: 'The birds are asleep at night.',
        note: 'Not at night'
    }
]

// error on save: every rule the choices break
export const getComboErrors = (choices) =>
    RULES.filter((rule) => rule.check(choices)).map((rule) => rule.message)

// early warning: the lock note for an option, or null if it is safe to pick
export const getLockNote = (choices, feature, name) => {
    const test = { ...choices, [feature]: name }
    const rule = RULES.find((r) => r.target === feature && r.check(test))
    return rule ? rule.note : null
}

// auto fix: reset any choice a change made invalid, and explain what changed
export const fixChoices = (choices) => {
    const fixed = { ...choices }
    const notes = []

    for (const rule of RULES) {
        if (!rule.check(fixed)) continue

        if (rule.target === 'passengers') {
            fixed.passengers = String(BASKET_CAPACITY[fixed.basket])
            notes.push(`${rule.message} We changed passengers to ${fixed.passengers}.`)
        } else if (rule.target === 'extra') {
            notes.push(`${rule.message} We took off the ${fixed.extra}.`)
            fixed.extra = DEFAULT_CHOICES.extra
        } else {
            fixed[rule.target] = DEFAULT_CHOICES[rule.target]
            notes.push(`${rule.message} We switched your balloon to ${fixed[rule.target]}.`)
        }
    }

    return { choices: fixed, notes }
}
