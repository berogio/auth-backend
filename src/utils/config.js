import * as dotenv from 'dotenv';
import mongoose from 'mongoose';

dotenv.config();

const MONGODB_URL = `mongodb+srv://gberi2012:${process.env.DB_PASSWORD}@cluster0.a2bfzeu.mongodb.net/test`;
mongoose.set('strictQuery', false);

const { PORT } = process.env;

export {
    PORT,
    MONGODB_URL,
};