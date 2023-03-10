import { Request, Response } from "express";
import { Booking } from "../model/BookingModel";
import { AuthRequest } from "../middleware/authenticateUserMiddleware";

export const createBooking = async (req: AuthRequest, res: Response) => {
    const data = req.body
    const { id } = req.userInfo

    const booking = await Booking.create({ user: id, ...data })
    res.status(200).json({ booking })
}

export const getBookings = async (req: AuthRequest, res: Response) => {
    const { id } = req.userInfo

    const bookings = await Booking.find({ user: id }).populate('place');

    res.status(200).json({ bookings })
}