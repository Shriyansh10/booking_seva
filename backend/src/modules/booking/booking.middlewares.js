import ApiError from "../../common/utils/api-error.js";
import * as utils from '../../common/utils/jwt.utils.js'
import * as models from './booking.model.js'
import pool from '../../common/config/db.js'
import { getSeat } from "./booking.model.js";

const authorize = async (req, res, next) => {
    const {name, is_booked} = await getSeat(pool, {seatId: req.params.id})
    if(is_booked) throw ApiError.forbidden(`Seat ${name} already booked`)
    
    next();
}

export {authorize}