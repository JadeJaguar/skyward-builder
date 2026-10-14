import React from 'react'
import { Link, NavLink } from 'react-router-dom'
import '../App.css'
import '../css/Navigation.css'

const Navigation = () => {
    return (
        <nav className='nav'>
            <Link to='/' className='nav-brand'>
                <span className='nav-logo' aria-hidden='true'>🎈</span>
                <span>Skyward</span>
            </Link>

            <ul className='nav-links'>
                <li><NavLink to='/' end className='nav-link'>Design</NavLink></li>
                <li><NavLink to='/balloons' className='nav-link'>My Balloons</NavLink></li>
            </ul>
        </nav>
    )
}

export default Navigation
