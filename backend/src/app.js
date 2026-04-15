import express from 'express'
import authRouter from './modules/auth/user.routes.js';
import bookingRouter from './modules/booking/booking.routes.js'
import cookieParser from 'cookie-parser';


const app = express();

app.use(express.json())
app.use(express.urlencoded({extended: true}))
app.use(cookieParser())

app.get('/health', (req, res) => res.status(200).send('Alive'))

app.use('/api/auth', authRouter);
app.use('/api', bookingRouter)

export default app;