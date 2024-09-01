import express from 'express'

import searchBook from '../controllers/bookController.js'
import authMiddleware  from '../middleware/authMiddleware.js'


const router = express.Router();
// Search for books (accessible only to logged-in users)
router.get('/search', searchBook);

export default router 
