import express from 'express';
import BookModel from '../BookModel.js';


const router = express.Router();

// GET all books
router.get('/', async (req, res) => {
  try {
    const books = await BookModel.find({});
    res.json(books);
  } catch (error) {
    res.status(500).json({ message: 'Server error', error: error.message });
  }
});



export default router;
