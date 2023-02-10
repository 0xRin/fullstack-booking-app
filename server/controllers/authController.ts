//library imports
import { Request, Response } from 'express';

//local imports
import { encryptPassword } from '../util/encryptPassword'
import { User } from '../model/UserModel'
import CustomError, { HttpCode } from '../errors/CustomError';
import { checkUserPassword } from '../util/checkUserPassword';

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

    res.status(200).json('logged in')
}