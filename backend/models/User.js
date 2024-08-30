import mongoose from "mongoose";

const UserSchema = new mongoose.Schema({  //creating the schema for the book
    username: {type: String, required: true, unique: true},//the usernames must be unique
    password: {type: String, required: true},
    preference: [string], //the prefernce will be array of prefferred genres

});

const User = mongoose.model('User', UserSchema); // created a model called user that has the schema of UserSchema

module.exports = User;