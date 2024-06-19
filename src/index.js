import express from "express";
import cors from "cors";
import bodyParser from "body-parser";

import dotenv from 'dotenv';
dotenv.config();

const app = express();

app.use(express.json());
app.use(cors());

app.get("/", (req,res) => {
    return res.status(200).send({message:"welcome to ecommerce api",status:true});
});

import productRouter from "./routes/product.js";

app.use("/product",productRouter);

export {app};