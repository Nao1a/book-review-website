import Review from "../models/Review.js"

const createReview = async(req, res) => {
    const{ bookId, rating, comment} = req.body;
    const UserId = req.user.UserId


    if (!bookId || !rating || !comment){
        return res.satus(400).json({message: "All fields are required."})
    }

    try{
        const newReview = new Review ({bookId, UserId, rating, comment});
        await newReview.save();
        res.satus(201).json(newReview);
    } catch(error){
        res.satus(500).json({message: 'server error'});
    }
};

const getReviewsByBook = async(req, res) => {
    const {bookId} = req.parmas;

    try {
        const reviews = await Review.find({bookId}).populate('userId', "username");
        res.status(200).json(reviews);
    }catch(error){
        res.status(500).json({messahe: "server error"})
    }
};

