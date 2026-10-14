import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import BalloonBuilder from '../components/BalloonBuilder'
import StatusMessage, { Loading } from '../components/StatusMessage'
import OptionsAPI from '../services/OptionsAPI'
import BalloonsAPI from '../services/BalloonsAPI'
import '../App.css'

const CreateBalloon = ({ title }) => {
    const navigate = useNavigate()
    const [options, setOptions] = useState(null)
    const [loadError, setLoadError] = useState('')

    useEffect(() => {
        document.title = title
    }, [title])

    useEffect(() => {
        OptionsAPI.getAllOptions()
            .then(setOptions)
            .catch((err) => setLoadError(err.message))
    }, [])

    const handleSave = async (balloon) => {
        await BalloonsAPI.createBalloon(balloon)
        navigate('/balloons')
    }

    if (loadError) {
        return <StatusMessage icon='🌧️' title='The sky is cloudy' text={loadError} />
    }

    if (!options) {
        return <Loading />
    }

    return (
        <BalloonBuilder
            options={options}
            heading='Design your balloon ride'
            saveLabel='Save balloon'
            onSave={handleSave}
        />
    )
}

export default CreateBalloon
