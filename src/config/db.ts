import mongoose from 'mongoose';
import dotenv from 'dotenv';

dotenv.config();

export const connectDB = async (): Promise<void> => {
    try {
        if (!process.env.DB_URL) {
            throw new Error('DB_URL is not defined in the environment variables');
        }
        
        await mongoose.connect(process.env.DB_URL);
        console.log('MongoDB connected successfully');
    } catch (error) {
        console.error('MongoDB connection failed:', error);
        process.exit(1);
    }
};
