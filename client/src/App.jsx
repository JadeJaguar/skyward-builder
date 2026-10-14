import React from 'react'
import { useRoutes } from 'react-router-dom'
import Navigation from './components/Navigation'
import ViewBalloons from './pages/ViewBalloons'
import EditBalloon from './pages/EditBalloon'
import CreateBalloon from './pages/CreateBalloon'
import BalloonDetails from './pages/BalloonDetails'
import './App.css'

const App = () => {
  let element = useRoutes([
    {
      path: '/',
      element: <CreateBalloon title='SKYWARD | Design' />
    },
    {
      path:'/balloons',
      element: <ViewBalloons title='SKYWARD | My Balloons' />
    },
    {
      path: '/balloons/:id',
      element: <BalloonDetails title='SKYWARD | View' />
    },
    {
      path: '/edit/:id',
      element: <EditBalloon title='SKYWARD | Edit' />
    }
  ])

  return (
    <div className='app'>

      <Navigation />

      { element }

    </div>
  )
}

export default App
