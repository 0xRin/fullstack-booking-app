import jwt from 'jsonwebtoken';
import mongoose, { Types } from 'mongoose';


export const createCookie = (email: string, id: Types.ObjectId) => {
    const accessToken = jwt.sign({
        email, id
    }, process.env.ACCESS_TOKEN_SECRET as string, {})
    return accessToken
}