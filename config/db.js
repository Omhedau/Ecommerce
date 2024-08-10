import dotenv from 'dotenv';
dotenv.config();

import mongoose from 'mongoose';

const mongodbUrl = process.env.MONGODB_URL;

const connectDb = () => {
    console.log("i am here");
    return mongoose.connect(mongodbUrl);
};

export { connectDb };
