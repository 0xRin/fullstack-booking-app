// library imports
import mongoose from 'mongoose';

// connect to given db
export const connectDB = () => {
    mongoose.set('strictQuery', false);
    return mongoose.connect(process.env.MONGO_DB_URI as string)
}