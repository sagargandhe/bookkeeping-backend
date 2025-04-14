const express = require('express');
const router = express.Router();
const {
  getInventory,
  addBookToInventory,
  removeBookFromInventory
} = require('../controllers/inventoryController');
const { protect } = require('../middlewares/authMiddleware');

// GET all available books in library
router.get('/:id/inventory', protect, getInventory);

// POST add book to inventory
router.post('/:id/inventory', protect, addBookToInventory);

// DELETE remove book from inventory
router.delete('/:id/inventory/:bookId', protect, removeBookFromInventory);

module.exports = router;
