//library imports
import { Request, Response } from 'express';

//local imports
import { encryptPassword } from '../util/encryptPassword'
import { User } from '../model/UserModel'
import CustomError, { HttpCode } from '../errors/CustomError';

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
    const user = await User.create({ name, email, encryptedPassword });

    res.status(200).json(user)
}

export const loginUser = (req: Request, res: Response) => {

}