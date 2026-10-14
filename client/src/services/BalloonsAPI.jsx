// sends a request to the balloons API and throws the server's error message if it fails
const request = async (url, method = 'GET', body) => {
    const options = { method, headers: { 'Content-Type': 'application/json' } }
    if (body) {
        options.body = JSON.stringify(body)
    }

    const response = await fetch(url, options)
    const data = await response.json()
    if (!response.ok) {
        throw new Error(data.error || 'Something went wrong. Please try again.')
    }
    return data
}

const getAllBalloons = () => request('/api/balloons')

const getBalloonById = (id) => request(`/api/balloons/${id}`)

const createBalloon = (balloon) => request('/api/balloons', 'POST', balloon)

const updateBalloon = (id, balloon) => request(`/api/balloons/${id}`, 'PATCH', balloon)

const deleteBalloon = (id) => request(`/api/balloons/${id}`, 'DELETE')

export default {
    getAllBalloons,
    getBalloonById,
    createBalloon,
    updateBalloon,
    deleteBalloon
}
