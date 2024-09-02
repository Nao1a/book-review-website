import express from 'express'

// import {searchBook, topBooks} from '../controllers/bookController.js'
import {getBook, searchBook, topBooks} from '../controllers/bookController.js'
import {addReview, getReviews} from '../controllers/reviewController.js'
import authMiddleware  from '../middleware/authMiddleware.js'


const router = express.Router();
// Search for books (accessible only to logged-in users)

router.get('/', topBooks);

router.get('/search', searchBook);

router.get('/:id', getBook);

router.post('/review', authMiddleware, addReview)


router.get('/reviews/:bookId', getReviews)

export default router 
