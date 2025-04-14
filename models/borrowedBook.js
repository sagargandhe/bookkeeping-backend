// models/borrowedBook.js
const mongoose = require('mongoose');

const borrowedBookSchema = new mongoose.Schema({
  book: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Book',
    required: true,
  },
  borrower: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true,
  },
  borrowedAt: {
    type: Date,
    default: Date.now,
  },
});

module.exports = mongoose.model('BorrowedBook', borrowedBookSchema);
