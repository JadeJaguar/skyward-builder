import React, { useEffect, useState } from 'react'
import { Link, useNavigate, useParams } from 'react-router-dom'
import BalloonBuilder from '../components/BalloonBuilder'
import StatusMessage, { Loading } from '../components/StatusMessage'
import OptionsAPI from '../services/OptionsAPI'
import BalloonsAPI from '../services/BalloonsAPI'
import '../App.css'

const EditBalloon = ({ title }) => {
    const { id } = useParams()
    const navigate = useNavigate()
    const [options, setOptions] = useState(null)
    const [balloon, setBalloon] = useState(null)
    const [loadError, setLoadError] = useState('')

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

    const handleSave = async (changes) => {
        await BalloonsAPI.updateBalloon(id, changes)
        navigate(`/balloons/${id}`)
    }

    if (loadError) {
        return <StatusMessage icon='🌧️' title='We could not find that balloon' text={loadError} linkTo='/balloons' linkText='Back to my balloons' />
    }

    if (!options || !balloon) {
        return <Loading />
    }

    return (
        <BalloonBuilder
            key={balloon.id}
            options={options}
            heading={`Edit ${balloon.name}`}
            saveLabel='Save changes'
            initialName={balloon.name}
            initialChoices={{
                balloon: balloon.balloon,
                sky: balloon.sky,
                basket: balloon.basket,
                passengers: String(balloon.passengers),
                extra: balloon.extra
            }}
            onSave={handleSave}
        >
            <Link to={`/balloons/${id}`} className='btn btn-ghost'>Cancel</Link>
        </BalloonBuilder>
    )
}

export default EditBalloon
