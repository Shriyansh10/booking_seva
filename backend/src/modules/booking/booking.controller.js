import * as bookingServices from './booking.service.js'
import ApiResponse from '../../common/utils/api-response.js'

const getAllSeats = async (req,res ) => {
    const seats = await bookingServices.getAllSeats();
    ApiResponse.ok(res, 'Fetched all the seats with their booking status', seats)
}

const bookSeat = async (req, res) => {
    const booking = await bookingServices.bookSeat({userId: req.user.id, seatId: req.params.id})
    ApiResponse.ok(res, 'Seat Booked', booking)
}

export {getAllSeats, bookSeat}