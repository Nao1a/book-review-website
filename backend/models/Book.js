import mongoose from "mongoose";

const BookSchema = new mongoose.Schema({
    title: {type: String, required:true},
    author: {type: String, required:true},
    genre: [String], //array of genres to be accesed by the preference 
    bookId: {type: String, required: true, unique:true} //External API's book ID
}); 

const Book = mongoose.model('Book', BookSchema);

module.exports = Book;