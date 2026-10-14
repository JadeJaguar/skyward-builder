import React, { useEffect, useRef, useState } from 'react'
import { formatPrice } from '../utilities/price'

const DURATION = 500

// counts smoothly up or down to the new price
const AnimatedPrice = ({ value, className = '' }) => {
    const [shown, setShown] = useState(value)
    const shownRef = useRef(value)

    useEffect(() => {
        const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches
        const from = shownRef.current
        if (from === value || reduceMotion) {
            shownRef.current = value
            setShown(value)
            return
        }

        const start = performance.now()
        let frame

        const tick = (now) => {
            const progress = Math.min((now - start) / DURATION, 1)
            const eased = 1 - Math.pow(1 - progress, 3)
            shownRef.current = from + (value - from) * eased
            setShown(shownRef.current)
            if (progress < 1) {
                frame = requestAnimationFrame(tick)
            }
        }

        frame = requestAnimationFrame(tick)
        return () => cancelAnimationFrame(frame)
    }, [value])

    return (
        <span className={`price ${className}`} aria-live='polite'>
            {formatPrice(shown)}
        </span>
    )
}

export default AnimatedPrice
