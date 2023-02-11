//library imports
import { Request, Response } from 'express';
import jwt from 'jsonwebtoken'
import mongoose from 'mongoose'

//local imports
import { encryptPassword } from '../util/encryptPassword'
import { User } from '../model/UserModel'
import CustomError, { HttpCode } from '../errors/CustomError';
import { checkUserPassword } from '../util/checkUserPassword';
import { createCookie } from '../util/createCookie';

export const registerUser = async (req: Request, res: Response) => {

    // destructure payload from body
    const { name, email, password } = req.body;

    //check if user info is provided
    if (!name || !email || !password) throw new CustomError({ message: 'Name, email, and password must be provided', httpCode: HttpCode.BAD_REQUEST })

    // check is user already exists
    const foundUser = await User.findOne({ email });
    if (foundUser) throw new CustomError({ message: 'User already exists, please login', httpCode: HttpCode.BAD_REQUEST })

    //hash password
    const encryptedPassword = await encryptPassword(password);

    //create user
    const user = await User.create({ name, email, password: encryptedPassword });

    res.status(200).json(user)
}

export const loginUser = async (req: Request, res: Response) => {
    // destructure payload from body
    const { email, password } = req.body;

    // check if email, password are valid
    if (!email || !password) throw new CustomError({ message: 'Email or password must be provided', httpCode: HttpCode.BAD_REQUEST })

    // find user
    const user = await User.findOne({ email });

    if (!user) throw new CustomError({ message: 'User not found, please register an account', httpCode: HttpCode.NOT_FOUND })

    // check password
    const isMatch = await checkUserPassword(password, user.password as string)

    if (!isMatch) throw new CustomError({ message: 'Invalid password', httpCode: HttpCode.UNAUTHORIZED })

    // create access token
    const accessToken = createCookie(user.email!, user._id)

    //return user info
    const { password: userPassword, ...rest } = user

    res.status(200).cookie('accessToken', accessToken, { sameSite: 'none', secure: true }).json(rest)
}

export const getUser = (req: Request, res: Response) => {
    //grab token from request
    const { accessToken } = req.cookies;

    // user is not logged in
    if (!accessToken) throw new CustomError({ message: 'Access Token not found; please log in', httpCode: HttpCode.UNAUTHORIZED })

    // authenticate the cookie
    jwt.verify(accessToken, process.env.ACCESS_TOKEN_SECRET as string, {}, async (err, user: any) => {
        if (err) throw new CustomError({ message: ' Access Token expired', httpCode: HttpCode.FORBIDDEN })
        else {
            // find user and send information back
            const userInfo = await User.findById(user.id)
            res.status(200).json(userInfo)
        }
    })
}