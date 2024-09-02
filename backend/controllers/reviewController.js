import Review from "../models/Review.js"

export const addReview = async (req, res) => {
    const{bookId, bookTitle, rating, comment} = req.body
    const userId = req.user._id;
    const username = req.user.username;

    try{
        const response = Review.create({
            bookId: bookId,
            bookTitle: bookTitle,
            user: userId,
            username: username,
            rating: rating, 
            comment: comment
        })

        res.status(201).json({message: 'Review added successfully'})
    }catch (error){
        console.log(error)
        res.status(500).json({message: 'Error saving review'})
    }
}

export const getReviews = async(req, res) => {
    const {bookId} = req.params

    try{
        const reviews = await Review.find({bookId});

        if(reviews.length === 0) {
            return res.status(404).json({message: 'No reviews for this book'})
        }

        res.json(reviews)
    }catch (error){
        res.status(500).json({error: 'Error fetching reviews'})
    }
}