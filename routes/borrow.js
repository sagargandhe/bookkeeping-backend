const express = require('express');
const router = express.Router();
const borrowController = require('../controllers/borrowController');
const auth = require('../middlewares/auth');

router.post('/borrow', auth, borrowController.borrowBook);
router.put('/return/:id', auth, borrowController.returnBook);

module.exports = router;
