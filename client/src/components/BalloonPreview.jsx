import React from 'react'
import { getOption, imagePath, optionsFor } from '../utilities/features'
import '../css/Preview.css'

// three stacked layers: sky (back), balloon with basket (middle), magic extra (top)
const BalloonPreview = ({ options, choices, size = 'large' }) => {
    const skies = optionsFor(options, 'sky')
    const balloon = getOption(options, 'balloon', choices.balloon)
    const extra = getOption(options, 'extra', choices.extra)
    const isNight = choices.sky === 'Starry Night'

    const label = `${choices.balloon} balloon in the ${choices.sky} sky` +
        (extra && extra.image ? ` with ${choices.extra}` : '')

    return (
        <div className={`preview preview-${size}`} role='img' aria-label={label}>

            {/* every sky is stacked so the chosen one can crossfade in */}
            {skies.map((sky) => (
                <img
                    key={sky.id}
                    src={imagePath(sky.image)}
                    alt=''
                    className={`layer layer-sky ${sky.name === choices.sky ? 'is-active' : ''}`}
                />
            ))}

            {balloon && (
                <div className='layer layer-balloon'>
                    <img
                        key={balloon.name}
                        src={imagePath(balloon.image)}
                        alt=''
                        className={`balloon-img ${isNight ? 'is-night' : ''}`}
                    />
                </div>
            )}

            {extra && extra.image && (
                <img
                    key={extra.name}
                    src={imagePath(extra.image)}
                    alt=''
                    className={`layer layer-extra ${extra.name === 'Fireworks' ? 'blend-screen' : ''}`}
                />
            )}

        </div>
    )
}

export default BalloonPreview
