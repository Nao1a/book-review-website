import Review from "../models/Review.js";
import authMiddleware from "../middleware/authMiddleware.js";

export const addReview = async (req, res) => {
    const { bookId, bookTitle, rating, comment } = req.body;
    const userId = req.user._id; // Obtained from authMiddleware
    const username = req.user.username; // Obtained from authMiddleware

    // Validate that required fields are present
    if (!bookId || !bookTitle || !rating || !userId || !username) {
        return res.status(400).json({ message: 'Missing required fields' });
    }

    try {
        const newReview = new Review({
            bookId,
            bookTitle,
            userId,
            username,
            rating,
            comment,
        });
        await newReview.save();
        
        res.status(201).json({ message: 'Review added successfully' , bookId});
    } catch (error) {
        console.error(error); // Log the error for debugging
        res.status(500).json({ message: 'Error saving review' });
    }
};


export const getReviews = async(req, res) => {
    const {bookId} = req.params

    try{
        const reviews = await Review.find({bookId});
        res.status(201).json({reviews})

        if(reviews.legth === 0) {
            return res.status(404).json({message: 'No reviews for this book'})
        }
    }catch (error){
        res.status(500).json({error: 'Error fetching reviews'})
    }
}