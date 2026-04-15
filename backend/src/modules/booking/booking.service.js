import pool from '../../common/config/db.js'
import ApiError from '../../common/utils/api-error.js';
import * as models from './booking.model.js'

const getAllSeats = async () => {
    const seats = models.getAllSeats(pool)
    return seats;
}



const bookSeat = async ({userId, seatId}) => {
    const result = await models.bookSeat(pool, {userId, seatId})

    if(!result) throw ApiError.expectationFailed('Something went wrong')
    
    return result;
}

export {getAllSeats, bookSeat}