// every option a user can pick, used by reset.js to fill the options table
// passengers cost $25 each, so each passenger option stores its full price
const optionData = [
    { feature: 'balloon', name: 'Sunset Stripes', price: 0, image: 'balloon-sunset-stripes.webp' },
    { feature: 'balloon', name: 'Ocean Breeze', price: 50, image: 'balloon-ocean-breeze.webp' },
    { feature: 'balloon', name: 'Rose Garden', price: 80, image: 'balloon-rose-garden.webp' },
    { feature: 'balloon', name: 'Midnight Stars', price: 120, image: 'balloon-midnight-stars.webp' },
    { feature: 'balloon', name: 'Aurora Glow', price: 150, image: 'balloon-aurora-glow.webp' },

    { feature: 'sky', name: 'Morning Meadow', price: 0, image: 'sky-morning.webp' },
    { feature: 'sky', name: 'Golden Sunset', price: 40, image: 'sky-sunset.webp' },
    { feature: 'sky', name: 'Starry Night', price: 70, image: 'sky-night.webp' },
    { feature: 'sky', name: 'Above the Clouds', price: 90, image: 'sky-clouds.webp' },

    { feature: 'basket', name: 'Cozy', price: 0, image: 'basket-cozy.webp' },
    { feature: 'basket', name: 'Classic', price: 100, image: 'basket-classic.webp' },
    { feature: 'basket', name: 'Grand', price: 250, image: 'basket-grand.webp' },

    { feature: 'passengers', name: '1', price: 25, image: null },
    { feature: 'passengers', name: '2', price: 50, image: null },
    { feature: 'passengers', name: '4', price: 100, image: null },
    { feature: 'passengers', name: '6', price: 150, image: null },

    { feature: 'extra', name: 'None', price: 0, image: null },
    { feature: 'extra', name: 'Flock of Birds', price: 20, image: 'extra-birds.webp' },
    { feature: 'extra', name: 'Flower Petals', price: 40, image: 'extra-petals.webp' },
    { feature: 'extra', name: 'Floating Lanterns', price: 60, image: 'extra-lanterns.webp' },
    { feature: 'extra', name: 'Fireworks', price: 90, image: 'extra-fireworks.webp' }
]

export default optionData
