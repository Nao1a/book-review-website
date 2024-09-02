import express from "express";
import mongoose from "mongoose";
import dotenv from "dotenv";
import connectDB from "./backend/config/db.js";
import auth from "./backend/routes/auth.js";
import books from "./backend/routes/books.js";
import cors from "cors";

dotenv.config();

const coreOptions = {
  origin: "*",
  Credential: true,
  optionSuccessStatus: 200,
};

const app = express();

app.use(express.json()); //to parse json requests
connectDB();

app.use(cors(coreOptions));
app.use("/api/auth", auth);
app.use("/api/books", books);
app.use(express.static("./frontend"));

const port = process.env.PORT || 5000;
app.listen(port, console.log("Server is listening on port", port));
