import express from "express"
import mongoose from "mongoose"
import dotenv from "dotenv"
import connectDB from "./backend/config/db.js";
import auth from "./backend/routes/auth.js"
import books from "./backend/routes/books.js"


dotenv.config();

const app = express(); 


app.use(express.json());//to parse json requests
connectDB();

app.use('/api/auth', auth)
app.use('/api/books', books)
app.use(express.static('./frontend'))

const port = process.env.PORT || 3001;
app.listen(port, console.log("Server is listening on port", port));


