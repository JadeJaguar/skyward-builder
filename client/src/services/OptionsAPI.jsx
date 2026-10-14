const getAllOptions = async () => {
    const response = await fetch('/api/options')
    const data = await response.json()
    if (!response.ok) {
        throw new Error(data.error || 'Could not load the options.')
    }
    return data
}

export default {
    getAllOptions
}
