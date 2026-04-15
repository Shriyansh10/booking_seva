import { Router } from "express";
import * as controller from './booking.controller.js'
import * as authMiddleware from '../auth/user.middleware.js'
import * as bookingMiddleware from '../booking/booking.middlewares.js'

const router = Router()

router.get('/seats', controller.getAllSeats)
router.get('/booking/:id', authMiddleware.authenticate, bookingMiddleware.authorize, controller.bookSeat)

export default router;