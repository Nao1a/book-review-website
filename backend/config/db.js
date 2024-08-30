import mongoose from "mongoose" //importing the mongoose module

const connectDB = async () => {
    try{
        await mongoose.connect(process.env.DB_URL);
        console.log("connected to MongoDB...");
    } catch (error) {
        console.log("couldn't connect to Mongodb...", error);
    }
} // an asynchronus function to connect to the database


export default connectDB; //exporting the function to be used in the server.js file