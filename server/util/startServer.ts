// lib imports
import { Express } from 'express'

// local imports
import { connectDB } from './connectDB'

// helper function to connect to db and start server
export const startServer = (app: Express, PORT: (number | string)) => {

    connectDB().then(() => {
        console.log('DB Connected')
        app.listen(PORT, () => console.log(`Listening on port ${PORT}`))
    }
    ).catch((e) => console.log(e))
}