import Review from "../models/Review.js"

export const addReview = async (req, res) => {
    const{bookId, bookTitle, rating, comment} = req.body
    const userId = req.user._id;
    const username = req.user.username;

    try{
        const newReview = new Review({
            bookId,bookTitle,userId,username,rating, comment,
        })
        await newReview.save();
        res.status(201).json({message: 'Review added successfully'})
    }catch (error){
        res.status(500).json({message: 'Error saving review'})
    }
}

export const getReviews = async(req, res) => {
    const {bookId} = req.params

    try{
        const reviews = await Review.find({bookId});

        if(reviews.legth === 0) {
            return res.status(404).json({message: 'No reviews for this book'})
        }
    }catch (error){
        res.status(500).json({error: 'Error fetching reviews'})
    }
}