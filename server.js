//imports
// const express= require('express')
import express from "express";
import dotenv from "dotenv";
import connectDB from "./config/db.js";


//config 
dotenv.config();

//mongo db connection
connectDB();

//rest object
const app =express();

//route
app.get('/',(req,res)=>{
res.send("<h1>welcome to job portal</h1>")
});

//port
const PORT =process.env.PORT ||8080
//listen
app.listen(PORT,()=>{
    console.log(`node server running in ${process.env.DEV_MODE} mode on port no. ${PORT}`);
});
