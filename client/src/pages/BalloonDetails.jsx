import React, { useEffect, useState } from 'react'
import { Link, useNavigate, useParams } from 'react-router-dom'
import BalloonPreview from '../components/BalloonPreview'
import ConfirmDelete from '../components/ConfirmDelete'
import StatusMessage, { Loading } from '../components/StatusMessage'
import OptionsAPI from '../services/OptionsAPI'
import BalloonsAPI from '../services/BalloonsAPI'
import { FEATURES, riderLabel } from '../utilities/features'
import { BASE_PRICE, formatAddOn, formatPrice, getOptionPrice } from '../utilities/price'
import { BASKET_CAPACITY } from '../utilities/validation'
import '../App.css'
import '../css/Balloons.css'

const displayChoice = (feature, value) => {
    if (feature === 'passengers') return riderLabel(value)
    if (feature === 'basket') return `${value} (fits ${BASKET_CAPACITY[value]})`
    if (feature === 'extra' && value === 'None') return 'No extra'
    return value
}

const BalloonDetails = ({ title }) => {
    const { id } = useParams()
    const navigate = useNavigate()
    const [options, setOptions] = useState(null)
    const [balloon, setBalloon] = useState(null)
    const [loadError, setLoadError] = useState('')
    const [confirming, setConfirming] = useState(false)

    useEffect(() => {
        document.title = title
    }, [title])

    useEffect(() => {
        Promise.all([OptionsAPI.getAllOptions(), BalloonsAPI.getBalloonById(id)])
            .then(([optionData, balloonData]) => {
                setOptions(optionData)
                setBalloon(balloonData)
            })
            .catch((err) => setLoadError(err.message))
    }, [id])

    const handleDelete = async () => {
        await BalloonsAPI.deleteBalloon(id)
        navigate('/balloons')
    }

    if (loadError) {
        return <StatusMessage icon='🌧️' title='We could not find that balloon' text={loadError} linkTo='/balloons' linkText='Back to my balloons' />
    }

    if (!options || !balloon) {
        return <Loading />
    }

    const savedOn = new Date(balloon.created_at).toLocaleDateString('en-US', {
        month: 'long', day: 'numeric', year: 'numeric'
    })

    return (
        <main className='details-page'>
            <section className='details-stage'>
                <BalloonPreview options={options} choices={balloon} size='large' />
            </section>

            <section className='details-panel glass'>
                <Link to='/balloons' className='back-link'>← All balloons</Link>
                <p className='eyebrow'>Saved {savedOn}</p>
                <h2>{balloon.name}</h2>

                <dl className='choice-list'>
                    <div className='choice-row'>
                        <dt>Base ride</dt>
                        <dd>Hot air balloon flight</dd>
                        <dd className='choice-price'>{formatPrice(BASE_PRICE)}</dd>
                    </div>
                    {FEATURES.map((feature) => (
                        <div key={feature.key} className='choice-row'>
                            <dt>{feature.label}</dt>
                            <dd>{displayChoice(feature.key, balloon[feature.key])}</dd>
                            <dd className='choice-price'>
                                {formatAddOn(getOptionPrice(options, feature.key, balloon[feature.key]))}
                            </dd>
                        </div>
                    ))}
                </dl>

                <div className='details-total'>
                    <span className='total-label'>Total</span>
                    <span className='price'>{formatPrice(balloon.total_price)}</span>
                </div>

                <div className='details-actions'>
                    <button type='button' className='btn btn-ghost' onClick={() => setConfirming(true)}>Delete</button>
                    <Link to={`/edit/${balloon.id}`} className='btn btn-primary'>Edit</Link>
                </div>
            </section>

            <ConfirmDelete
                balloon={confirming ? balloon : null}
                onConfirm={handleDelete}
                onCancel={() => setConfirming(false)}
            />
        </main>
    )
}

export default BalloonDetails
