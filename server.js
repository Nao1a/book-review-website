import express from "express"
import mongoose from "mongoose"
import dotenv from "dotenv"
import connectDB from "./backend/config/db.js";

dotenv.config();

const app = express(); 

app.use(express.json());//to parse json requests
connectDB();

const port = process.env.PORT || 3000;
app.listen(port, console.log("Server is listening on port", port));

