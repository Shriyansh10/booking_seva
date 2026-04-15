import { Router } from "express";
import * as controller from './booking.controller.js'
import * as middleware from '../auth/user.middleware.js'

const router = Router()

router.get('/seats', controller.getAllSeats)
router.get('/booking/:id', middleware.authenticate, controller.bookSeat)

export default router;