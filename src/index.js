import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import bodyParser from 'body-parser';
import productRouter from './routes/product.js';

// Load environment variables
dotenv.config();

// Initialize express app
const app = express();

// Middleware
app.use(express.json());
app.use(cors());
app.use(bodyParser.json()); 

// Welcome route
app.get("/", (req, res) => {
    return res.status(200).send({ message: "welcome to ecommerce api", status: true });
});

// Use product routes
app.use("/product", productRouter);

export { app };
