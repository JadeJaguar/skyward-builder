// the five things a user can customize, in the order they show on the page
export const FEATURES = [
    { key: 'balloon', label: 'Balloon', hint: 'Pick your balloon design' },
    { key: 'sky', label: 'Sky', hint: 'When do you want to fly?' },
    { key: 'basket', label: 'Basket', hint: 'How many can come along?' },
    { key: 'passengers', label: 'Passengers', hint: '$25 per person' },
    { key: 'extra', label: 'Magic extra', hint: 'A little sparkle around you' }
]

export const imagePath = (file) => `/images/${file}`

export const optionsFor = (options, feature) =>
    options.filter((option) => option.feature === feature)

export const getOption = (options, feature, name) =>
    options.find((option) => option.feature === feature && option.name === String(name))

export const riderLabel = (count) => `${count} ${String(count) === '1' ? 'rider' : 'riders'}`
