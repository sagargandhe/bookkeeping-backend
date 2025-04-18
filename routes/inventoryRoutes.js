const express = require('express');
const router = express.Router();
const {
  getInventory,
  addBookToInventory,
  removeBookFromInventory
} = require('../controllers/inventoryController');
const { protect } = require('../middlewares/authMiddleware');

router.get('/:id/inventory', protect, getInventory);


router.post('/:id/inventory', protect, addBookToInventory);


router.delete('/:id/inventory/:bookId', protect, removeBookFromInventory);

module.exports = router;
