import { FEATURES, getOption } from './features'

export const BASE_PRICE = 500

export const getOptionPrice = (options, feature, name) =>
    getOption(options, feature, name)?.price ?? 0

// base price plus the price of every chosen option
export const calcTotal = (options, choices) =>
    FEATURES.reduce(
        (total, feature) => total + getOptionPrice(options, feature.key, choices[feature.key]),
        BASE_PRICE
    )

export const formatPrice = (amount) => `$${Math.round(amount).toLocaleString('en-US')}`

export const formatAddOn = (amount) => (amount === 0 ? 'Included' : `+${formatPrice(amount)}`)
