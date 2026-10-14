import React from 'react'
import { Link } from 'react-router-dom'

// friendly loading and error screens
const StatusMessage = ({ icon = '🎈', title, text, linkTo, linkText }) => (
    <main className='status-message'>
        <div className='status-icon' aria-hidden='true'>{icon}</div>
        <h2>{title}</h2>
        {text && <p>{text}</p>}
        {linkTo && <Link to={linkTo} className='btn btn-primary'>{linkText}</Link>}
    </main>
)

export const Loading = () => <StatusMessage icon='☁️' title='Floating in...' />

export default StatusMessage
