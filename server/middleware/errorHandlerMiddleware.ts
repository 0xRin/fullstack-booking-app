import { Request, Response, NextFunction } from 'express';
import { CustomErrorArgs } from '../errors/CustomError';


export const errorHandlerMiddleware = (err: CustomErrorArgs, res: Response,) => {
    const customError = {
        message: err.message || "Internal Server Error",
        status: err.httpCode || 500
    }

    res.status(customError.status).json({ error: customError.message })
}