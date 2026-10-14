import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import BalloonPreview from '../components/BalloonPreview'
import ConfirmDelete from '../components/ConfirmDelete'
import StatusMessage, { Loading } from '../components/StatusMessage'
import OptionsAPI from '../services/OptionsAPI'
import BalloonsAPI from '../services/BalloonsAPI'
import { formatPrice } from '../utilities/price'
import { riderLabel } from '../utilities/features'
import '../App.css'
import '../css/Balloons.css'

const ViewBalloons = ({ title }) => {
    const [options, setOptions] = useState(null)
    const [balloons, setBalloons] = useState(null)
    const [loadError, setLoadError] = useState('')
    const [toDelete, setToDelete] = useState(null)

    useEffect(() => {
        document.title = title
    }, [title])

    useEffect(() => {
        Promise.all([OptionsAPI.getAllOptions(), BalloonsAPI.getAllBalloons()])
            .then(([optionData, balloonData]) => {
                setOptions(optionData)
                setBalloons(balloonData)
            })
            .catch((err) => setLoadError(err.message))
    }, [])

    const handleDelete = async (balloon) => {
        await BalloonsAPI.deleteBalloon(balloon.id)
        setBalloons((current) => current.filter((b) => b.id !== balloon.id))
        setToDelete(null)
    }

    if (loadError) {
        return <StatusMessage icon='🌧️' title='The sky is cloudy' text={loadError} />
    }

    if (!options || !balloons) {
        return <Loading />
    }

    if (balloons.length === 0) {
        return (
            <StatusMessage
                title='No balloons yet'
                text='Your saved balloon rides will float here.'
                linkTo='/'
                linkText='Design your first balloon'
            />
        )
    }

    return (
        <main className='balloons-page'>
            <header className='page-header'>
                <h2>My Balloons</h2>
                <p>{balloons.length} {balloons.length === 1 ? 'ride' : 'rides'} ready for takeoff</p>
            </header>

            <ul className='balloon-grid'>
                {balloons.map((balloon) => (
                    <li key={balloon.id} className='balloon-card glass'>
                        <Link to={`/balloons/${balloon.id}`} className='card-link'>
                            <BalloonPreview options={options} choices={balloon} size='small' />
                            <div className='card-body'>
                                <h3>{balloon.name}</h3>
                                <p className='card-meta'>
                                    {balloon.balloon} · {balloon.sky} · {riderLabel(balloon.passengers)}
                                </p>
                            </div>
                        </Link>
                        <div className='card-footer'>
                            <span className='price'>{formatPrice(balloon.total_price)}</span>
                            <div className='card-actions'>
                                <Link to={`/edit/${balloon.id}`} className='btn btn-small btn-dark'>Edit</Link>
                                <button type='button' className='btn btn-small btn-ghost' onClick={() => setToDelete(balloon)}>
                                    Delete
                                </button>
                            </div>
                        </div>
                    </li>
                ))}
            </ul>

            <ConfirmDelete balloon={toDelete} onConfirm={handleDelete} onCancel={() => setToDelete(null)} />
        </main>
    )
}

export default ViewBalloons
