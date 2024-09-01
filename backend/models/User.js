import mongoose from "mongoose";

const UserSchema = new mongoose.Schema({  //creating the schema for the book
    username: {type: String, required: true, unique: true},//the usernames must be unique
    email: {type:String, required: true, unique: true},
    password: {type: String, required: true},
    preference: [String], //the prefernce will be array of prefferred genres

});

const User = mongoose.model('User', UserSchema); // created a model called user that has the schema of UserSchema

export default User;