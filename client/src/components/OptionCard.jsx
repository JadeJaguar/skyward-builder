import React from 'react'
import { imagePath, riderLabel } from '../utilities/features'
import { BASKET_CAPACITY } from '../utilities/validation'
import { formatAddOn } from '../utilities/price'

const EXTRA_ICONS = {
    'None': '☁️',
    'Flock of Birds': '🐦',
    'Flower Petals': '🌸',
    'Floating Lanterns': '🏮',
    'Fireworks': '🎆'
}

const Thumb = ({ option }) => {
    if (option.feature === 'passengers') {
        return (
            <span className='thumb thumb-riders' aria-hidden='true'>
                {'👤'.repeat(Number(option.name))}
            </span>
        )
    }

    // extras sit around the edges of the picture, so a small thumbnail would look empty
    if (option.feature === 'extra') {
        return <span className='thumb thumb-icon' aria-hidden='true'>{EXTRA_ICONS[option.name]}</span>
    }

    return (
        <span className={`thumb thumb-${option.feature}`} aria-hidden='true'>
            <img src={imagePath(option.image)} alt='' loading='lazy' />
        </span>
    )
}

const OptionCard = ({ option, selected, lockNote, onPick }) => {
    const locked = Boolean(lockNote)

    let title = option.name
    let subtitle = null
    if (option.feature === 'passengers') {
        title = riderLabel(option.name)
    } else if (option.feature === 'basket') {
        subtitle = `Fits ${BASKET_CAPACITY[option.name]}`
    } else if (option.feature === 'extra' && option.name === 'None') {
        title = 'No extra'
    }

    return (
        <button
            type='button'
            className={`option-card ${selected ? 'is-selected' : ''} ${locked ? 'is-locked' : ''}`}
            onClick={() => onPick(option)}
            disabled={locked}
            aria-pressed={selected}
            title={locked ? lockNote : undefined}
        >
            <Thumb option={option} />
            <span className='option-name'>{title}</span>
            {subtitle && <span className='option-sub'>{subtitle}</span>}
            {locked
                ? <span className='option-lock'>🔒 {lockNote}</span>
                : <span className='option-price'>{formatAddOn(option.price)}</span>}
        </button>
    )
}

export default OptionCard
