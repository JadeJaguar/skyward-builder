import React, { useState } from 'react'
import BalloonPreview from './BalloonPreview'
import OptionCard from './OptionCard'
import AnimatedPrice from './AnimatedPrice'
import { FEATURES, optionsFor } from '../utilities/features'
import { calcTotal } from '../utilities/price'
import { DEFAULT_CHOICES, fixChoices, getComboErrors, getLockNote } from '../utilities/validation'
import '../css/Builder.css'

// the shared design form used by the Create and Edit pages
const BalloonBuilder = ({ options, heading, saveLabel, initialName = '', initialChoices = DEFAULT_CHOICES, onSave, children }) => {
    const [choices, setChoices] = useState(initialChoices)
    const [name, setName] = useState(initialName)
    const [notes, setNotes] = useState([])
    const [error, setError] = useState('')
    const [saving, setSaving] = useState(false)

    const total = calcTotal(options, choices)

    const handlePick = (option) => {
        const picked = { ...choices, [option.feature]: option.name }
        const result = fixChoices(picked)
        setChoices(result.choices)
        setNotes(result.notes)
        setError('')
    }

    const handleSubmit = async (event) => {
        event.preventDefault()
        setNotes([])

        if (!name.trim()) {
            setError('Please give your balloon a name.')
            return
        }

        const comboErrors = getComboErrors(choices)
        if (comboErrors.length > 0) {
            setError(comboErrors.join(' '))
            return
        }

        setSaving(true)
        setError('')
        try {
            await onSave({ name: name.trim(), ...choices })
        } catch (err) {
            setError(err.message)
            setSaving(false)
        }
    }

    return (
        <main className='builder'>

            <section className='builder-stage' aria-label='Balloon preview'>
                <BalloonPreview options={options} choices={choices} size='large' />
                <p className='stage-caption'>
                    {name.trim() || 'Your balloon'} · {choices.balloon} · {choices.sky}
                </p>
            </section>

            <form className='builder-panel glass' onSubmit={handleSubmit} noValidate>
                <h2>{heading}</h2>

                {FEATURES.map((feature) => (
                    <fieldset key={feature.key} className='feature'>
                        <legend>
                            <span className='feature-label'>{feature.label}</span>
                            <span className='feature-hint'>{feature.hint}</span>
                        </legend>
                        <div className={`option-grid option-grid-${feature.key}`}>
                            {optionsFor(options, feature.key).map((option) => (
                                <OptionCard
                                    key={option.id}
                                    option={option}
                                    selected={String(choices[feature.key]) === option.name}
                                    lockNote={getLockNote(choices, feature.key, option.name)}
                                    onPick={handlePick}
                                />
                            ))}
                        </div>
                    </fieldset>
                ))}

                <label className='name-field'>
                    <span className='feature-label'>Name your balloon</span>
                    <input
                        type='text'
                        value={name}
                        onChange={(e) => { setName(e.target.value); setError('') }}
                        placeholder={'Like "Grandma\'s Birthday Flight"'}
                        maxLength={60}
                        required
                    />
                </label>

                <div className='save-bar'>
                    {notes.length > 0 && (
                        <div className='form-notice' role='status'>
                            {notes.map((note) => <p key={note}>✨ {note}</p>)}
                        </div>
                    )}
                    {error && <p className='form-error' role='alert'>{error}</p>}

                    <div className='save-row'>
                        <div className='total'>
                            <span className='total-label'>Total</span>
                            <AnimatedPrice value={total} />
                        </div>
                        <div className='save-actions'>
                            {children}
                            <button type='submit' className='btn btn-primary' disabled={saving}>
                                {saving ? 'Saving...' : saveLabel}
                            </button>
                        </div>
                    </div>
                </div>
            </form>

        </main>
    )
}

export default BalloonBuilder
