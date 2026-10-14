import React from 'react'
import '../App.css'
import '../css/Navigation.css'

const Navigation = () => {
    return (
        <nav>
            <ul>
                <li><h1>Skyward 🎈</h1></li>
            </ul>

            <ul>
                <li><a href='/' role='button'>Design</a></li>
                <li><a href='/balloons' role='button'>My Balloons</a></li>
            </ul>
            
        </nav>
    )
}

export default Navigation