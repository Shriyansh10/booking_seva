import ApiError from "../../common/utils/api-error.js";

const getAllSeats = async (pool) => {
  const result = await pool.query(
    `SELECT s.name, b.user_id, s.is_booked
    FROM seats s
    LEFT JOIN bookings b
    ON s.id = b.seat_id`,
  );

  return result.rows;
};

const getSeat = async (pool, { seatId }) => {
  const result = await pool.query(
    `SELECT s.name, b.user_id, s.is_booked
    FROM seats s
    LEFT JOIN bookings b
    ON s.id = b.seat_id 
    WHERE s.id=$1`,
    [seatId],
  );

  return result.rows[0];
};

const bookSeat = async (pool, { userId, seatId }) => {
  const conn = await pool.connect();

  try {
    await conn.query("BEGIN");
    const seat = await conn.query(
      `SELECT *
      FROM seats
      WHERE seats.id = $1 FOR UPDATE`,
      [seatId],
    );
    if (seat.rowCount === 0) throw ApiError.notfound("Seat not found");

    const existing = await conn.query(
      `SELECT * FROM bookings
      WHERE seat_id = $1`,
      [seatId],
    );
    if (existing.rowCount > 0)
      throw ApiError.unauthorized("Seat already booked");

    const booking = await conn.query(
      `INSERT INTO bookings
      (user_id, seat_id)
      VALUES 
      ($1, $2)
      RETURNING id, user_id, seat_id`,
      [userId, seatId],
    );
    await conn.query('COMMIT')

    await conn.query(
      `UPDATE seats
      SET is_booked = true
      WHERE id=$1`,
      [seatId]
    )

    return booking.rows[0]

  } catch (error) {
    console.log(error);
    await conn.query('ROLLBACK')
  } finally{
    await conn.release();
  }
};

export { getAllSeats, getSeat, bookSeat };
