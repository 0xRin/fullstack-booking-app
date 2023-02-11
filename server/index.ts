//library imports
import express, { Response, NextFunction, Request } from 'express'
import cors from 'cors'
import dotenv from 'dotenv'
import 'express-async-errors'
import cookieParser from 'cookie-parser'

// local imports
import authRouter from './routes/authRouter'
import { startServer } from './util/startServer'
import { errorHandlerMiddleware } from './middleware/errorHandlerMiddleware'
import { CustomErrorArgs } from './errors/CustomError'

//initialize express app
const app = express();
dotenv.config()

// declare port variable
const PORT = process.env.PORT || 3000;

// start the server
startServer(app, PORT);

// middleware
app.use(cors(
    {
        credentials: true,
        origin: 'http://127.0.0.1:5173'
    }
))
app.use(express.json())
app.use(cookieParser())

// routes
app.use('/auth', authRouter)

//error handler middleware
app.use((error: CustomErrorArgs, req: Request, res: Response, next: NextFunction) => {
    errorHandlerMiddleware(error, res)
})
