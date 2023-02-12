import { NextFunction, Request, Response } from "express";
import CustomError, { HttpCode } from "../errors/CustomError";
import jwt from 'jsonwebtoken'

// extend default Request interface
export interface AuthRequest extends Request {
    userInfo?: any
}

export const authenticateUserMiddleware = (req: AuthRequest, res: Response, next: NextFunction) => {
    //grab token from request
    const { accessToken } = req.cookies;

    // user is not logged in
    if (!accessToken) throw new CustomError({ message: 'Access Token not found; please log in', httpCode: HttpCode.UNAUTHORIZED })

    // authenticate the cookie
    jwt.verify(accessToken, process.env.ACCESS_TOKEN_SECRET as string, {}, async (err, user: any) => {
        if (err) throw new CustomError({ message: ' Access Token expired', httpCode: HttpCode.FORBIDDEN })
        else {
            // send to next route
            req.userInfo = user;
            next()
        }
    })
}