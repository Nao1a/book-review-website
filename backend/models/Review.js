import mongoose from "mongoose";


const ReviewSchema = new mongoose.Schema({
  user: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true }, // acess the user model to tell who reviewed the book
  book: { type: mongoose.Schema.Types.ObjectId, ref: 'Book', required: true }, // acess the book model to show which book he reviewed
  rating: { type: Number, min: 1, max: 5 }, // a rating system with a minimum value of 1 and maximum value of 5
  comment: [String], // comments about the book 
});

const Review = mongoose.model('Review', ReviewSchema);
module.exports = Review;