//imports
// const express= require('express')
import express from "express";

import dotenv from "dotenv";
import cors from 'cors';
import morgan from 'morgan';
//fles import
import connectDB from "./config/db.js";

//routes import
import authRoutes from "./routes/authRoutes.js"
import testRoutes from "./routes/testRoutes.js"
import { testPostController } from "./controllers/testControllers.js";
import errorMiddleware from "./middlewares/errorMiddleware.js";

//config 
dotenv.config();

//mongo db connection
connectDB();

//rest object
const app =express();

//middleware
app.use(express.json());
app.use(cors())
app.use(morgan('dev'));

//route
app.use('/api/v1/test',testRoutes);
app.use('/api/v1/auth',authRoutes);

//validation middleware
app.use(errorMiddleware);

//port
const PORT =process.env.PORT ||8080
//listen
app.listen(PORT,()=>{
    console.log(`node server running in ${process.env.DEV_MODE} mode on port no. ${PORT}`);
});
