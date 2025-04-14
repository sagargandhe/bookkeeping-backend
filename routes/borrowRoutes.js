const express = require('express');
const { borrowBook, returnBook } = require('../controllers/borrowController');
const { protect } = require('../middlewares/authMiddleware');

const router = express.Router();

router.post('/borrow', protect, borrowBook);
router.put('/return/:id', protect, returnBook);

module.exports = router;
