const express = require("express");
const router = express.Router();

const { protect } = require("../middlewares/authMiddleware");
const checkAdmin = require("../middlewares/adminMiddleware");


const {
  getAllBooks,
  getBookById,
  createBook,
  updateBook,
  deleteBook,
  returnBook,
  borrowBook,
} = require("../controllers/bookController");


router.get("/", getAllBooks);
router.get("/:id", getBookById);


router.post("/createBook", protect, checkAdmin, createBook);


router.put("/:id", protect, updateBook);
router.delete("/:id", protect, deleteBook);
router.post("/:bookId/borrow", protect, borrowBook);
router.post("/:bookId/return", protect, returnBook);
module.exports = router;
