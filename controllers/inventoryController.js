const Library = require('../models/Library');
const Book = require('../models/Book');

exports.getInventory = async (req, res) => {
  try {
    const library = await Library.findById(req.params.id).populate('books');
    if (!library) return res.status(404).json({ message: req.t('NOT_FOUND') });

    const availableBooks = library.books.filter(book => book.isAvailable);
    res.status(200).json(availableBooks);
  } catch (err) {
    res.status(500).json({ message: req.t('SERVER_ERROR') });
  }
};

exports.addBookToInventory = async (req, res) => {
  const { bookId } = req.body;

  try {
    const library = await Library.findById(req.params.id);
    if (!library) return res.status(404).json({ message: req.t('NOT_FOUND') });

    if (!library.books.includes(bookId)) {
      library.books.push(bookId);
      await library.save();
    }

    await Book.findByIdAndUpdate(bookId, { library: library._id });
    res.status(200).json({ message: req.t('BOOK_ADDED') });
  } catch (err) {
    res.status(500).json({ message: req.t('SERVER_ERROR') });
  }
};

exports.removeBookFromInventory = async (req, res) => {
  const { bookId } = req.params;

  try {
    const library = await Library.findById(req.params.id);
    if (!library) return res.status(404).json({ message: req.t('NOT_FOUND') });

    library.books = library.books.filter(b => b.toString() !== bookId);
    await library.save();

    await Book.findByIdAndUpdate(bookId, { library: null });
    res.status(200).json({ message: req.t('BOOK_REMOVED') });
  } catch (err) {
    res.status(500).json({ message: req.t('SERVER_ERROR') });
  }
};
