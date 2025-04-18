const Book = require('../models/bookModel');
const BorrowedBook = require('../models/borrowedBook');
const User = require('../models/user');

const borrowBook = async (req, res) => {
  try {
    const { bookId } = req.body;

    const book = await Book.findById(bookId);
    if (!book) {
      return res.status(404).json({ message: "Book not found" });
    }

    const userId = req.user.id;

    const borrowedBook = new BorrowedBook({
      book: bookId,
      borrower: userId,
      borrowedAt: Date.now(),
    });

    await borrowedBook.save();

    book.isBorrowed = true;
    await book.save();

    res.status(200).json({ message: "Book borrowed successfully", borrowedBook });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Something went wrong", error });
  }
};

const returnBook = async (req, res) => {
  try {
    const userId = req.user._id;
    const { bookId } = req.body;

    const book = await Book.findById(bookId);

    if (!book) {
      return res.status(404).json({ message: 'Book not found' });
    }

    if (!book.borrower || book.borrower.toString() !== userId.toString()) {
      return res.status(403).json({ message: 'You are not the borrower of this book' });
    }

    book.borrower = null;
    book.isAvailable = true;

    await book.save();

    res.status(200).json({ message: 'Book returned successfully', book });
  } catch (error) {
    res.status(500).json({ message: 'Error returning book', error: error.message });
  }
};

module.exports = {
  borrowBook,
  returnBook,
};
