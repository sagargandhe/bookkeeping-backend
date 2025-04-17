const Book = require("../models/bookModel");
const User = require("../models/user");

// 📘 Create Book
const createBook = async (req, res) => {
  try {
    console.log("🔍 Checking user role...");
    console.log("User object:", req.user);
    console.log("User Role:", req.user.role);

    // In case isAdmin() is not working, fallback to direct role check
    const isAdmin = typeof req.user.isAdmin === 'function' ? req.user.isAdmin() : req.user.role === 'admin';
    console.log("Is Admin:", isAdmin);

    if (!isAdmin) {
      return res.status(403).json({ status: 'fail', message: 'Access denied, admin only' });
    }

    const { title, author, description, library, stock } = req.body;
    const coverImageUrl = req.file ? req.file.secure_url : null;

    if (!title || !author || !description || !library || !stock) {
      return res.status(400).json({ status: 'fail', message: 'Missing required fields' });
    }

    const newBook = await Book.create({
      title,
      author,
      description,
      library,
      stock,
      coverImage: coverImageUrl,
    });

    res.status(201).json({
      status: 'success',
      data: { book: newBook },
    });
  } catch (err) {
    console.error("Create book error:", err);
    res.status(500).json({ status: 'fail', message: err.message });
  }
};


// 📘 Get All Books
const getAllBooks = async (req, res) => {
  try {
    const books = await Book.find()
      .populate('author', 'name email')
      .populate('library', 'name')
      .populate('borrowedBy', 'name email');

    res.status(200).json({
      status: 'success',
      results: books.length,
      data: { books },
    });
  } catch (err) {
    res.status(500).json({ status: 'fail', message: err.message });
  }
};

// 📘 Get Book By ID
const getBookById = async (req, res) => {
  try {
    const book = await Book.findById(req.params.id)
    .populate('author', 'name email role')
    .populate('library', 'name address')
    .populate('borrowedBy', 'name email');

  if (!book) {
    const error = new Error('Book not found');
    error.statusCode = 404;
    return next(error);
  }

  res.status(200).json({
    success: true,
    data: { book },
  });
} catch (err) {
  next(err); // This sends unexpected errors to the errorHandler middleware
}
};

// 📘 Update Book
const updateBook = async (req, res) => {
  try {
    const { title, author, description, stock, library } = req.body;
    const coverImageUrl = req.file ? req.file.secure_url : undefined;

    const updatedFields = {
      title,
      author,
      description,
      stock,
      library,
    };

    if (coverImageUrl) updatedFields.coverImage = coverImageUrl;

    const updatedBook = await Book.findByIdAndUpdate(req.params.id, updatedFields, { new: true });

    if (!updatedBook) {
      return res.status(404).json({ status: 'fail', message: 'Book not found' });
    }

    res.status(200).json({
      status: 'success',
      data: { book: updatedBook },
    });
  } catch (err) {
    res.status(500).json({ status: 'fail', message: err.message });
  }
};

// 📘 Delete Book
const deleteBook = async (req, res) => {
  try {
    const deletedBook = await Book.findByIdAndDelete(req.params.id);

    if (!deletedBook) {
      return res.status(404).json({ status: 'fail', message: 'Book not found' });
    }

    res.status(204).json({ status: 'success', data: null });
  } catch (err) {
    res.status(500).json({ status: 'fail', message: err.message });
  }
};

// ✅ Borrow Book
const borrowBook = async (req, res) => {
  try {
    const book = await Book.findById(req.params.bookId);

    if (!book) {
      return res.status(404).json({ status: 'fail', message: 'Book not found' });
    }

    if (!book.isAvailable || book.stock < 1) {
      return res.status(400).json({ status: 'fail', message: 'Book is not available' });
    }

    book.borrowedBy = req.user._id;
    book.borrowedDate = new Date();
    book.returnDate = null;
    book.isAvailable = false;
    book.stock -= 1;

    await book.save();

    res.status(200).json({
      status: 'success',
      message: 'Book borrowed successfully',
      data: { book },
    });
  } catch (err) {
    res.status(500).json({ status: 'fail', message: err.message });
  }
};

// ✅ Return Book
const returnBook = async (req, res) => {
  try {
    const book = await Book.findById(req.params.bookId);

    if (!book) {
      return res.status(404).json({ status: 'fail', message: 'Book not found' });
    }

    if (!book.borrowedBy) {
      return res.status(400).json({ status: 'fail', message: 'Book was not borrowed' });
    }

    if (book.borrowedBy.toString() !== req.user._id.toString()) {
      return res.status(403).json({ status: 'fail', message: 'You can only return your own borrowed books' });
    }

    book.borrowedBy = null;
    book.borrowedDate = null;
    book.returnDate = new Date();
    book.isAvailable = true;
    book.stock += 1;

    await book.save();

    res.status(200).json({
      status: 'success',
      message: 'Book returned successfully',
      data: { book },
    });
  } catch (err) {
    res.status(500).json({ status: 'fail', message: err.message });
  }
};

// 📘 Export all
module.exports = {
  createBook,
  getAllBooks,
  getBookById,
  updateBook,
  deleteBook,
  borrowBook,
  returnBook,
};
