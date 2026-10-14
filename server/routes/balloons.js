import express from 'express'
import BalloonsController from '../controllers/balloons.js'

const router = express.Router()

router.get('/', BalloonsController.getBalloons)
router.get('/:id', BalloonsController.getBalloonById)
router.post('/', BalloonsController.createBalloon)
router.patch('/:id', BalloonsController.updateBalloon)
router.delete('/:id', BalloonsController.deleteBalloon)

export default router
